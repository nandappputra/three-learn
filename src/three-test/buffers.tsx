import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Set the renderer to generate shadowmap

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

const material = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  metalness: 0.5,
});
const boxGeometry = new THREE.BoxGeometry();
const box = new THREE.Mesh(boxGeometry, material);
box.position.set(0, 1, 0);
box.castShadow = true; // Mark the object to cast shadows.

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true; // Mark the object to receive shadows

scene.add(box);
scene.add(plane);

const light = new THREE.DirectionalLight();
light.castShadow = true; // mark the light to cast shadow
light.position.y = 3;

// Shadow quality. Must be a multiply of 2
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

// Adjust the light's camera fulcrum
light.shadow.camera.near = 1;
light.shadow.camera.far = 4;
light.shadow.camera.top = 2;
light.shadow.camera.bottom = -2;
light.shadow.camera.left = -2;
light.shadow.camera.right = 2;

scene.add(light);

// Helper to visualize the fulcrum
const lightCameraHelper = new THREE.CameraHelper(light.shadow.camera);
scene.add(lightCameraHelper);

// const geometry = new THREE.BufferGeometry();
// // create a simple square shape. We duplicate the top left and bottom right
// // vertices because each vertex needs to appear once per triangle.
// const vertices = new Float32Array([
//   -1.0,
//   -1.0,
//   1.0, // v0
//   1.0,
//   -1.0,
//   1.0, // v1
//   1.0,
//   1.0,
//   1.0, // v2

//   1.0,
//   1.0,
//   1.0, // v3
//   -1.0,
//   1.0,
//   1.0, // v4
//   -1.0,
//   -1.0,
//   1.0, // v5
// ]);

// // itemSize = 3 because there are 3 values (components) per vertex
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

function animation(time: number) {
  box.rotation.x = Math.sin(time / 1000);
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
