import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createRain } from './js/wrapper/rain.js';
import { createStars } from './js/wrapper/stars.js';
import { createSnow } from './js/wrapper/snow.js';
import { createSpaceShip } from './js/wrapper/spaceShip.js';

import { createCubeRenderer as createMidleRenderer } from './js/cubeMidleRenderer.js';
import { createCubeRenderer as createSimplyRenderer } from './js/cubeSimplyRenderer.js';
import { createCubeRenderer as createHardRenderer } from './js/cubeRenderer.js';
import { createCubeRenderer as createSphereRenderer } from './js/cubeSphereRenderer.js';

import { Cube100 } from './js/Cube100.js';
import { DEFAULT_SIZE } from './js/constants';
import { CubeState } from './js/CubeState.js';
let size = DEFAULT_SIZE;

let renderMode = 'expanded';
let cubeState = new CubeState(size);
const scene = new THREE.Scene();

let cubeGroup;
let cubePieces;
let cube;

function initRender() {
  let createRenderer;
  if (renderMode === 'expanded') {
    createRenderer = createMidleRenderer;
  } else if (renderMode === 'bulged') {
    createRenderer = createHardRenderer;
  } else if (renderMode === 'spherical') {
    createRenderer = createSphereRenderer;
  } else {
    createRenderer = createSimplyRenderer;
  }
  // const createRenderer =
  //   renderMode === 'expanded' ? createMidleRenderer : createSimplyRenderer;

  ({ cubeGroup, cubePieces } = createRenderer(cubeState, size));
  // ({ cubeGroup, cubePieces } = createCubeRenderer(cubeState, size));
  cube = new Cube100(cubePieces, cubeGroup, size, cubeState, stopAnimationMode);

  scene.add(cubeGroup);
}

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const cubeContainer = document.querySelector('#cube-container');

function updateCamera() {
  const isPortrait = cubeContainer.clientHeight > cubeContainer.clientWidth;

  console.log({
    width: cubeContainer.clientWidth,
    height: cubeContainer.clientHeight,
    cameraDistance: camera.position.length(),
    portrait: cubeContainer.clientHeight > cubeContainer.clientWidth,
  });

  if (renderMode === 'bulged' || renderMode === 'spherical') {
    const cameraDistance = size * 1.8;

    camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  } else {
    const cameraDistance = isPortrait
      ? size * 1.7 * Math.max(1, 390 / cubeContainer.clientHeight)
      : size * 1.2 * Math.max(1, 390 / cubeContainer.clientWidth);

    camera.position.set(cameraDistance, cameraDistance, cameraDistance);
    // camera.lookAt(0, 0, 0);
  }
  camera.lookAt(0, 0, 0);
}

window.addEventListener('resize', updateCamera);
updateCamera();
initRender();
cube.updateResetButtons();

// -----------------------------Background------------------------------
let stopBackground = null;

setBackground('stars');

function setBackground(mode) {
  if (stopBackground) {
    stopBackground();
    stopBackground = null;
  }

  if (mode === 'rain') {
    stopBackground = createRain(cubeContainer);
  } else if (mode === 'snow') {
    stopBackground = createSnow(cubeContainer);
  } else if (mode === 'stars') {
    stopBackground = createStars(cubeContainer);
  } else if (mode === 'spaceShip') {
    stopBackground = createSpaceShip(cubeContainer);
  }
}
// const stopRain = createRain(cubeContainer);

// const performanceModal = document.querySelector('#performance-modal');
// const performanceOk = document.querySelector('#performance-ok');

// if (!localStorage.getItem('performance-notice-shown')) {
//   performanceModal.classList.remove('is-hidden');
// }

// performanceOk.addEventListener('click', () => {
//   performanceModal.classList.add('is-hidden');
//   localStorage.setItem('performance-notice-shown', 'true');
// });

const performanceModal = document.querySelector('#performance-modal');
const performanceOk = document.querySelector('#performance-ok');

performanceModal.classList.remove('is-hidden');

performanceOk.addEventListener('click', () => {
  performanceModal.classList.add('is-hidden');
});

// const cube = new Cube100(cubePieces, cubeGroup, size);
// console.log('cubePieces', cubePieces);
// console.log('cubeGroup', cubeGroup);

// scene.add(cubeGroup);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setClearColor(0x000000, 0);
scene.background = null;

console.log(
  renderer.getContext().getContextAttributes().alpha,
  renderer.getClearAlpha(),
  scene.background
);
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// const cubeContainer = document.querySelector('#cube-container');

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
// scene.background = new THREE.Color(0x444444);
scene.background = null;
// ------------------------End Light-----------------------

// ====================
// CAMERA
// ====================
const saveBtn = document.querySelector('#save-btn');
const loadBtn = document.querySelector('#load-btn');
const settingBtn = document.querySelector('#settings-btn');
const settingCloseBtn = document.querySelector('.settings-close');

const settingsBackdropEl = document.querySelector('.settings-backdrop');
const settingsCancelBtn = document.querySelector('.cancel-button');
const settingsApplyBtn = document.querySelector('.apply-button');
const cubeSizeInput = document.querySelector('#cube-size');
const renderModeSelect = document.querySelector('#render-mode');

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

const solveUpCross = document.querySelector('#solve-first-cross');
const solveUpCorners = document.querySelector('#solve-first-corners');
const solveMiddleLayer = document.querySelector('#solve-middle');
const solveLastCollectCross = document.querySelector('#solve-third-cross-1');
const solveLastCollectCorners = document.querySelector(
  '#solve-third-corners-1'
);
const solveLastSolveCorners = document.querySelector('#solve-third-corners-2');
const solveLastSolveCross = document.querySelector('#solve-third-cross-2');

const headerEl = document.querySelector('.header');
const solveListFirstEl = document.querySelector('.solve-list-first');
const solveListLastEl = document.querySelector('.solve-list-last');
const cubeControlsEl = document.querySelector('.cube-controls');
const speedMenuEl = document.querySelector('#speedMenu');

const pauseButton = document.querySelector('#pauseButton');

const soundMenuEl = document.querySelector('#soundMenu');
const soundButton = document.querySelector('#soundButton');
soundButton.textContent = '♫';
// soundButton.classList.remove('off');
soundButton.classList.add('off');

let animationMode = false;
let speedMenuTimer = null;

// const chopin = new Audio('./public/shopen-nocturnes-op.-9.mp3');
// chopin.loop = true;
// -------------------------Reset-------------------------------------
resetBtn.addEventListener('click', () => resetCube());

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// camera.position.set(size, size, size);

// const cameraDistance = size * (390 / cubeContainer.clientWidth);
// const cameraDistance = size * Math.max(1, 390 / cubeContainer.clientWidth);
// camera.position.set(cameraDistance, cameraDistance, cameraDistance);
// camera.lookAt(0, 0, 0);

function resetCube() {
  currentSolve = undefined;
  const savedSoundEnabled = cube.soundEnabled;
  scene.remove(cubeGroup);

  cubeGroup.clear();
  cubeState = new CubeState(size);

  // if (renderMode === 'bulged' || renderMode === 'spherical') {
  //   const cameraDistance = size * 1.8;

  //   camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  // } else {
  updateCamera();
  // const cameraDistance = size * Math.max(1, 390 / cubeContainer.clientWidth);
  // camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  // }
  camera.lookAt(0, 0, 0);
  scrambleBtn.disabled = false;
  // const savedSoundEnabled = cube.soundEnabled;
  // cube.updateResetButtons();
  initRender();
  cube.soundEnabled = savedSoundEnabled;

  cube.tracks.forEach(track => {
    track.muted = !cube.soundEnabled;
  });

  // cube.soundEnabled = savedSoundEnabled;
  cube.updateResetButtons();
  console.log(
    'Reset-sol12',
    cube.solLastCross1,
    solveLastCollectCorners.disabled
  );
}
//  ----------------------------------------------------------------
solveBtn.disabled = true;
scrambleBtn.disabled = false;

solveFisrtSide.disabled = true;
solveSecondSide.disabled = true;
solveThirdSide.disabled = true;
solveFourthSide.disabled = true;
solveFifthSixSide.disabled = true;
solveEdges1.disabled = true;
solveEdges2.disabled = true;

solveUpCross.disabled = true;
solveUpCorners.disabled = true;
solveMiddleLayer.disabled = true;
solveLastCollectCross.disabled = true;
solveLastCollectCorners.disabled = true;
solveLastSolveCorners.disabled = true;
solveLastSolveCross.disabled = true;

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
  // console.log(
  //   renderer.getContext().getContextAttributes().alpha,
  //   renderer.getClearAlpha(),
  //   scene.background
  // );
}

animate();

// =========================Settings===========================
// function updateCamera() {
//   camera.position.set(size, size, size);
//   camera.lookAt(0, 0, 0);
// }
settingBtn.addEventListener('click', () => {
  settingsBackdropEl.classList.add('is-open');
  console.log('OPEN Settings');
});

settingCloseBtn.addEventListener('click', () => {
  settingsBackdropEl.classList.remove('is-open');
});

settingsCancelBtn.addEventListener('click', () => {
  settingsBackdropEl.classList.remove('is-open');
});

settingsApplyBtn.addEventListener('click', () => {
  const newSize = Number(cubeSizeInput.value);
  if (
    cubeSizeInput.value.trim() === '' ||
    !Number.isInteger(newSize) ||
    newSize < 2 ||
    newSize > 100
  ) {
    cubeSizeInput.value = size;
    return;
  }
  // if (newSize > 100) {
  //   cubeSizeInput.value = size;
  //   return;
  // }
  renderMode = renderModeSelect.value;
  const backgroundMode = document.querySelector('#background-mode').value;
  setBackground(backgroundMode);
  size = newSize;

  settingsBackdropEl.classList.remove('is-open');

  resetCube();
});

cubeSizeInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    settingsApplyBtn.click();
  }
});
// =============================Scramble========================
scrambleBtn.addEventListener('click', () => {
  startAnimationMode();
  // const savedSoundEnabled = cube.soundEnabled;
  console.log('Before_Reset', cube.soundEnabled);
  resetCube();
  // cube.soundEnabled = savedSoundEnabled;

  console.log('After_reset', cube.soundEnabled);
  cube.scramble();
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }

  // cube.soundEnabled = savedSoundEnabled;
  console.log('After_scramble', cube.soundEnabled);
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
  solveListLastEl.classList.add('is-hidden');
  cubeControlsEl.classList.add('is-hidden');

  // showSpeedMenu();
}

soundButton.addEventListener('click', () => {
  cube.soundEnabled = !cube.soundEnabled;

  // soundButton.textContent = '♫';
  soundButton.classList.toggle('off', !cube.soundEnabled);
  // soundButton.textContent = cube.soundEnabled ? '🔊' : '🔇';

  cube.tracks.forEach(track => {
    track.muted = !cube.soundEnabled;
  });

  if (
    (cube.soundEnabled && cube.isMoving) ||
    (cube.soundEnabled && cube.isSolving)
  ) {
    cube.tracks[cube.currentTrack].play();
  }
});

function showSpeedMenu() {
  if (!animationMode) return;
  speedMenuEl.classList.add('visible');
  soundMenuEl.classList.add('visible');
  // console.log(
  //   'SHOW:',
  //   speedMenuEl.className,
  //   speedMenuEl.getBoundingClientRect()
  // );
  clearTimeout(speedMenuTimer);
  speedMenuTimer = setTimeout(() => {
    // console.log('HIDE SPEED MENU BY TIMER');
    speedMenuEl.classList.remove('visible');
    soundMenuEl.classList.remove('visible');
  }, 4000);
}

window.addEventListener('pointerdown', () => {
  if (!animationMode) return;
  showSpeedMenu();
});

window.addEventListener('mousemove', () => {
  // console.log('MOUSE MOVE', animationMode);
  if (!animationMode) return;
  showSpeedMenu();
});

const setViewportHeight = () => {
  document.documentElement.style.setProperty(
    '--viewport-height',
    `${window.visualViewport.height}px`
  );
};

function resetSpeedMenu() {
  speedMenuEl.querySelectorAll('button').forEach(button => {
    button.classList.toggle('active', button.dataset.speed === '1');
  });
  cube.rotationSpeed = 0.1;
}

function stopAnimationMode() {
  resetSpeedMenu();
  animationMode = false;
  clearTimeout(speedMenuTimer);
  speedMenuEl.classList.remove('visible');
  soundMenuEl.classList.remove('visible');
  headerEl.classList.remove('is-hidden');
  solveListFirstEl.classList.remove('is-hidden');
  solveListLastEl.classList.remove('is-hidden');
  cubeControlsEl.classList.remove('is-hidden');
}

speedMenuEl.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;

  speedMenuEl.querySelectorAll('button').forEach(btn => {
    btn.classList.toggle('active', btn === button);
  });

  const speed = button.dataset.speed;
  if (speed === 'end') {
    console.log('currentSolve', currentSolve);
    console.log(cube.finalStates[currentSolve]);
    if (currentSolve !== undefined) {
      const stateIndex =
        cube.size === 2 && currentSolve === 13 ? 12 : currentSolve;

      cubeState = cube.finalStates[stateIndex];
    } else {
      cubeState = cube.finalScrambleState;
    }
    // if (currentSolve !== undefined) {
    //   cubeState = cube.finalStates[currentSolve];
    // } else {
    //   cubeState = cube.finalScrambleState;
    // }

    cube.isMoving = false;
    // cubeState = cube.finalState;
    cube.tracks.forEach(track => {
      track.pause();
      track.currentTime = 0;
    });
    scene.remove(cubeGroup);
    cubeGroup.clear();

    const savedFinalStates = cube.finalStates;
    const savedSolutions = cube.solutions;
    const savedSoundEnabled = cube.soundEnabled;
    initRender();

    cube.finalStates = savedFinalStates;
    cube.solutions = savedSolutions;
    cube.soundEnabled = savedSoundEnabled;
    cube.tracks.forEach(track => {
      track.muted = !cube.soundEnabled;
    });

    soundButton.classList.toggle('off', !cube.soundEnabled);
    stopAnimationMode();
    cube.updateResetButtons();
    return;
  }
  // cube.isPaused = false;
  cube.rotationSpeed = 0.1 * Number(speed);
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

    solutions: cube.solutions,
    finalStates: cube.finalStates,
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
  cube.solutions = data.solutions || [];
  cube.finalStates = (data.finalStates || []).map(state =>
    restoreCubeState(state)
  );

  camera.position.set(size, size, size);

  cube.updateResetButtons();
}

function restoreCubeState(data) {
  const state = new CubeState(data.size);
  state.U = data.U;
  state.D = data.D;
  state.F = data.F;
  state.B = data.B;
  state.L = data.L;
  state.R = data.R;
  return state;
}

loadBtn.addEventListener('click', loadCubeState);

// function saveCubeState() {
//   console.log('MainClickSavecubeState.U', cubeState.U);
//   const state = {
//     size: cubeState.size,
//     U: cubeState.U,
//     D: cubeState.D,
//     F: cubeState.F,
//     B: cubeState.B,
//     L: cubeState.L,
//     R: cubeState.R,
//   };
//   localStorage.setItem('cubeState', JSON.stringify(state));
//   console.log('Состояние кубика сохранено');
// }

// saveBtn.addEventListener('click', saveCubeState);

// function loadCubeState() {
//   const saved = localStorage.getItem('cubeState');

//   if (!saved) {
//     console.log('Сохранённого состояния нет');
//     return;
//   }

//   const data = JSON.parse(saved);
//   size = data.size;
//   cubeState = new CubeState(size);
//   cubeState.U = data.U;
//   cubeState.D = data.D;
//   cubeState.F = data.F;
//   cubeState.B = data.B;
//   cubeState.L = data.L;
//   cubeState.R = data.R;

//   console.log('Состояние загружено');
//   console.log(data);
//   scene.remove(cubeGroup);
//   cubeGroup.clear();

//   scrambleBtn.disabled = false;
//   initRender();

//   camera.position.set(size, size, size);
//   cube.updateResetButtons();
// }

// loadBtn.addEventListener('click', loadCubeState);

// ------------------------simply algoritms--------------------------
let currentSolve;
solveFisrtSide.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 0;
  startAnimationMode();
  await cube.onSolve1thSide();
});

solveSecondSide.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 1;
  startAnimationMode();
  await cube.onSolve2thSide(startAnimationMode);
});

solveThirdSide.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 2;
  startAnimationMode();
  await cube.onSolve3thSide(startAnimationMode);
});

solveFourthSide.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 3;
  startAnimationMode();
  await cube.onSolve4thSide(startAnimationMode);
});

solveFifthSixSide.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 4;
  startAnimationMode();
  await cube.onSolve5thSide(startAnimationMode);
});

solveEdges1.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 5;
  startAnimationMode();
  await cube.onSolve6thEdges(startAnimationMode);
});

solveEdges2.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 6;
  startAnimationMode();
  await cube.onSolve7thEdges(startAnimationMode);
});

solveUpCross.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 7;
  startAnimationMode();
  await cube.onSolve8thCrossSol(startAnimationMode);
});

solveUpCorners.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 8;
  startAnimationMode();
  await cube.onSolve9thCornersSol(startAnimationMode);
});

solveMiddleLayer.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 9;
  startAnimationMode();
  await cube.onSolve10thMiddleSol(startAnimationMode);
});

solveLastCollectCross.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 10;
  startAnimationMode();
  await cube.onSolve11thCrossSol(startAnimationMode);
});

solveLastCollectCorners.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 11;
  startAnimationMode();
  await cube.onSolve12thCornersSol(startAnimationMode);
});

solveLastSolveCorners.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 12;
  startAnimationMode();
  await cube.onSolve13thCornersSol(startAnimationMode);
});

solveLastSolveCross.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }
  currentSolve = 13;
  startAnimationMode();
  await cube.onSolve14thCrossSol(startAnimationMode);
});

solveBtn.addEventListener('click', async () => {
  if (cube.soundEnabled) {
    cube.currentTrack = Math.floor(Math.random() * cube.tracks.length);
    cube.tracks[cube.currentTrack].currentTime = 0;
    cube.tracks[cube.currentTrack].play();
  }

  currentSolve = 13;
  startAnimationMode();
  await cube.onSolve14thCrossSol(startAnimationMode);
  stopAnimationMode();
});
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
// cube.U(); // [[size]]
// cube.R(); // [[size]]
// cube.R(5); // [[5]]
// cube.U('5'); // [[5]]
// cube.R('5'); // [[5]]
// cube.R('5'); // [[5]]
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
