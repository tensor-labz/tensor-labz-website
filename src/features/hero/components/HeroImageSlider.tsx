import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useAppSelector } from '../../../app/hooks';
import { selectHeroSlides, selectCurrentIndex } from '../../../store/heroSlice';
import type { HeroSlide } from '../../../services/heroService';

/*
  BoxGeometry material slots: [+X, -X, +Y, -Y, +Z, -Z]

  slide 0 → +Z front (slot 4)
  slide 1 → +X right (slot 0)
  slide 2 → -Z back  (slot 5)
  slide 3 → -X left  (slot 1)

  Cube always rotates -π/2 per slide step so it never reverses direction.
*/
const FACE_SLOT = [4, 0, 5, 1];
const STEP      = -Math.PI / 2; // clockwise (viewed from above) per slide

/* Draw image onto a 1024² canvas (cover-fit) → emissiveMap on MeshStandardMaterial.
   emissiveMap is unaffected by scene lighting so the image renders at full brightness. */
function applySlides(slides: HeroSlide[], mats: THREE.MeshStandardMaterial[]) {
  slides.slice(0, 4).forEach((slide, i) => {
    if (!slide.img) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.loading    = 'eager';
    img.onload = () => {
      const S = 1024;
      const canvas  = document.createElement('canvas');
      canvas.width  = S;
      canvas.height = S;
      const ctx   = canvas.getContext('2d')!;
      const scale = Math.max(S / img.naturalWidth, S / img.naturalHeight);
      const dw    = img.naturalWidth  * scale;
      const dh    = img.naturalHeight * scale;
      ctx.drawImage(img, (S - dw) / 2, (S - dh) / 2, dw, dh);

      const tex      = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;

      const mat        = mats[FACE_SLOT[i]];
      mat.map          = null;
      mat.color.set(0x000000);   // no diffuse contribution
      mat.emissiveMap  = tex;
      mat.emissive.set(0xffffff);
      mat.roughness    = 1.0;
      mat.metalness    = 0.0;
      mat.needsUpdate  = true;
    };
    img.onerror = (err) => console.error('[HeroImageSlider]', slide.img, err);
    img.src = slide.img;
  });
}

const HeroImageSlider: React.FC = memo(() => {
  const mountRef    = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const targetQ     = useRef(new THREE.Quaternion());
  const currentQ    = useRef(new THREE.Quaternion());
  const prevIndex   = useRef(0);

  const slides       = useAppSelector(selectHeroSlides);
  const currentIndex = useAppSelector(selectCurrentIndex);

  const slidesRef = useRef(slides);
  slidesRef.current = slides;

  /* ── delta rotation — always spins in the same direction, never reverses ── */
  useEffect(() => {
    const steps = currentIndex - prevIndex.current;
    prevIndex.current = currentIndex;
    if (steps === 0) return;
    const dq = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      steps * STEP,
    );
    targetQ.current.premultiply(dq);
  }, [currentIndex]);

  /* ── Three.js scene (once on mount) ── */
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    /* minimal lighting — image faces are emissive (light-independent) */
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const key = new THREE.DirectionalLight(0x7dd3fc, 0.5);
    key.position.set(4, 6, 5);
    scene.add(key);

    /* cube */
    const makeDark = (hex: number) =>
      new THREE.MeshStandardMaterial({ color: hex, metalness: 0.15, roughness: 0.85 });

    const materials: THREE.MeshStandardMaterial[] = [
      makeDark(0x0d1b2a), // +X
      makeDark(0x0d1b2a), // -X
      makeDark(0x091422), // +Y top
      makeDark(0x091422), // -Y bottom
      makeDark(0x0d1b2a), // +Z front
      makeDark(0x0d1b2a), // -Z back
    ];
    materialsRef.current = materials;

    const cube = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 2.8), materials);
    scene.add(cube);

    if (slidesRef.current.length) applySlides(slidesRef.current, materials);

    /* rounded wireframe overlay */
    const wireMesh = new THREE.Mesh(
      new RoundedBoxGeometry(2.82, 2.82, 2.82, 4, 0.22),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8, wireframe: true,
        transparent: true, opacity: 0.07, depthWrite: false,
      }),
    );
    scene.add(wireMesh);

    /* glowing rounded edge silhouette */
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new RoundedBoxGeometry(2.88, 2.88, 2.88, 4, 0.22), 15),
      edgesMat,
    );
    scene.add(edges);

    /* background particles */
    const ptPos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      ptPos[i * 3]     = (Math.random() - 0.5) * 14;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0x7dd3fc, size: 0.04,
      transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    /* animation */
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentQ.current.slerp(targetQ.current, 0.05);
      cube.setRotationFromQuaternion(currentQ.current);
      wireMesh.setRotationFromQuaternion(currentQ.current);
      edges.setRotationFromQuaternion(currentQ.current);

      const floatY        = Math.sin(t * 0.55) * 0.09;
      cube.position.y     = floatY;
      wireMesh.position.y = floatY;
      edges.position.y    = floatY;

      edgesMat.opacity = 0.6 + Math.sin(t * 1.6) * 0.18;

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      materials.forEach(m => m.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── reload textures when slides arrive after mount ── */
  useEffect(() => {
    if (!materialsRef.current.length || !slides.length) return;
    applySlides(slides, materialsRef.current);
  }, [slides]);

  return <div ref={mountRef} className="w-full h-full" />;
});

HeroImageSlider.displayName = 'HeroImageSlider';
export default HeroImageSlider;
