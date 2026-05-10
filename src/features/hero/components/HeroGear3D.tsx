import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { useAppSelector } from '../../../app/hooks';
import { selectHeroSlides, selectCurrentIndex } from '../../../store/heroSlice';

/*
  BoxGeometry material order: [+X, -X, +Y, -Y, +Z, -Z]
  We map slides → faces → target Y-rotation so the correct face faces the camera.

  slide 0 → front (+Z, mat 4) → rotY = 0
  slide 1 → right (+X, mat 0) → rotY = -PI/2
  slide 2 → back  (-Z, mat 5) → rotY =  PI
  slide 3 → left  (-X, mat 1) → rotY =  PI/2
*/
const FACE_INDEX  = [4, 0, 5, 1];          // which material slot per slide (mod 4)
const TARGET_ROTY = [0, -Math.PI / 2, Math.PI, Math.PI / 2];

function buildMaterials(): THREE.MeshStandardMaterial[] {
  return Array.from({ length: 6 }, () =>
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.4,
      roughness: 0.5,
    }),
  );
}

const HeroGear3D: React.FC = memo(() => {
  const mountRef   = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<THREE.Mesh | null>(null);
  const targetQuat = useRef(new THREE.Quaternion());
  const currentQ   = useRef(new THREE.Quaternion());

  const slides       = useAppSelector(selectHeroSlides);
  const currentIndex = useAppSelector(selectCurrentIndex);

  /* ── sync target rotation whenever currentIndex changes ── */
  useEffect(() => {
    const angle = TARGET_ROTY[currentIndex % 4];
    targetQuat.current.setFromEuler(new THREE.Euler(0, angle, 0));
  }, [currentIndex]);

  /* ── load textures onto cube faces whenever slides arrive ── */
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube || !slides.length) return;
    const loader  = new THREE.TextureLoader();
    const mats    = cube.material as THREE.MeshStandardMaterial[];

    slides.slice(0, 4).forEach((slide, i) => {
      if (!slide.img) return;
      loader.load(slide.img, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        mats[FACE_INDEX[i]].map       = tex;
        mats[FACE_INDEX[i]].color.set(0xffffff);
        mats[FACE_INDEX[i]].roughness = 0.25;
        mats[FACE_INDEX[i]].metalness = 0.1;
        mats[FACE_INDEX[i]].needsUpdate = true;
      });
    });
  }, [slides]);

  /* ── Three.js scene (runs once) ── */
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    /* scene / camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    /* ── lights ── */
    scene.add(new THREE.AmbientLight(0x1e293b, 2));

    const key = new THREE.DirectionalLight(0x38bdf8, 3.5);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.PointLight(0x818cf8, 2.5, 20);
    fill.position.set(-5, -3, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(-3, 2, -5);
    scene.add(rim);

    /* ── cube ── */
    const geometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
    const materials = buildMaterials();
    const cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    scene.add(cube);
    cubeRef.current = cube;

    /* ── glowing edge lines ── */
    const edgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.84, 2.84, 2.84));
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    scene.add(edges);

    /* ── corner glow spheres at cube vertices ── */
    const half = 1.42;
    const corners: [number, number, number][] = [
      [ half,  half,  half], [-half,  half,  half],
      [ half, -half,  half], [-half, -half,  half],
      [ half,  half, -half], [-half,  half, -half],
      [ half, -half, -half], [-half, -half, -half],
    ];
    const cornerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const cornerGroup = new THREE.Group();
    corners.forEach(([x, y, z]) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), cornerMat);
      m.position.set(x, y, z);
      cornerGroup.add(m);
    });
    scene.add(cornerGroup);

    /* ── floating particles ── */
    const ptCount = 120;
    const ptPos   = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      ptPos[i * 3]     = (Math.random() - 0.5) * 12;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
      color: 0x38bdf8, size: 0.04,
      transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    /* ── animation ── */
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* smooth rotation towards target face */
      currentQ.current.slerp(targetQuat.current, 0.035);
      cube.setRotationFromQuaternion(currentQ.current);

      /* sync edge lines + corner glows with cube */
      edges.setRotationFromQuaternion(currentQ.current);
      cornerGroup.setRotationFromQuaternion(currentQ.current);

      /* subtle ambient float */
      cube.position.y        = Math.sin(t * 0.6) * 0.08;
      edges.position.y       = cube.position.y;
      cornerGroup.position.y = cube.position.y;

      /* edge glow pulse */
      (edgesMat as THREE.LineBasicMaterial).opacity = 0.4 + Math.sin(t * 1.5) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    /* ── resize ── */
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

HeroGear3D.displayName = 'HeroGear3D';
export default HeroGear3D;
