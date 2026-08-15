import * as THREE from 'three';
import { Cubie } from './js/Cubie';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {
  pointsCD_RF,
  pointsCD_RB,
  pointsCD_RU,
  pointsCD_RD,
  pointsCornersAB_RU,
  pointsCornersAB_RD,
  pointsCornersCD_RU,
  pointsCornersCD_RD,
} from './js/right.js';

import {
  pointsCD_UB,
  pointsCornersAB_UB,
  pointsCornersCD_UB,
  pointsCD_UF,
  pointsCornersAB_UF,
  pointsCornersCD_UF,
  pointsCD_UR,
  pointsCD_UL,
} from './js/up.js';

import {
  pointsCD_FU,
  pointsCornersAB_FU,
  pointsCornersCD_FU,
  pointsCD_FD,
  pointsCornersAB_FD,
  pointsCornersCD_FD,
  pointsCD_FR,
  pointsCD_FL,
} from './js/front.js';

import {
  pointsCD_LU,
  pointsCornersAB_LU,
  pointsCornersCD_LU,
  pointsCD_LD,
  pointsCornersAB_LD,
  pointsCornersCD_LD,
  pointsCD_LF,
  pointsCD_LB,
} from './js/left.js';

import {
  pointsCD_DF,
  pointsCornersAB_DF,
  pointsCornersCD_DF,
  pointsCD_DB,
  pointsCornersAB_DB,
  pointsCornersCD_DB,
  pointsCD_DR,
  pointsCD_DL,
} from './js/down.js';

import {
  pointsCD_BD,
  pointsCornersAB_BD,
  pointsCornersCD_BD,
  pointsCD_BU,
  pointsCornersAB_BU,
  pointsCornersCD_BU,
  pointsCD_BR,
  pointsCD_BL,
} from './js/back.js';

import { getArcPointForX, getArcPointsX } from './js/planeYZ.js';
import { getArcPointForY, getArcPointsY } from './js/planeXZ.js';
import { getArcPointForZ, getArcPointsZ } from './js/planeXY.js';
import {
  size,
  cubeSize,
  gap,
  cellSize,
  cornerSize,
  halfSize,
  cornerExpand,
  sphereOffset,
  fullsize,
  bulgeRadius,
  CORNER,
  faceOffsetFactor,
  sphereOffsetEdges,
  halfCenters,
  cd,
  diagonal,
} from './js/constants';

const scene = new THREE.Scene();

console.log('bulgeRadius', bulgeRadius);

// ====================
// GEOMETRY
// ====================

const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cornerGeometry = new THREE.BoxGeometry(
  cornerSize,
  cornerSize,
  cornerSize
);

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111,
});

const cornerMesh = new THREE.InstancedMesh(cornerGeometry, bodyMaterial, 8);

const dummy = new THREE.Object3D();
const cubies = [];

const rightGeometry = geometry.clone();
const frontGeometry = geometry.clone();
const upGeometry = geometry.clone();
const leftGeometry = geometry.clone();
const backGeometry = geometry.clone();
const downGeometry = geometry.clone();

const cornerX = halfSize + cornerExpand;
const cornerY = halfSize + cornerExpand;
const cornerZ = halfSize + cornerExpand;

const sphereCenterX = -sphereOffset;
const sphereCenterY = -sphereOffset;
const sphereCenterZ = -sphereOffset;
const sphereCenterXLeft = sphereOffset;
const sphereCenterYBottom = sphereOffset;
const sphereCenterZBack = sphereOffset;

const cornerSphereX =
  sphereCenterX + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
const cornerSphereY =
  sphereCenterY + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
const cornerSphereZ =
  sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
const cornerSphereXLeft =
  sphereCenterXLeft -
  Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
const cornerSphereYBottom =
  sphereCenterYBottom -
  Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
const cornerSphereZBack =
  sphereCenterZBack -
  Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);

// const diagonal = sphereOffsetEdges / Math.sqrt(2);

const sphereCenterLU = new THREE.Vector3(diagonal, -diagonal, 0);
const sphereCenterUR = new THREE.Vector3(-diagonal, -diagonal, 0);
const sphereCenterRD = new THREE.Vector3(-diagonal, diagonal, 0);
const sphereCenterDL = new THREE.Vector3(diagonal, diagonal, 0);

const sphereCenterBR = new THREE.Vector3(-diagonal, 0, diagonal);
const sphereCenterRF = new THREE.Vector3(-diagonal, 0, -diagonal);
const sphereCenterFL = new THREE.Vector3(diagonal, 0, -diagonal);
const sphereCenterLB = new THREE.Vector3(diagonal, 0, diagonal);

const sphereCenterDF = new THREE.Vector3(0, diagonal, -diagonal);
const sphereCenterFU = new THREE.Vector3(0, -diagonal, -diagonal);
const sphereCenterUB = new THREE.Vector3(0, -diagonal, diagonal);
const sphereCenterBD = new THREE.Vector3(0, diagonal, diagonal);

// --------------------------XY------------

const fur = new THREE.Vector3(cornerX, cornerY, cornerZ);
const ubr = new THREE.Vector3(cornerX, cornerY, -cornerZ);
const frd = new THREE.Vector3(cornerX, -cornerY, cornerZ);
const rbd = new THREE.Vector3(cornerX, -cornerY, -cornerZ);
const fdl = new THREE.Vector3(-cornerX, -cornerY, cornerZ);
const dbl = new THREE.Vector3(-cornerX, -cornerY, -cornerZ);
const flu = new THREE.Vector3(-cornerX, cornerY, cornerZ);
const lbu = new THREE.Vector3(-cornerX, cornerY, -cornerZ);

drawArc(sphereCenterUR, fur, ubr, 0xff0000);
drawArc(sphereCenterRD, frd, rbd, 0xff0000);
drawArc(sphereCenterDL, fdl, dbl, 0xff0000);
drawArc(sphereCenterLU, flu, lbu, 0xff0000);

const A = getArcPointForZ(frd.z, sphereCenterRD, frd);
const B = getArcPointForZ(rbd.z, sphereCenterRD, frd);

drawLine(A, B);

// (z, sphereCenter, startP, endP);
// console.log('A:', A);
// console.log('frd:', frd.clone());

// console.log('B:', B);
// console.log('rbd:', rbd.clone());

const pointsAB_UR = getArcPointsZ(fur, (size - 1) * 2 - 2, sphereCenterUR);
const pointsAB_RD = getArcPointsZ(frd, (size - 1) * 2 - 2, sphereCenterRD);
const pointsAB_DL = getArcPointsZ(fdl, (size - 1) * 2 - 2, sphereCenterDL);
const pointsAB_LU = getArcPointsZ(flu, (size - 1) * 2 - 2, sphereCenterLU);

// console.log('pointsAB_UR', pointsAB_UR);
// console.log('pointsAB_RD', pointsAB_RD);
// console.log('pointsAB_DL', pointsAB_DL);
// console.log('pointsAB_LU', pointsAB_LU);
// --------------------------XZ------------

drawArc(sphereCenterBR, ubr, rbd, 0xff0000);
drawArc(sphereCenterRF, fur, frd, 0xff0000);
drawArc(sphereCenterFL, flu, fdl, 0xff0000);
drawArc(sphereCenterLB, lbu, dbl, 0xff0000);

const pointsAB_BR = getArcPointsY(ubr, (size - 1) * 2 - 2, sphereCenterBR, -1);
const pointsAB_RF = getArcPointsY(fur, (size - 1) * 2 - 2, sphereCenterRF, -1);
const pointsAB_FL = getArcPointsY(flu, (size - 1) * 2 - 2, sphereCenterFL, -1);
const pointsAB_LB = getArcPointsY(lbu, (size - 1) * 2 - 2, sphereCenterLB, -1);

// console.log('pointsAB_BR', pointsAB_BR);
// console.log('pointsAB_RF', pointsAB_RF);
// console.log('pointsAB_FL', pointsAB_FL);
// console.log('pointsAB_LB', pointsAB_LB);
// ============================YZ==============
drawArc(sphereCenterDF, fdl, frd, 0xff0000); // нормально
drawArc(sphereCenterFU, fur, flu, 0xff0000); // поменяли
drawArc(sphereCenterUB, lbu, ubr, 0xff0000); // нормально
drawArc(sphereCenterBD, rbd, dbl, 0xff0000); // поменяли

const pointsAB_DF = getArcPointsX(frd, (size - 1) * 2 - 2, sphereCenterDF, -1);
const pointsAB_FU = getArcPointsX(fur, (size - 1) * 2 - 2, sphereCenterFU, -1);
const pointsAB_UB = getArcPointsX(ubr, (size - 1) * 2 - 2, sphereCenterUB, -1);
const pointsAB_BD = getArcPointsX(rbd, (size - 1) * 2 - 2, sphereCenterBD, -1);

// console.log('pointsAB_UB', pointsAB_UB);
// console.log('pointsAB_DF', pointsAB_DF);
// console.log('pointsAB_FU', pointsAB_FU);
// console.log('pointsAB_BD', pointsAB_BD);

// ==========================Surface RIGHT=============================
createSurface(pointsAB_RF, pointsCD_RF);
createSurface(pointsAB_BR, pointsCD_RB);
createSurface(pointsAB_UR, pointsCD_RU);
createSurface(pointsAB_RD, pointsCD_RD);
createSurface(pointsCornersAB_RU, pointsCornersCD_RU);
createSurface(pointsCornersAB_RD, pointsCornersCD_RD);
// ==========================Surface UP=============================

createSurface(pointsAB_UB, pointsCD_UB);
createSurface(pointsAB_FU, pointsCD_UF);
createSurface(pointsAB_UR, pointsCD_UR);
createSurface(pointsAB_LU, pointsCD_UL);
createSurface(pointsCornersAB_UB, pointsCornersCD_UB);
createSurface(pointsCornersAB_UF, pointsCornersCD_UF);
// ==========================Surface FRONT=============================
createSurface(pointsAB_FU, pointsCD_FU);
createSurface(pointsAB_DF, pointsCD_FD);
createSurface(pointsAB_RF, pointsCD_FR);
createSurface(pointsAB_FL, pointsCD_FL);
createSurface(pointsCornersAB_FU, pointsCornersCD_FU);
createSurface(pointsCornersAB_FD, pointsCornersCD_FD);
// ==========================Surface Left=============================
createSurface(pointsAB_LU, pointsCD_LU);
createSurface(pointsAB_DL, pointsCD_LD);
createSurface(pointsAB_FL, pointsCD_LF);
createSurface(pointsAB_LB, pointsCD_LB);
createSurface(pointsCornersAB_LU, pointsCornersCD_LU);
createSurface(pointsCornersAB_LD, pointsCornersCD_LD);
// ==========================Surface Down=============================
createSurface(pointsAB_DF, pointsCD_DF);
createSurface(pointsAB_BD, pointsCD_DB);
createSurface(pointsAB_RD, pointsCD_DR);
createSurface(pointsAB_DL, pointsCD_DL);
createSurface(pointsCornersAB_DF, pointsCornersCD_DF);
createSurface(pointsCornersAB_DB, pointsCornersCD_DB);
// ==========================Surface Back=============================
createSurface(pointsAB_BD, pointsCD_BD);
createSurface(pointsAB_UB, pointsCD_BU);
createSurface(pointsAB_BR, pointsCD_BR);
createSurface(pointsAB_LB, pointsCD_BL);
createSurface(pointsCornersAB_BD, pointsCornersCD_BD);
createSurface(pointsCornersAB_BU, pointsCornersCD_BU);
// ==========================Surface =============================

// createSurface(pointsAB_RF, CDtoL);

// ===========================================================
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// ==================================================================

// const curve = new THREE.LineCurve3(A, B);
// const points = curve.getPoints(32);

// const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
// const curveMaterial = new THREE.LineBasicMaterial({
//   color: 0xff0000,
//   depthTest: false,
// });

cornerMesh.getMatrixAt(CORNER.FUR, dummy.matrix);
dummy.matrix.decompose(fur, new THREE.Quaternion(), new THREE.Vector3());

cornerMesh.getMatrixAt(CORNER.ubr, dummy.matrix);
dummy.matrix.decompose(ubr, new THREE.Quaternion(), new THREE.Vector3());

const rightBodyMesh = new THREE.InstancedMesh(
  rightGeometry,
  bodyMaterial,
  size * size
);

const frontBodyMesh = new THREE.InstancedMesh(
  frontGeometry,
  bodyMaterial,
  size * size
);

const upBodyMesh = new THREE.InstancedMesh(
  upGeometry,
  bodyMaterial,
  size * size
);

const bodyMesh = new THREE.InstancedMesh(
  geometry,
  bodyMaterial,
  size * size * 6
);

const leftBodyMesh = new THREE.InstancedMesh(
  leftGeometry,
  bodyMaterial,
  size * size
);

const backBodyMesh = new THREE.InstancedMesh(
  backGeometry,
  bodyMaterial,
  size * size
);

const downBodyMesh = new THREE.InstancedMesh(
  downGeometry,
  bodyMaterial,
  size * size
);

scene.add(leftBodyMesh);
scene.add(backBodyMesh);
scene.add(downBodyMesh);

scene.add(bodyMesh);
scene.add(rightBodyMesh);
scene.add(frontBodyMesh);
scene.add(upBodyMesh);

scene.add(cornerMesh);

// scene.add(curve);
// scene.add(line);
// ====================
// CUBIES
// ====================

for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      const visible =
        x === 0 ||
        x === size - 1 ||
        y === 0 ||
        y === size - 1 ||
        z === 0 ||
        z === size - 1;

      if (!visible) continue;

      cubies.push(new Cubie(x, y, z));
    }
  }
}

const cornerPositions = [
  //          X    Y    Z
  /* FUR */ [1, 1, 1],
  /* UBR */ [1, 1, -1],
  /* LUF */ [-1, 1, 1],
  /* LUB */ [-1, 1, -1],

  /* RDF */ [1, -1, 1],
  /* RDB */ [1, -1, -1],
  /* LDF */ [-1, -1, 1],
  /* LDB */ [-1, -1, -1],
];

const cornerXPos = cornerX - cornerSize / 2;
const cornerYPos = cornerY - cornerSize / 2;
const cornerZPos = cornerZ - cornerSize / 2;

cornerPositions.forEach(([sx, sy, sz], index) => {
  dummy.position.set(
    sx > 0 ? cornerXPos : -cornerXPos,
    sy > 0 ? cornerYPos : -cornerYPos,
    sz > 0 ? cornerZPos : -cornerZPos
  );

  dummy.updateMatrix();

  cornerMesh.setMatrixAt(index, dummy.matrix);
});

cornerMesh.instanceMatrix.needsUpdate = true;
// dummy.position.set(
//   cornerX - cornerSize / 2,
//   cornerY - cornerSize / 2,
//   cornerZ - cornerSize / 2
// );

// dummy.updateMatrix();

// cornerMesh.setMatrixAt(0, dummy.matrix);
// cornerMesh.instanceMatrix.needsUpdate = true;

// ====================
// LAYERS
// ====================

const layers = {
  x: Array.from({ length: size }, () => []),
  y: Array.from({ length: size }, () => []),
  z: Array.from({ length: size }, () => []),
};

// ====================
// INDICES
// ====================

let bodyIndex = 0;
let rightIndex = 0;
let frontIndex = 0;
let upIndex = 0;
let leftIndex = 0;
let backIndex = 0;
let downIndex = 0;

let rightTopIndex = 0;
let rightBottomIndex = 0;
let rightFrontIndex = 0;
let rightBackIndex = 0;

// ====================
// PLACE CUBIES
// ====================
let edgesAndCornersCubies = [];

cubies.forEach(cubie => {
  const px = (cubie.x - (size - 1) / 2) * cellSize;
  const py = (cubie.y - (size - 1) / 2) * cellSize;
  const pz = (cubie.z - (size - 1) / 2) * cellSize;

  // Исходная позиция
  // Исходная позиция
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  // const normalMatrix = dummy.matrix.clone();

  // ====================
  // RIGHT
  // ====================

  if (cubie.x === size - 1) {
    const sphereX =
      sphereCenterX + Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);
    const bulgeOffset = sphereX - cornerSphereX;
    dummy.position.x = px + cornerExpand * faceOffsetFactor + bulgeOffset;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);
    const isEdgeOrCorner =
      (cubie.y === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.y === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.z === 0 && cubie.y > 0 && cubie.y < size - 1) ||
      (cubie.z === size - 1 && cubie.y > 0 && cubie.y < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const rightMatrix = dummy.matrix.clone();
  if (cubie.x === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
    rightBodyMesh.setMatrixAt(rightIndex++, rightMatrix);
  }
  edgesAndCornersCubies = [];
  // ====================
  // UP
  // ====================
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  if (cubie.y === size - 1) {
    const sphereY =
      sphereCenterY + Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
    const bulgeOffsetY = sphereY - cornerSphereY;
    dummy.position.y = py + cornerExpand * faceOffsetFactor + bulgeOffsetY;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);
    const isEdgeOrCorner =
      (cubie.x === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.x === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.z === 0 && cubie.x > 0 && cubie.x < size - 1) ||
      (cubie.z === size - 1 && cubie.x > 0 && cubie.x < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const upMatrix = dummy.matrix.clone();
  if (cubie.y === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
    upBodyMesh.setMatrixAt(upIndex++, upMatrix);
  }
  edgesAndCornersCubies = [];
  // ====================
  // FRONT
  // ====================
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  if (cubie.z === size - 1) {
    const sphereZ =
      sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);
    const bulgeOffset = sphereZ - cornerSphereZ;
    dummy.position.z = pz + cornerExpand * faceOffsetFactor + bulgeOffset;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);
    const isEdgeOrCorner =
      (cubie.x === size - 1 && cubie.y >= 0 && cubie.y <= size - 1) ||
      (cubie.x === 0 && cubie.y >= 0 && cubie.y <= size - 1) ||
      (cubie.y === 0 && cubie.x > 0 && cubie.x < size - 1) ||
      (cubie.y === size - 1 && cubie.x > 0 && cubie.x < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const frontMatrix = dummy.matrix.clone();
  if (cubie.z === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
    frontBodyMesh.setMatrixAt(frontIndex++, frontMatrix);
  }
  edgesAndCornersCubies = [];
  // ====================
  // LEFT
  // ====================
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  if (cubie.x === 0) {
    const sphereX =
      sphereCenterXLeft - Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);
    const bulgeOffsetX = sphereX - cornerSphereXLeft;
    dummy.position.x = px - cornerExpand * faceOffsetFactor + bulgeOffsetX;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);
    const isEdgeOrCorner =
      (cubie.y === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.y === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.z === 0 && cubie.y > 0 && cubie.y < size - 1) ||
      (cubie.z === size - 1 && cubie.y > 0 && cubie.y < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const leftMatrix = dummy.matrix.clone();
  if (cubie.x === 0 && !edgesAndCornersCubies.includes(cubie)) {
    leftBodyMesh.setMatrixAt(leftIndex++, leftMatrix);
  }
  edgesAndCornersCubies = [];
  // ====================
  // DOWN
  // ====================
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  if (cubie.y === 0) {
    const sphereY =
      sphereCenterYBottom - Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
    const bulgeOffsetY = sphereY - cornerSphereYBottom;
    dummy.position.y = py - cornerExpand * faceOffsetFactor + bulgeOffsetY;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);
    const isEdgeOrCorner =
      (cubie.x === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.x === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
      (cubie.z === 0 && cubie.x > 0 && cubie.x < size - 1) ||
      (cubie.z === size - 1 && cubie.x > 0 && cubie.x < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const downMatrix = dummy.matrix.clone();
  if (cubie.y === 0 && !edgesAndCornersCubies.includes(cubie)) {
    downBodyMesh.setMatrixAt(downIndex++, downMatrix);
  }
  edgesAndCornersCubies = [];
  // ====================
  // BACK
  // ====================
  dummy.position.set(px, py, pz);
  dummy.updateMatrix();
  if (cubie.z === 0) {
    const sphereZ =
      sphereCenterZBack - Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);
    const bulgeOffsetZ = sphereZ - cornerSphereZBack;
    dummy.position.z = pz - cornerExpand * faceOffsetFactor + bulgeOffsetZ;
    dummy.updateMatrix();
    const actualPosition = new THREE.Vector3();
    actualPosition.setFromMatrixPosition(dummy.matrix);

    const isEdgeOrCorner =
      (cubie.x === size - 1 && cubie.y >= 0 && cubie.y <= size - 1) ||
      (cubie.x === 0 && cubie.y >= 0 && cubie.y <= size - 1) ||
      (cubie.y === 0 && cubie.x > 0 && cubie.x < size - 1) ||
      (cubie.y === size - 1 && cubie.x > 0 && cubie.x < size - 1);
    if (isEdgeOrCorner) {
      edgesAndCornersCubies.push(cubie);
    }
  }
  const backMatrix = dummy.matrix.clone();
  if (cubie.z === 0 && !edgesAndCornersCubies.includes(cubie)) {
    backBodyMesh.setMatrixAt(backIndex++, backMatrix);
  }
  edgesAndCornersCubies = [];

  layers.x[cubie.x].push(cubie);
  layers.y[cubie.y].push(cubie);
  layers.z[cubie.z].push(cubie);
});

// ====================
// UPDATE
// ====================

bodyMesh.instanceMatrix.needsUpdate = true;
rightBodyMesh.instanceMatrix.needsUpdate = true;
frontBodyMesh.instanceMatrix.needsUpdate = true;
upBodyMesh.instanceMatrix.needsUpdate = true;
leftBodyMesh.instanceMatrix.needsUpdate = true;
backBodyMesh.instanceMatrix.needsUpdate = true;
downBodyMesh.instanceMatrix.needsUpdate = true;

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
controls.minDistance = 40;
controls.maxDistance = 600;

// ====================
// ANIMATION
// ====================

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// ====================
// FUNCTIONS
// ====================

// ===============DRAW=============================

function drawLine(start, end, color = 0xff0000) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const material = new THREE.LineBasicMaterial({
    color,
  });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  return line;
}

function createSurface(pointsAB, pointsCD) {
  const vertices = [];
  for (let i = 0; i < pointsAB.length - 1; i += 2) {
    const A = pointsAB[i];
    const A2 = pointsAB[i + 1];
    const C = pointsCD[i];
    const C2 = pointsCD[i + 1];
    // Первый треугольник
    vertices.push(A.x, A.y, A.z, A2.x, A2.y, A2.z, C.x, C.y, C.z);
    // Второй треугольник
    vertices.push(A2.x, A2.y, A2.z, C2.x, C2.y, C2.z, C.x, C.y, C.z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}

function drawArc(center, pointA, pointB, color = 0x00ff00) {
  const start = pointA.clone().sub(center);
  const end = pointB.clone().sub(center);
  const axis = new THREE.Vector3().crossVectors(start, end).normalize();
  const angle = start.angleTo(end);
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = start.clone();
    point.applyAxisAngle(axis, angle * t);
    point.add(center);
    points.push(point);
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    depthTest: false,
  });
  const line = new THREE.Line(geometry, material);
  line.renderOrder = 1001;
  scene.add(line);
  return line;
}

// for (let i = 0; i < pointsAB_UR.length; i++) {
//   drawLine(pointsAB_UR[i], pointsCD_RU[i], 0xff0000);
// }

// function createSticker(group, position, normal, color) {
//   const geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
//   const material = new THREE.MeshBasicMaterial({
//     color,
//     side: THREE.FrontSide,
//   });

//   const sticker = new THREE.Mesh(geometry, material);

//   sticker.position.copy(position);
//   sticker.lookAt(position.clone().add(normal));

//   group.add(sticker);

//   return sticker;
// }

// const normals = {
//   right: new THREE.Vector3(1, 0, 0),
//   left: new THREE.Vector3(-1, 0, 0),
//   up: new THREE.Vector3(0, 1, 0),
//   down: new THREE.Vector3(0, -1, 0),
//   front: new THREE.Vector3(0, 0, 1),
//   back: new THREE.Vector3(0, 0, -1),
// };

// createSticker(rightFaceGroup, position, normals.right, 0xff0000);
// createSticker(upFaceGroup, position, normals.up, 0xffffff);

// const rightFaceGroup = new THREE.Group();
// const upFaceGroup = new THREE.Group();

// scene.add(rightFaceGroup);
// scene.add(upFaceGroup);

// rightFaceGroup.add(rightSurface);
// upFaceGroup.add(upSurface);

// createSticker(rightFaceGroup, position, normals.right, 0xff0000);

// createSticker(upFaceGroup, position, normals.up, 0xffffff);
