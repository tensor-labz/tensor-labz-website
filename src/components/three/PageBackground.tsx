import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Shared interior-page background — same particle + connection-line language
 * as the home hero but slower, more spaced, with a radial vignette.
 * Drop this behind any page that needs an animated backdrop.
 */

const PARTICLE_COUNT  = 55;
const CONNECT_DIST    = 0.32;
const SPEED           = 0.0007;

const PageBackground: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isDark = theme === 'dark';

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 2.2;

    // ── Colors ────────────────────────────────────────────
    const accent     = isDark ? 0x38bdf8 : 0x0ea5e9;
    const dotOpacity = isDark ? 0.55 : 0.45;
    const lineOpacity= isDark ? 0.12 : 0.09;

    // ── Particles ─────────────────────────────────────────
    interface P { x: number; y: number; z: number; vx: number; vy: number; vz: number }
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  (Math.random() - 0.5) * 3.0,
      y:  (Math.random() - 0.5) * 2.0,
      z:  (Math.random() - 0.5) * 0.8,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      vz: (Math.random() - 0.5) * SPEED * 0.4,
    }));

    // Dots
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(PARTICLE_COUNT * 3);
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));

    const dotMat = new THREE.PointsMaterial({
      color: accent, size: 0.022, sizeAttenuation: true,
      transparent: true, opacity: dotOpacity,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    // Lines
    const maxSegs = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const lineBuf  = new Float32Array(maxSegs * 6);
    const lineGeo  = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineBuf, 3));

    const lineSegs = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      color: accent, transparent: true, opacity: lineOpacity,
    }));
    scene.add(lineSegs);

    // ── Vignette overlay quad ─────────────────────────────
    // A full-screen plane rendered in screen-space so the edges fade to bg.
    const vigGeo  = new THREE.PlaneGeometry(10, 6);
    const vigMat  = new THREE.MeshBasicMaterial({
      color: isDark ? 0x020617 : 0xf8fafc,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    // We'll skip the WebGL vignette and handle it via CSS gradient overlay instead.
    vigGeo.dispose();
    vigMat.dispose();

    // ── Mouse ─────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────
    let animId: number;
    const pAttr = dotGeo.attributes.position as THREE.BufferAttribute;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.vx + mouse.x * 0.00006;
        p.y += p.vy + mouse.y * 0.00006;
        p.z += p.vz;
        if (Math.abs(p.x) > 1.55) p.vx *= -1;
        if (Math.abs(p.y) > 1.05) p.vy *= -1;
        if (Math.abs(p.z) > 0.45) p.vz *= -1;
        pAttr.setXYZ(i, p.x, p.y, p.z);
      }
      pAttr.needsUpdate = true;

      let li = 0;
      for (let a = 0; a < PARTICLE_COUNT; a++) {
        for (let b = a + 1; b < PARTICLE_COUNT; b++) {
          const pa = particles[a], pb = particles[b];
          const dx = pa.x - pb.x, dy = pa.y - pb.y, dz = pa.z - pb.z;
          if (dx*dx + dy*dy + dz*dz < CONNECT_DIST * CONNECT_DIST) {
            lineBuf[li++] = pa.x; lineBuf[li++] = pa.y; lineBuf[li++] = pa.z;
            lineBuf[li++] = pb.x; lineBuf[li++] = pb.y; lineBuf[li++] = pb.z;
          }
        }
      }
      lineGeo.setDrawRange(0, li / 3);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Very gentle scene tilt from mouse
      scene.rotation.y += (mouse.x * 0.025 - scene.rotation.y) * 0.02;
      scene.rotation.x += (mouse.y * 0.015 - scene.rotation.x) * 0.02;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      dotGeo.dispose(); lineGeo.dispose(); dotMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Radial vignette — fades edges to bg-base so content pops */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, var(--bg-base) 85%)',
        }}
      />

      {/* Bottom fade for smooth scroll transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-base))' }}
      />
    </div>
  );
});

PageBackground.displayName = 'PageBackground';
export default PageBackground;
