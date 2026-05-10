import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { useAppSelector } from '../../../app/hooks';
import { selectHeroSlides, selectCurrentIndex } from '../../../store/heroSlice';

/*
  BoxGeometry material slots: [+X, -X, +Y, -Y, +Z, -Z]
  We cycle through 4 Y-axis faces so the cube only ever spins horizontally.

  slide 0 → front (+Z, slot 4) → rotY =  0
  slide 1 → right (+X, slot 0) → rotY = -π/2
  slide 2 → back  (-Z, slot 5) → rotY =  π
  slide 3 → left  (-X, slot 1) → rotY =  π/2
*/
const FACE_SLOT  = [4, 0, 5, 1];
const FACE_ROTY  = [0, -Math.PI / 2, Math.PI, Math.PI / 2];

function placeholderMaterial(color = 0x0f172a) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.4, roughness: 0.55 });
}

const HeroImageSlider: React.FC = memo(() => {
  const mountRef   = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<THREE.Mesh | null>(null);
  const edgesRef   = useRef<THREE.LineSegments | null>(null);
  const cornersRef = useRef<THREE.Group | null>(null);
  const targetQ    = useRef(new THREE.Quaternion());
  const currentQ   = useRef(new THREE.Quaternion());

  const slides       = useAppSelector(selectHeroSlides);
  const currentIndex = useAppSelector(selectCurrentIndex);

  /* ── sync target quaternion on slide change ── */
  useEffect(() => {
    targetQ.current.setFromEuler(
      new THREE.Euler(0, FACE_ROTY[currentIndex % 4], 0),
    );
  }, [currentIndex]);

  /* ── load / refresh textures when slides arrive ── */
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube || !slides.length) return;

    const loader = new THREE.TextureLoader();
    const mats   = cube.material as THREE.MeshStandardMaterial[];

    slides.slice(0, 4).forEach((slide, i) => {
      if (!slide.img) return;
      loader.load(slide.img, (tex) => {
        tex.colorSpace     = THREE.SRGBColorSpace;
        const slot         = FACE_SLOT[i];
        mats[slot].map     = tex;
        mats[slot].color.set(0xffffff);
        mats[slot].roughness  = 0.2;
        mats[slot].metalness  = 0.05;
        mats[slot].needsUpdate = true;
      });
    });
  }, [slides]);

  /* ── Three.js scene (once) ── */
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    /* scene / camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    /* lights */
    scene.add(new THREE.AmbientLight(0x1e293b, 2.5));

    const key = new THREE.DirectionalLight(0x38bdf8, 4);
    key.position.set(4, 6, 5);
    scene.add(key);

    const fill = new THREE.PointLight(0x818cf8, 3, 22);
    fill.position.set(-5, -3, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    rim.position.set(-3, 2, -5);
    scene.add(rim);

    /* cube */
    const materials = Array.from({ length: 6 }, (_, i) =>
      placeholderMaterial([0x0f172a, 0x0f172a, 0x0c1525, 0x0c1525, 0x132038, 0x0f172a][i]),
    );
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 2.8), materials);
    scene.add(cube);
    cubeRef.current = cube;

    /* glowing edges */
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.85, 2.85, 2.85)),
      edgesMat,
    );
    scene.add(edges);
    edgesRef.current = edges;

    /* glowing corner dots */
    const h = 1.43;
    const verts: [number, number, number][] = [
      [ h,  h,  h], [-h,  h,  h], [ h, -h,  h], [-h, -h,  h],
      [ h,  h, -h], [-h,  h, -h], [ h, -h, -h], [-h, -h, -h],
    ];
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const corners = new THREE.Group();
    verts.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), dotMat);
      dot.position.set(x, y, z);
      corners.add(dot);
    });
    scene.add(corners);
    cornersRef.current = corners;

    /* background particles */
    const pPos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
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

      /* smooth face rotation */
      currentQ.current.slerp(targetQ.current, 0.04);
      cube.setRotationFromQuaternion(currentQ.current);
      edges.setRotationFromQuaternion(currentQ.current);
      corners.setRotationFromQuaternion(currentQ.current);

      /* gentle float */
      const floatY = Math.sin(t * 0.55) * 0.09;
      cube.position.y    = floatY;
      edges.position.y   = floatY;
      corners.position.y = floatY;

      /* edge pulse */
      edgesMat.opacity = 0.38 + Math.sin(t * 1.6) * 0.14;

      renderer.render(scene, camera);
    };
    animate();

    /* resize */
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
      materials.forEach(m => m.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
});

HeroImageSlider.displayName = 'HeroImageSlider';
export default HeroImageSlider;
