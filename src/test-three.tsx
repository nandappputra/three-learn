import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbitControl = new OrbitControls(camera, renderer.domElement);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
camera.position.set(3, 2, 5);
camera.rotateY(0.6);
orbitControl.update();

// Box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// box.receiveShadow = true;
box.castShadow = true;
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffaa,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.receiveShadow = true;
plane.castShadow = true;
plane.position.z = 10;
// plane.rotation.x = -0.5 * Math.PI;

// Sphere
const sphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  //   wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.position.z = -5;
scene.add(sphere);

// Grid
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const gui = new dat.GUI();
const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 2,
};
gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e as string);
});

gui.add(options, "wireframe").onChange((e) => {
  sphere.material.wireframe = e as boolean;
});

gui.add(options, "speed", 0, 10);

const ambientLight = new THREE.AmbientLight("0xeaeaea");
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("0xeaeaea", 3);
scene.add(directionalLight);
directionalLight.position.set(0, 0, 50);
directionalLight.shadow.camera.near = -12;

const directionalHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalHelper);
const directionalShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalShadowHelper);

function animation(time: number) {
  box.position.x = 5 * Math.sin((time / 1000) * options.speed);
  box.position.z = 6 * Math.cos((time / 1000) * options.speed);
  box.rotation.y = time / 500;
  //   box.position.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);

const cursorLocation = {
  x:0,
  y:0
};
window.addEventListener('mousemove', (event) => {
  cursorLocation.x = event.clientX;
  cursorLocation.y = event.clientY;
});
