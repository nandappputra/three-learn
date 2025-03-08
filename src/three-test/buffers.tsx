import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const canvas = renderer.domElement;
document.body.appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbitControl = new OrbitControls(camera, canvas);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
camera.position.set(3, 2, 5);
camera.rotateY(0.6);
orbitControl.update();

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("starting");
};
loadingManager.onLoad = () => {
  console.log("hi");
};

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.5,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(1, 2, 3);
scene.add(box);

const light = new THREE.DirectionalLight();
// light.color = new THREE.Color("#FFFFFF");
scene.add(light);

const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array([
  -1.0,
  -1.0,
  1.0, // v0
  1.0,
  -1.0,
  1.0, // v1
  1.0,
  1.0,
  1.0, // v2

  1.0,
  1.0,
  1.0, // v3
  -1.0,
  1.0,
  1.0, // v4
  -1.0,
  -1.0,
  1.0, // v5
]);

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animation(time: number) {
  box.rotation.x = Math.sin(time);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);

window.addEventListener("resize", () => {
  // Get the new sizes
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update cameras
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // ensure smooth render across densities
});

const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await canvas.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
};

window.addEventListener("dblclick", () => {
  void toggleFullscreen();
});
