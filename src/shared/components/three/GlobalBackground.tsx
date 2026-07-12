import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';

/**
 * ONE animation — every page.
 * Fixed full-viewport canvas at z-index 0, behind all content.
 * Particle constellation with connection lines, gentle mouse parallax.
 */

const PARTICLE_COUNT = 70;
const CONNECT_DIST = 0.3;
const BASE_SPEED = 0.00065;

const GlobalBackground: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isDark = theme === 'dark';

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 2.0;

    const accent = isDark ? 0x38bdf8 : 0x0ea5e9;
    const dotOpacity = isDark ? 0.5 : 0.35;
    const lineOpacity = isDark ? 0.13 : 0.09;

    interface P {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
    }
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 3.2,
      y: (Math.random() - 0.5) * 2.2,
      z: (Math.random() - 0.5) * 0.8,
      vx: (Math.random() - 0.5) * BASE_SPEED,
      vy: (Math.random() - 0.5) * BASE_SPEED,
      vz: (Math.random() - 0.5) * BASE_SPEED * 0.3,
    }));

    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(PARTICLE_COUNT * 3);
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
      color: accent,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: dotOpacity,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    const maxSegs = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const lineBuf = new Float32Array(maxSegs * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineBuf, 3));
    const lineSegs = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: lineOpacity,
      })
    );
    scene.add(lineSegs);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const pAttr = dotGeo.attributes.position as THREE.BufferAttribute;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.vx + mouse.x * 0.000045;
        p.y += p.vy - mouse.y * 0.000045;
        p.z += p.vz;
        if (Math.abs(p.x) > 1.65) p.vx *= -1;
        if (Math.abs(p.y) > 1.15) p.vy *= -1;
        if (Math.abs(p.z) > 0.45) p.vz *= -1;
        pAttr.setXYZ(i, p.x, p.y, p.z);
      }
      pAttr.needsUpdate = true;

      let li = 0;
      const cd2 = CONNECT_DIST * CONNECT_DIST;
      for (let a = 0; a < PARTICLE_COUNT; a++) {
        for (let b = a + 1; b < PARTICLE_COUNT; b++) {
          const pa = particles[a],
            pb = particles[b];
          const dx = pa.x - pb.x,
            dy = pa.y - pb.y,
            dz = pa.z - pb.z;
          if (dx * dx + dy * dy + dz * dz < cd2) {
            lineBuf[li++] = pa.x;
            lineBuf[li++] = pa.y;
            lineBuf[li++] = pa.z;
            lineBuf[li++] = pb.x;
            lineBuf[li++] = pb.y;
            lineBuf[li++] = pb.z;
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      camera.position.x += (mouse.x * 0.08 - camera.position.x) * 0.018;
      camera.position.y += (-mouse.y * 0.06 - camera.position.y) * 0.018;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      dotGeo.dispose();
      lineGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
});

GlobalBackground.displayName = 'GlobalBackground';
export default GlobalBackground;
