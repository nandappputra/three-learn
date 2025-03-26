import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TestVertexShaders from "../shaders/test_vertex_shaders.glsl";
import TestFragmentShaders from "../shaders/test_fragment_shaders.glsl";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

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

const material = new THREE.RawShaderMaterial({
  vertexShader: TestVertexShaders,
  fragmentShader: TestFragmentShaders,
  uniforms: {
    uFreq: { value: new THREE.Vector3(1, 1, 1) },
  },
});

material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
      #include <begin_vertex>
      float angle = 0.3;
    `
  );
};

// const material = new THREE.MeshBasicMaterial({
//   color: new THREE.Color("red"),
// });

// const boxGeometry = new THREE.BoxGeometry();
// const box = new THREE.Mesh(boxGeometry, material);
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(5, 5, 20, 20);
const randoms = new Float32Array(planeGeometry.attributes.position.count);
for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
  randoms[i] = Math.random();
}

planeGeometry.setAttribute("aRandoms", new THREE.BufferAttribute(randoms, 1)); // will be used to determine whether to use float, vec2, etc.
console.log("RANDOMS:", randoms);

const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI / 2;

scene.add(plane);

const light = new THREE.DirectionalLight();
light.position.y = 3;
scene.add(light);

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

function animation(time: number) {
  plane.rotation.x = Math.sin(time / 1000);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animation);
