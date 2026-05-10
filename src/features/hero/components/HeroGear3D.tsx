import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

/* ─── helpers ─────────────────────────────────────────── */
function makeGlowSphere(radius: number, opacity: number, color: number): THREE.Mesh {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
  });
  return new THREE.Mesh(geo, mat);
}

interface OrbitRing {
  inclineGroup: THREE.Group;
  spinGroup: THREE.Group;
  speed: number;
}

function makeOrbitRing(
  radius: number,
  color: number,
  inclination: number,
  speed: number,
  particleCount = 220,
  orbCount = 4,
): OrbitRing {
  const inclineGroup = new THREE.Group();
  inclineGroup.rotation.x = inclination;

  const spinGroup = new THREE.Group();
  inclineGroup.add(spinGroup);

  /* ring path (thin torus) */
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.007, 8, 128),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  spinGroup.add(torus);

  /* distributed particles along ring */
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const a = (i / particleCount) * Math.PI * 2;
    pPos[i * 3]     = Math.cos(a) * radius;
    pPos[i * 3 + 1] = Math.sin(a) * radius;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  spinGroup.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })));

  /* bright orb spheres orbiting on top */
  for (let i = 0; i < orbCount; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.z = (i / orbCount) * Math.PI * 2;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    orb.position.set(radius, 0, 0);
    pivot.add(orb);
    spinGroup.add(pivot);
  }

  return { inclineGroup, spinGroup, speed };
}

/* ─── component ───────────────────────────────────────── */
const HeroGear3D: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    /* scene / camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    /* master group — slow drift rotation */
    const root = new THREE.Group();
    scene.add(root);

    /* ── CORE ── */
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: new THREE.Color(0x0ea5e9),
        emissiveIntensity: 2.2,
        metalness: 0.1,
        roughness: 0.3,
      }),
    );
    root.add(core);

    /* glow halos around core */
    root.add(makeGlowSphere(0.55, 0.55, 0x38bdf8));
    root.add(makeGlowSphere(0.80, 0.22, 0x0ea5e9));
    root.add(makeGlowSphere(1.15, 0.09, 0x7dd3fc));
    root.add(makeGlowSphere(1.60, 0.04, 0x38bdf8));

    /* ── ORBITAL RINGS ── */
    const rings: OrbitRing[] = [
      makeOrbitRing(2.0, 0x38bdf8, 0,                    0.30, 240, 5),
      makeOrbitRing(2.5, 0x818cf8, Math.PI * 0.38,       -0.20, 280, 4),
      makeOrbitRing(1.6, 0x67e8f9, Math.PI * -0.22,       0.45, 180, 3),
    ];
    rings.forEach(r => root.add(r.inclineGroup));

    /* ── LIGHTS ── */
    const coreLight = new THREE.PointLight(0x38bdf8, 6, 12);
    root.add(coreLight);

    scene.add(new THREE.AmbientLight(0x1e293b, 1.5));

    const fillLight = new THREE.PointLight(0x818cf8, 2, 30);
    fillLight.position.set(-6, 4, 5);
    scene.add(fillLight);

    /* ── BACKGROUND STARS ── */
    const starPos = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 8 + Math.random() * 6;
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xbae6fd,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })));

    /* ── ANIMATION ── */
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* slow root drift */
      root.rotation.y = t * 0.08;
      root.rotation.x = Math.sin(t * 0.12) * 0.15;

      /* core pulse */
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      core.scale.setScalar(pulse);

      /* ring spins */
      rings.forEach(r => { r.spinGroup.rotation.z += r.speed * 0.005; });

      renderer.render(scene, camera);
    };
    animate();

    /* ── RESIZE ── */
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
