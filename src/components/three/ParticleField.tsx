import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 0.28;
const MOUSE_INFLUENCE = 0.06;

const ParticleField: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isDark = theme === 'dark';

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 1.8;

    // ── Particles ─────────────────────────────────────────────
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 1.6,
      z: (Math.random() - 0.5) * 1.0,
      vx: (Math.random() - 0.5) * 0.0012,
      vy: (Math.random() - 0.5) * 0.0012,
      vz: (Math.random() - 0.5) * 0.0004,
    }));

    const dotColor = isDark ? 0x38bdf8 : 0x0ea5e9;     // sky-400 / sky-500
    const lineColor = isDark ? 0x38bdf8 : 0x0ea5e9;

    // Dot geometry
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(PARTICLE_COUNT * 3);
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));

    const dotMat = new THREE.PointsMaterial({
      color: dotColor,
      size: 0.018,
      sizeAttenuation: true,
      transparent: true,
      opacity: isDark ? 0.7 : 0.6,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // Line geometry (pre-alloc for max connections)
    const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: lineColor,
        transparent: true,
        opacity: isDark ? 0.15 : 0.12,
      })
    );
    scene.add(lineMat);

    // ── Mouse ─────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────────
    let animId: number;
    const pos = dotGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.vx + mouse.x * MOUSE_INFLUENCE * 0.001;
        p.y += p.vy + mouse.y * MOUSE_INFLUENCE * 0.001;
        p.z += p.vz;

        // Soft boundary bounce
        if (Math.abs(p.x) > 1.2) p.vx *= -1;
        if (Math.abs(p.y) > 0.85) p.vy *= -1;
        if (Math.abs(p.z) > 0.5)  p.vz *= -1;

        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true;

      // Build connection lines
      let lineIdx = 0;
      for (let a = 0; a < PARTICLE_COUNT; a++) {
        for (let b = a + 1; b < PARTICLE_COUNT; b++) {
          const pa = particles[a], pb = particles[b];
          const dx = pa.x - pb.x, dy = pa.y - pb.y, dz = pa.z - pb.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DISTANCE) {
            linePositions[lineIdx++] = pa.x;
            linePositions[lineIdx++] = pa.y;
            linePositions[lineIdx++] = pa.z;
            linePositions[lineIdx++] = pb.x;
            linePositions[lineIdx++] = pb.y;
            linePositions[lineIdx++] = pb.z;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Gentle scene rotation following mouse
      scene.rotation.y += (mouse.x * 0.04 - scene.rotation.y) * 0.03;
      scene.rotation.x += (mouse.y * 0.02 - scene.rotation.x) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      dotGeo.dispose();
      lineGeo.dispose();
      dotMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
});

ParticleField.displayName = 'ParticleField';
export default ParticleField;
