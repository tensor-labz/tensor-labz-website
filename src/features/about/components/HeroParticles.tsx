import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ACCENT = 0x38bdf8;
const COUNT = 90;
const CONNECT_DIST = 1.4;
const SPEED = 0.0015;

const HeroParticles: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let raf: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let ro: ResizeObserver | null = null;
    let mouseCleanup: (() => void) | null = null;

    const init = () => {
      const { width: w, height: h } = mount.getBoundingClientRect();
      const W = w || 800;
      const H = h || 600;

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(W, H, false);
      renderer.domElement.style.cssText =
        'display:block;width:100%;height:100%;';
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.z = 4;

      /* ── Particles ── */
      const posArr = new Float32Array(COUNT * 3);
      const vel = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        posArr[i * 3] = (Math.random() - 0.5) * 6;
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 4;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
        vel[i * 3] = (Math.random() - 0.5) * SPEED;
        vel[i * 3 + 1] = (Math.random() - 0.5) * SPEED;
        vel[i * 3 + 2] = 0;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
      const pMat = new THREE.PointsMaterial({
        color: ACCENT,
        size: 0.04,
        transparent: true,
        opacity: 0.55,
      });
      scene.add(new THREE.Points(pGeo, pMat));

      /* ── Connection lines (pre-allocated buffer) ── */
      const MAX_SEGS = COUNT * COUNT;
      const lineArr = new Float32Array(MAX_SEGS * 6);
      const lGeo = new THREE.BufferGeometry();
      lGeo.setAttribute('position', new THREE.BufferAttribute(lineArr, 3));
      lGeo.setDrawRange(0, 0);
      const lMat = new THREE.LineBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.09,
      });
      scene.add(new THREE.LineSegments(lGeo, lMat));

      /* ── Mouse parallax ── */
      let mx = 0,
        my = 0;
      const onMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.6;
        my = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener('mousemove', onMove);
      mouseCleanup = () => window.removeEventListener('mousemove', onMove);

      const tick = () => {
        raf = requestAnimationFrame(tick);

        /* move particles + bounce */
        for (let i = 0; i < COUNT; i++) {
          posArr[i * 3] += vel[i * 3];
          posArr[i * 3 + 1] += vel[i * 3 + 1];
          if (Math.abs(posArr[i * 3]) > 3) vel[i * 3] *= -1;
          if (Math.abs(posArr[i * 3 + 1]) > 2) vel[i * 3 + 1] *= -1;
        }
        pGeo.attributes.position.needsUpdate = true;

        /* rebuild connections */
        let li = 0;
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const dx = posArr[i * 3] - posArr[j * 3];
            const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
            const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
            if (dx * dx + dy * dy + dz * dz < CONNECT_DIST * CONNECT_DIST) {
              lineArr[li++] = posArr[i * 3];
              lineArr[li++] = posArr[i * 3 + 1];
              lineArr[li++] = posArr[i * 3 + 2];
              lineArr[li++] = posArr[j * 3];
              lineArr[li++] = posArr[j * 3 + 1];
              lineArr[li++] = posArr[j * 3 + 2];
            }
          }
        }
        lGeo.setDrawRange(0, li / 3);
        lGeo.attributes.position.needsUpdate = true;

        /* camera drift */
        camera.position.x += (mx - camera.position.x) * 0.04;
        camera.position.y += (-my - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer!.render(scene, camera);
      };
      tick();

      ro = new ResizeObserver(() => {
        const { width: rw, height: rh } = mount.getBoundingClientRect();
        if (!rw || !rh) return;
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer!.setSize(rw, rh, false);
      });
      ro.observe(mount);
    };

    raf = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(raf);
      mouseCleanup?.();
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
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
};

export default HeroParticles;
