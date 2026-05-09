import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ACCENT = 0x38bdf8;
const DOTS = 600;
const ARC_PAIRS = 18;

function randomOnSphere(): [number, number, number] {
  const u = Math.random(),
    v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi),
  ];
}

function arcPoints(
  a: [number, number, number],
  b: [number, number, number],
  segments = 40,
  lift = 0.18
): number[] {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const pts: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const v = va.clone().lerp(vb, t).normalize();
    v.multiplyScalar(1 + lift * Math.sin(Math.PI * t));
    pts.push(v.x, v.y, v.z);
  }
  return pts;
}

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let ro: ResizeObserver | null = null;
    let mouseMoveCleanup: (() => void) | null = null;

    const init = () => {
      const rect = mount.getBoundingClientRect();
      const w = rect.width || mount.offsetWidth || 400;
      const h = rect.height || mount.offsetHeight || 400;

      /* renderer */
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(w, h, false); // false = don't set canvas CSS size
      const canvas = renderer.domElement;
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      mount.appendChild(canvas);

      /* scene / camera */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 2.8;

      /* wireframe sphere */
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 36, 36),
        new THREE.MeshBasicMaterial({
          color: ACCENT,
          wireframe: true,
          transparent: true,
          opacity: 0.12,
        })
      );
      scene.add(globe);

      /* surface dots — Fibonacci spiral */
      const dotPos: number[] = [];
      for (let i = 0; i < DOTS; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / DOTS);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        dotPos.push(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi)
        );
      }
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(dotPos, 3)
      );
      const dots = new THREE.Points(
        dotGeo,
        new THREE.PointsMaterial({
          color: ACCENT,
          size: 0.014,
          transparent: true,
          opacity: 0.9,
        })
      );
      scene.add(dots);

      /* glow halo */
      scene.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.08, 32, 32),
          new THREE.MeshBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.04,
            side: THREE.BackSide,
          })
        )
      );

      /* arc lines */
      const arcMat = new THREE.LineBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.35,
      });
      const arcGroup = new THREE.Group();
      for (let i = 0; i < ARC_PAIRS; i++) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(
            arcPoints(randomOnSphere(), randomOnSphere()),
            3
          )
        );
        arcGroup.add(new THREE.Line(geo, arcMat));
      }
      scene.add(arcGroup);

      /* mouse tilt */
      let targetX = 0,
        targetY = 0;
      const onMouseMove = (e: MouseEvent) => {
        targetY = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetX = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener('mousemove', onMouseMove);
      mouseMoveCleanup = () =>
        window.removeEventListener('mousemove', onMouseMove);

      /* animation */
      let autoAngle = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        autoAngle += 0.004;
        [globe, dots, arcGroup].forEach((obj) => {
          obj.rotation.y = autoAngle + targetY;
          obj.rotation.x += (targetX - obj.rotation.x) * 0.04;
        });
        renderer!.render(scene, camera);
      };
      tick();

      /* resize */
      ro = new ResizeObserver(() => {
        const { width: rw, height: rh } = mount.getBoundingClientRect();
        if (!rw || !rh) return;
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer!.setSize(rw, rh, false);
      });
      ro.observe(mount);
    };

    /* defer one frame so layout is settled before we read dimensions */
    raf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(raf);
      mouseMoveCleanup?.();
      ro?.disconnect();
      renderer?.dispose();
      if (renderer && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};

export default Globe;
