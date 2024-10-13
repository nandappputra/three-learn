import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

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
  //   box.position.y = time / 1000;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);
