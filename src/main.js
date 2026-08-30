import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { cubeGroup, cubePieces } from './js/cubeRenderer.js';
import { cubeGroup, cubePieces } from './js/cubeMidleRenderer.js';
// import { cubeGroup, cubePieces } from './js/cubeSimplyRenderer.js';

import { Cube100 } from './js/Cube100.js';
import { size } from './js/constants';
import { CubeState } from './js/CubeState.js';
const cubeState = new CubeState(size);

const cube = new Cube100(cubePieces, cubeGroup, size);
// console.log('cubePieces', cubePieces);
// console.log('cubeGroup', cubeGroup);
const scene = new THREE.Scene();
scene.add(cubeGroup);

// ====================
// CAMERA
// ====================

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(15, 15, 15);
camera.lookAt(0, 0, 0);

// ====================
// RENDERER
// ====================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ====================
// LIGHT
// ====================

scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(100, 100, 100);
scene.add(light);

// ====================
// CONTROLS
// ====================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 100;
controls.maxDistance = 600;

// ====================
// ANIMATION
// ====================

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  cube.updateRotation();
  renderer.render(scene, camera);
}

animate();

// ------------------------------------------------------------------
// console.log('Front', cubeState.F);
// console.log('Right', cubeState.R);
// console.log('Left', cubeState.L);
// console.log('Down', cubeState.D);
// console.log('Back', cubeState.B);
// console.log('UP', cubeState.U);

// console.log('U ДО:', cubeState.U);

// cubeState.rotateFace('U');

// console.log('U ПОСЛЕ:', cubeState.U);

// cubeState.moveFrontStrip(0);
// console.log('U', cubeState.U);
// console.log('R', cubeState.R);
// console.log('D', cubeState.D);
// console.log('L', cubeState.L);
// -----------------------------------------------------------------
let before = cubePieces.map(piece => ({
  piece,
  coord: { ...piece.coord },
}));
cube.scramble();

// cube.Rprime(5);
// cube.Uprime(3);
// cube.Fprime('2,4;7');
// cube.R(); // [[size]]
// cube.R(5); // [[5]]
// cube.R('5'); // [[5]]
// cube.R([5]); // [[5]]
// cube.R([2, 5]); // [[2,5]]
// cube.R('1,4;7;10,11');

// cube.rotateLayers('x', [[1, 4], [7], [10, 11]], -Math.PI / 2);
// cube.rotateLayers('y', [[1, 2], [6]], -Math.PI / 2);
// cube.rotateLayers('x', [[size]], Math.PI / 2);
// cube.rotateLayers('x', [[1]], Math.PI / 2);
// cube.rotateLayers('y', [[size]], Math.PI / 2);
// cube.rotateLayers('y', [[1]], Math.PI / 2);
// cube.rotateLayers('z', [[size]], -Math.PI / 2);
// cube.rotateLayers('z', [[1]], -Math.PI / 2);
// console.log('U', cubeState.U);
// console.log('B', cubeState.B);
// console.log('D', cubeState.D);
// console.log('F', cubeState.F);
// cube.rotateLayer('x', size, -Math.PI);
// // cube.rotateLayer('y', size, -Math.PI / 2);
// // cube.rotateLayer('z', 2, Math.PI / 2);
// cube.rotateLayers('y', [[1]], Math.PI / 2);
// cube.rotateLayers('x', [[size]], Math.PI / 2);
// cube.rotateLayers('z', [[1]], Math.PI / 2);
// // cube.rotateLayer('y', 2, Math.PI / 2);
// cube.rotateLayers('z', [[5]], -Math.PI / 2);

// let before = cubePieces.map(piece => ({
//   piece,
//   coord: { ...piece.coord },
// }));
// rotateLayer('x', 2, Math.PI / 2);
// rotateLayer('z', 3, Math.PI / 2);

// console.table(
//   before.map(item => ({
//     object: item.piece,
//     before: `(${item.coord.x}, ${item.coord.y}, ${item.coord.z})`,
//     after: `(${item.piece.coord.x}, ${item.piece.coord.y}, ${item.piece.coord.z})`,
//   }))
// );

console.table(
  before
    .map(item => ({
      object: item.piece,
      before: `(${item.coord.x}, ${item.coord.y}, ${item.coord.z})`,
      after: `(${item.piece.coord.x}, ${item.piece.coord.y}, ${item.piece.coord.z})`,
      changed:
        item.coord.x !== item.piece.coord.x ||
        item.coord.y !== item.piece.coord.y ||
        item.coord.z !== item.piece.coord.z,
    }))
    .filter(item => item.changed)
);
