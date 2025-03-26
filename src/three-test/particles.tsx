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
camera.position.set(3, 2, 5);
camera.rotateY(0.6);
orbitControl.update();

const bufferGeometry = new THREE.BufferGeometry();
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
]);
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const mixer = new THREE.AnimationMixer();
const material = new THREE.PointsMaterial();
material.transparent = true;
material.alphaMap = texture // load the alpha map texture
material.size = 0.01;
material.sizeAttenuation = true; // enable the size to be scaled according to distance

material.alphaTest = 0.01; // threshold to decide whether to show a pixel or not
material.depthTest = false; // toggle for occlusion
material.depthWrite = false; // toggle for whether to write in z-buffer

const particles = new THREE.Points(bufferGeometry, material);
scene.add(particles);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  particles.rotation.y = elapsedTime * 0.2;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
