import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface ShapeConfig {
  geometry: THREE.BufferGeometry;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  sz: number;
}

const WireframeScene: React.FC = memo(() => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isDark = theme === 'dark';
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.z = 12;

    // ── Wireframe color ───────────────────────────────────
    const color = isDark ? 0x38bdf8 : 0x0ea5e9;
    const opacity = isDark ? 0.18 : 0.13;

    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity,
    });

    // ── Shapes (CAD / 3D-printing aesthetic) ─────────────
    const shapeConfigs: ShapeConfig[] = [
      // large icosahedra — top-right
      { geometry: new THREE.IcosahedronGeometry(2.8, 1),  x:  6, y:  4, z: -4,  rx: 0.003, ry: 0.005, rz: 0.002, sx: 1, sy: 1, sz: 1 },
      // medium octa — bottom-left
      { geometry: new THREE.OctahedronGeometry(1.8, 0),   x: -7, y: -5, z: -2,  rx: 0.004, ry: 0.003, rz: 0.005, sx: 1, sy: 1, sz: 1 },
      // small box — center-right
      { geometry: new THREE.BoxGeometry(1.6, 1.6, 1.6),   x:  4, y: -2, z:  0,  rx: 0.006, ry: 0.004, rz: 0.003, sx: 1, sy: 1, sz: 1 },
      // torus — left
      { geometry: new THREE.TorusGeometry(1.5, 0.35, 8, 20), x: -5, y:  3, z: -1, rx: 0.005, ry: 0.006, rz: 0.002, sx: 1, sy: 1, sz: 1 },
      // tiny icosa — top-left
      { geometry: new THREE.IcosahedronGeometry(1.0, 0),  x: -3, y:  6, z:  1,  rx: 0.007, ry: 0.004, rz: 0.006, sx: 1, sy: 1, sz: 1 },
      // tiny box — bottom-right
      { geometry: new THREE.BoxGeometry(0.9, 0.9, 0.9),   x:  8, y: -5, z:  2,  rx: 0.005, ry: 0.008, rz: 0.004, sx: 1, sy: 1, sz: 1 },
      // medium tetra (using icosa detail=0) — center
      { geometry: new THREE.TetrahedronGeometry(1.4, 0),   x:  1, y:  1, z: -6,  rx: 0.004, ry: 0.005, rz: 0.003, sx: 1, sy: 1, sz: 1 },
    ];

    const meshes: THREE.Mesh[] = shapeConfigs.map(cfg => {
      const mesh = new THREE.Mesh(cfg.geometry, mat.clone());
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      // Store drift speeds in userData
      mesh.userData = { rx: cfg.rx, ry: cfg.ry, rz: cfg.rz };
      scene.add(mesh);
      return mesh;
    });

    // ── Mouse parallax ────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 0.6;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
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
    const animate = () => {
      animId = requestAnimationFrame(animate);
      meshes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rx;
        mesh.rotation.y += mesh.userData.ry;
        mesh.rotation.z += mesh.userData.rz;
      });

      // Subtle camera drift following mouse
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      shapeConfigs.forEach(cfg => cfg.geometry.dispose());
      meshes.forEach(m => (m.material as THREE.Material).dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
});

WireframeScene.displayName = 'WireframeScene';
export default WireframeScene;
