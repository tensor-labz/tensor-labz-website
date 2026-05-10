import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

function buildGearShape(teeth: number, innerR: number, outerR: number): THREE.Shape {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    const r0 = [Math.cos(base) * innerR, Math.sin(base) * innerR] as const;
    const t0 = [Math.cos(base + step * 0.22) * outerR, Math.sin(base + step * 0.22) * outerR] as const;
    const t1 = [Math.cos(base + step * 0.44) * outerR, Math.sin(base + step * 0.44) * outerR] as const;
    const r1 = [Math.cos(base + step * 0.66) * innerR, Math.sin(base + step * 0.66) * innerR] as const;

    if (i === 0) shape.moveTo(r0[0], r0[1]);
    else shape.lineTo(r0[0], r0[1]);

    shape.lineTo(t0[0], t0[1]);
    shape.lineTo(t1[0], t1[1]);
    shape.lineTo(r1[0], r1[1]);
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR * 0.38, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}

const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 3,
};

interface GearDef {
  teeth: number;
  innerR: number;
  outerR: number;
  color: number;
  pos: [number, number, number];
  speed: number;
}

const GEAR_DEFS: GearDef[] = [
  { teeth: 18, innerR: 1.3,  outerR: 1.75, color: 0x1e3a5f, pos: [0,     0,    0],    speed:  0.22 },
  { teeth: 12, innerR: 0.85, outerR: 1.15, color: 0x0f2235, pos: [2.8,   1.7, -0.4],  speed: -0.33 },
  { teeth:  9, innerR: 0.65, outerR: 0.88, color: 0x162d45, pos: [-2.2, -1.9, -0.2],  speed:  0.44 },
  { teeth:  6, innerR: 0.44, outerR: 0.60, color: 0x0f2235, pos: [-2.9,  1.1, -0.3],  speed: -0.66 },
];

const HeroGear3D: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const key = new THREE.DirectionalLight(0x38bdf8, 4);
    key.position.set(5, 7, 6);
    scene.add(key);

    const fill = new THREE.PointLight(0x6366f1, 3, 25);
    fill.position.set(-5, -3, 4);
    scene.add(fill);

    const rim = new THREE.PointLight(0x0ea5e9, 2, 20);
    rim.position.set(0, -6, 2);
    scene.add(rim);

    /* ── Gears ── */
    const gears: { mesh: THREE.Mesh; speed: number }[] = [];

    GEAR_DEFS.forEach(({ teeth, innerR, outerR, color, pos, speed }) => {
      const geo = new THREE.ExtrudeGeometry(buildGearShape(teeth, innerR, outerR), EXTRUDE_SETTINGS);
      geo.center();
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.9,
        roughness: 0.15,
        emissive: new THREE.Color(color).multiplyScalar(0.25),
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      scene.add(mesh);
      gears.push({ mesh, speed });
    });

    /* ── Particles ── */
    const ptCount = 80;
    const ptPositions = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      ptPositions[i * 3]     = (Math.random() - 0.5) * 12;
      ptPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      ptPositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPositions, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.05, transparent: true, opacity: 0.5 })));

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      gears.forEach(({ mesh, speed }) => {
        mesh.rotation.z = t * speed;
        mesh.rotation.x = Math.sin(t * 0.18) * 0.1;
        mesh.rotation.y = Math.cos(t * 0.13) * 0.07;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const ro = new ResizeObserver(() => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
});

HeroGear3D.displayName = 'HeroGear3D';
export default HeroGear3D;
