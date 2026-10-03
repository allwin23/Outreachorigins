import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Same "Or" outline as src/components/Mark.astro (viewBox 0 0 144 92), y flipped for 3D.
function markShapes() {
  const ring = new THREE.Shape();
  ring.absarc(46, -46, 46, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(46, -46, 24, 0, Math.PI * 2, true);
  ring.holes.push(hole);

  const r = new THREE.Shape();
  r.moveTo(100, -26); r.lineTo(122, -26); r.lineTo(122, -36);
  r.bezierCurveTo(127, -29, 135, -25, 144, -25);
  r.lineTo(144, -47);
  r.bezierCurveTo(130, -47, 122, -55, 122, -70);
  r.lineTo(122, -92); r.lineTo(100, -92); r.closePath();
  return [ring, r];
}

export function initMark3D(canvas: HTMLCanvasElement, { reduced = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.75;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // geometry
  const shapes = markShapes();
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth: 22, bevelEnabled: true, bevelThickness: 1.6, bevelSize: 1.1, bevelSegments: 6, curveSegments: 64,
  });
  geo.center();
  geo.scale(0.036, 0.036, 0.036);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x0b0b0a, metalness: 0.35, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, reflectivity: 0.6,
  });
  const mesh = new THREE.Mesh(geo, mat);
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  // soft rim light so the dark edges catch highlights
  const rim = new THREE.DirectionalLight(0xfff4e6, 1.4);
  rim.position.set(-4, 3, 2);
  scene.add(rim);

  // layout: large, right of centre, vertically centered
  let baseX = 0;
  let baseY = 0;
  const layout = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const mobile = w < 900;
    if (mobile) {
      group.scale.setScalar(0.52);
      baseX = 0;
      baseY = 0;
    } else {
      group.scale.setScalar(0.82);
      // Visible horizontal center of right area at z=0 with fov 30, camera z=12
      baseX = Math.min(3.0, Math.max(1.7, camera.aspect * 1.55));
      baseY = 0;
    }
    group.position.set(baseX, baseY, 0);
  };
  layout();
  new ResizeObserver(layout).observe(canvas);

  // interaction: pointer position swings the mark around, dragging spins it with inertia
  const hover = { x: 0, y: 0 }; // smoothed pointer offsets
  const aim = { x: 0, y: 0 };
  let yaw = -1.1, spin = 0, dragging = false, lastX = 0, lastY = 0, tilt = 0;
  addEventListener('pointermove', (e) => {
    aim.x = (e.clientX / innerWidth - 0.5) * 2; // -1 … 1
    aim.y = (e.clientY / innerHeight - 0.5) * 2;
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    yaw += dx * 0.012; spin = dx * 0.012; tilt = Math.max(-0.6, Math.min(0.6, tilt + dy * 0.006));
  });
  const hero = canvas.closest('.hero') ?? canvas;
  hero.addEventListener('pointerdown', (e) => {
    const t = e.target as Element;
    if ((e as PointerEvent).button !== 0 || t.closest('a, button, input, textarea, label')) return;
    dragging = true; lastX = (e as PointerEvent).clientX; lastY = (e as PointerEvent).clientY;
    document.documentElement.classList.add('is-dragging');
  });
  const release = () => { dragging = false; document.documentElement.classList.remove('is-dragging'); };
  addEventListener('pointerup', release);
  addEventListener('pointercancel', release);
  addEventListener('blur', release);

  let visible = true;
  new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(canvas);

  // entrance
  group.rotation.set(0.2, yaw, 0);
  mat.opacity = 0;
  mat.transparent = true;

  const clock = new THREE.Clock();
  const AUTO = 0.28; // rad/s — slow, steady left-to-right turn
  const tick = () => {
    requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible) return;
    const t = clock.elapsedTime;
    const scroll = Math.min(1, scrollY / innerHeight);
    if (!dragging) {
      yaw += (reduced ? 0 : AUTO * dt) + spin;
      spin *= Math.pow(0.04, dt); // inertia fades back to the idle turn
      tilt *= Math.pow(0.35, dt);
    }
    hover.x += (aim.x - hover.x) * Math.min(1, dt * 3);
    hover.y += (aim.y - hover.y) * Math.min(1, dt * 3);
    group.rotation.y = yaw + hover.x * 0.9 + scroll * 0.6;
    group.rotation.x += (hover.y * 0.25 + tilt + scroll * 0.25 - group.rotation.x) * Math.min(1, dt * 6);
    
    // Keep position pinned at baseX, baseY with gentle vertical oscillation float
    const floatY = reduced ? 0 : Math.sin(t * 1.2) * 0.06;
    group.position.set(baseX, baseY + floatY, 0);

    if (mat.opacity < 1) { mat.opacity = Math.min(1, mat.opacity + dt * 1.2 + 0.01); if (mat.opacity >= 1) mat.transparent = false; }
    renderer.render(scene, camera);
  };
  tick();
}
