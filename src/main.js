import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCubeRenderer } from './js/cubeSimplyRenderer.js';
// import { cubeGroup, cubePieces } from './js/cubeRenderer.js';
// import { cubeGroup, cubePieces } from './js/cubeMidleRenderer.js';
// import { cubeGroup, cubePieces } from './js/cubeSimplyRenderer.js';
// let cubeGroup;
// let cubePieces;
// cubeMidleRenderer;
// if (size <= 7) {
//   ({ cubeGroup, cubePieces } = await import('./js/cubeMidleRenderer.js'));
// } else if (size <= 14) {
//   ({ cubeGroup, cubePieces } = await import('./js/cubeRenderer.js'));
// } else if (size <= 30) {
//   ({ cubeGroup, cubePieces } = await import('./js/cubeSimplyRenderer.js'));
// } else {
// function initRender() {
//   ({ cubeGroup, cubePieces } = import('./js/cubeSimplyRenderer.js'));
// }
// // }
// initRender();
// const cube = new Cube100(cubePieces, cubeGroup, size);

// scene.add(cubeGroup);

import { Cube100 } from './js/Cube100.js';
import { DEFAULT_SIZE } from './js/constants';
import { CubeState } from './js/CubeState.js';
let size = DEFAULT_SIZE;
let cubeState = new CubeState(size);
const scene = new THREE.Scene();

let cubeGroup;
let cubePieces;
let cube;

function initRender() {
  ({ cubeGroup, cubePieces } = createCubeRenderer(cubeState, size));
  cube = new Cube100(cubePieces, cubeGroup, size, cubeState, stopAnimationMode);
  scene.add(cubeGroup);
}

initRender();

// const cube = new Cube100(cubePieces, cubeGroup, size);
// console.log('cubePieces', cubePieces);
// console.log('cubeGroup', cubeGroup);

// scene.add(cubeGroup);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
const cubeContainer = document.querySelector('#cube-container');

cubeContainer.appendChild(renderer.domElement);
renderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);

window.addEventListener('resize', () => {
  camera.aspect = cubeContainer.clientWidth / cubeContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
});

// window.addEventListener('resize', () => {
//   camera.aspect = cubeContainer.clientWidth / cubeContainer.clientHeight;

//   camera.updateProjectionMatrix();

//   renderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);

//   fitCubeToViewport(cubeGroup, size, 1, camera, cubeContainer);
// });

// -----------------------Light-----------------------
const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x404040, 1.2);
scene.add(hemiLight);
const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(5, 8, 7);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(-6, 4, -6);
scene.add(rimLight);
scene.background = new THREE.Color(0x444444);
// ------------------------End Light-----------------------

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.set(size, size, size);
camera.lookAt(0, 0, 0);

// ====================
// CAMERA
// ====================
const saveBtn = document.querySelector('#save-btn');
const loadBtn = document.querySelector('#load-btn');

const resetBtn = document.querySelector('#reset-btn');
const solveBtn = document.querySelector('#solve-btn');
const scrambleBtn = document.querySelector('#scramble-btn');

const solveFisrtSide = document.querySelector('#solve-first-side');
const solveSecondSide = document.querySelector('#solve-second-side');
const solveThirdSide = document.querySelector('#solve-third-side');
const solveFourthSide = document.querySelector('#solve-fourth-side');
const solveFifthSixSide = document.querySelector('#solve-fifth-sixth-side');
const solveEdges1 = document.querySelector('#solve-edges-part-1');
const solveEdges2 = document.querySelector('#solve-edges-part-2');

const headerEl = document.querySelector('.header');
const solveListFirstEl = document.querySelector('.solve-list-first');
const solveListLastEl = document.querySelector('.solve-list-last');
const cubeControlsEl = document.querySelector('.cube-controls');
const speedMenuEl = document.querySelector('#speedMenu');

let animationMode = false;
let speedMenuTimer = null;

resetBtn.addEventListener('click', () => resetCube());

function resetCube() {
  scene.remove(cubeGroup);

  cubeGroup.clear();
  cubeState = new CubeState(size);
  // cubeGroup = ;
  // cubePieces = null;
  // cube = null;
  scrambleBtn.disabled = false;
  initRender();
}

solveBtn.disabled = true;
scrambleBtn.disabled = false;

solveFisrtSide.disabled = true;
solveSecondSide.disabled = true;
solveThirdSide.disabled = true;
solveFourthSide.disabled = true;
solveFifthSixSide.disabled = true;
solveEdges1.disabled = true;
solveEdges2.disabled = true;

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.set(15, 15, 15);
// camera.lookAt(0, 0, 0);

// ====================
// RENDERER
// ====================

// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// ====================
// LIGHT
// ====================

// scene.add(new THREE.AmbientLight(0xffffff, 2));

// const light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(100, 100, 100);
// scene.add(light);

// ====================
// CONTROLS
// ====================

// const controls = new OrbitControls(camera, renderer.domElement);

// controls.enableDamping = true;
// controls.dampingFactor = 0.08;
// controls.enablePan = false;
// controls.minDistance = 0;
// controls.maxDistance = 40;

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

// =============================Scramle========================
scrambleBtn.addEventListener('click', () => {
  startAnimationMode();

  cube.scramble();
});

function startAnimationMode() {
  animationMode = true;

  console.log('header:', headerEl);
  console.log('solveListFirst:', solveListFirstEl);
  console.log('solveListLast:', solveListLastEl);
  console.log('cubeControls:', cubeControlsEl);
  console.log('speedMenu:', speedMenuEl);

  headerEl.classList.add('is-hidden');
  solveListFirstEl.classList.add('is-hidden');
  // solveListLastEl.classList.add('is-hidden');
  cubeControlsEl.classList.add('is-hidden');

  // showSpeedMenu();
}

function showSpeedMenu() {
  if (!animationMode) return;
  speedMenuEl.classList.add('visible');
  clearTimeout(speedMenuTimer);
  speedMenuTimer = setTimeout(() => {
    speedMenuEl.classList.remove('visible');
  }, 2000);
}

window.addEventListener('mousemove', () => {
  if (!animationMode) return;
  showSpeedMenu();
});

function stopAnimationMode() {
  animationMode = false;
  clearTimeout(speedMenuTimer);
  speedMenuEl.classList.remove('visible');
  headerEl.classList.remove('is-hidden');
  solveListFirstEl.classList.remove('is-hidden');
  // solveListLastEl.classList.remove('is-hidden');
  cubeControlsEl.classList.remove('is-hidden');
}

speedMenuEl.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const speed = button.dataset.speed;
  if (speed === 'end') {
    cube.finishAnimation();
    return;
  }
  cube.rotationSpeed = 0.1 * Number(speed);
});

// ------------------------simply algoritms--------------------------

solveFisrtSide.addEventListener('click', () => {
  startAnimationMode();
  cube.onSolve1thSide();
});

// -------------------------Local----------------
function saveCubeState() {
  console.log('MainClickSavecubeState.U', cubeState.U);
  const state = {
    size: cubeState.size,
    U: cubeState.U,
    D: cubeState.D,
    F: cubeState.F,
    B: cubeState.B,
    L: cubeState.L,
    R: cubeState.R,
  };
  localStorage.setItem('cubeState', JSON.stringify(state));
  console.log('Состояние кубика сохранено');
}

saveBtn.addEventListener('click', saveCubeState);

function loadCubeState() {
  const saved = localStorage.getItem('cubeState');

  if (!saved) {
    console.log('Сохранённого состояния нет');
    return;
  }

  const data = JSON.parse(saved);
  size = data.size;
  cubeState = new CubeState(size);
  cubeState.U = data.U;
  cubeState.D = data.D;
  cubeState.F = data.F;
  cubeState.B = data.B;
  cubeState.L = data.L;
  cubeState.R = data.R;

  console.log('Состояние загружено');
  console.log(data);
  scene.remove(cubeGroup);
  cubeGroup.clear();

  scrambleBtn.disabled = false;
  initRender();

  camera.position.set(size, size, size);
  cube.updateResetButtons();
}

loadBtn.addEventListener('click', loadCubeState);

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
// cube.scramble();
// cube.onSolve1thSide();

// cube.Rprime(5);
// cube.Uprime(3);
// cube.Fprime('2,4;7');
// cube.R(); // [[size]]
// cube.R(); // [[size]]
// cube.R(5); // [[5]]
// cube.R('5'); // [[5]]
// cube.R([5]); // [[5]]
// cube.R([2, 5]); // [[2,5]]
// cube.R('1,4;7;9,10');

// cube.rotateLayers('x', [[1, 4], [7], [10, 11]], -Math.PI / 2);
// cube.rotateLayers('y', [[1, 2], [6]], -Math.PI / 2);
// cube.rotateLayers('x', [[size - 1]], Math.PI / 2);
// cube.rotateLayers('x', [[size - 1]], -Math.PI / 2);
// cube.rotateLayers('z', [[3]], Math.PI / 2);
// cube.rotateLayers('y', [[size]], Math.PI / 2);
// cube.rotateLayers('y', [[1]], Math.PI / 2);
// cube.rotateLayers('z', [[size]], -Math.PI / 2);
// cube.rotateLayers('z', [[5]], -Math.PI / 2);
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
