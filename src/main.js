import * as THREE from 'three';
// import { Cubie } from './js/Cubie';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { cubeGroup, cubePieces } from './js/cubeRenderer.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const scene = new THREE.Scene();
scene.add(cubeGroup);

// import {
//   pointsCD_RF,
//   pointsCD_RB,
//   pointsCD_RU,
//   pointsCD_RD,
//   pointsCornersAB_RU,
//   pointsCornersCD_RU,
//   pointsCornersEF_RU,
//   pointsCornersAB_RD,
//   pointsCornersCD_RD,
//   pointsCornersEF_RD,
//   pointsEF_RU,
//   pointsEF_RD,
//   pointsEF_RF,
//   pointsEF_RB,
// } from './js/right.js';

// import {
//   pointsCD_UB,
//   pointsCornersAB_UB,
//   pointsCornersCD_UB,
//   pointsCornersEF_UB,
//   pointsCD_UF,
//   pointsCornersAB_UF,
//   pointsCornersCD_UF,
//   pointsCornersEF_UF,
//   pointsCD_UR,
//   pointsCD_UL,
//   pointsEF_UB,
//   pointsEF_UF,
//   pointsEF_UR,
//   pointsEF_UL,
// } from './js/up.js';

// import {
//   pointsCD_FU,
//   pointsCornersAB_FU,
//   pointsCornersCD_FU,
//   pointsCornersEF_FU,
//   pointsCD_FD,
//   pointsCornersAB_FD,
//   pointsCornersCD_FD,
//   pointsCornersEF_FD,
//   pointsCD_FR,
//   pointsCD_FL,
//   pointsEF_FU,
//   pointsEF_FD,
//   pointsEF_FR,
//   pointsEF_FL,
// } from './js/front.js';

// import {
//   pointsCD_LU,
//   pointsCornersAB_LU,
//   pointsCornersCD_LU,
//   pointsCornersEF_LU,
//   pointsCD_LD,
//   pointsCornersAB_LD,
//   pointsCornersCD_LD,
//   pointsCornersEF_LD,
//   pointsCD_LF,
//   pointsCD_LB,
//   pointsEF_LB,
//   pointsEF_LU,
//   pointsEF_LD,
//   pointsEF_LF,
// } from './js/left.js';

// import {
//   pointsCD_BD,
//   pointsCornersAB_BD,
//   pointsCornersCD_BD,
//   pointsCornersEF_BD,
//   pointsCD_BU,
//   pointsCornersAB_BU,
//   pointsCornersCD_BU,
//   pointsCornersEF_BU,
//   pointsCD_BR,
//   pointsCD_BL,
//   pointsEF_BL,
//   pointsEF_BD,
//   pointsEF_BU,
//   pointsEF_BR,
// } from './js/back.js';

// import {
//   pointsCD_DF,
//   pointsCornersAB_DF,
//   pointsCornersCD_DF,
//   pointsCornersEF_DF,
//   pointsCD_DB,
//   pointsCornersAB_DB,
//   pointsCornersCD_DB,
//   pointsCornersEF_DB,
//   pointsCD_DR,
//   pointsCD_DL,
//   pointsEF_DR,
//   pointsEF_DL,
//   pointsEF_DB,
//   pointsEF_DF,
// } from './js/down.js';

// import { getArcPointForX, getArcPointsX } from './js/planeYZ.js';
// import { getArcPointForY, getArcPointsY } from './js/planeXZ.js';
// import { getArcPointForZ, getArcPointsZ } from './js/planeXY.js';
import {
  size,
  // cubeSize,
  // gap,
  // cellSize,
  // cornerSize,
  // halfSize,
  // cornerExpand,
  // sphereOffset,
  // fullsize,
  // bulgeRadius,
  // CORNER,
  // faceOffsetFactor,
  // sphereOffsetEdges,
  // halfCenters,
  // cd,
  // diagonal,
} from './js/constants';

// const scene = new THREE.Scene();

// console.log('bulgeRadius', bulgeRadius);

// ====================
// GEOMETRY
// ====================

// const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
// const cornerGeometry = new THREE.BoxGeometry(
//   cornerSize,
//   cornerSize,
//   cornerSize
// );

// const bodyMaterial = new THREE.MeshStandardMaterial({
//   color: 0x808080,
// });

// const cornerMesh = new THREE.InstancedMesh(cornerGeometry, bodyMaterial, 8);

// const dummy = new THREE.Object3D();
// const cubies = [];

// const rightGeometry = geometry.clone();
// const frontGeometry = geometry.clone();
// const upGeometry = geometry.clone();
// const leftGeometry = geometry.clone();
// const backGeometry = geometry.clone();
// const downGeometry = geometry.clone();

// const cornerX = halfSize + cornerExpand;
// const cornerY = halfSize + cornerExpand;
// const cornerZ = halfSize + cornerExpand;

// const sphereCenterX = -sphereOffset;
// const sphereCenterY = -sphereOffset;
// const sphereCenterZ = -sphereOffset;
// const sphereCenterXLeft = sphereOffset;
// const sphereCenterYBottom = sphereOffset;
// const sphereCenterZBack = sphereOffset;

// const cornerSphereX =
//   sphereCenterX + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
// const cornerSphereY =
//   sphereCenterY + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
// const cornerSphereZ =
//   sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
// const cornerSphereXLeft =
//   sphereCenterXLeft -
//   Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
// const cornerSphereYBottom =
//   sphereCenterYBottom -
//   Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
// const cornerSphereZBack =
//   sphereCenterZBack -
//   Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);

// // const diagonal = sphereOffsetEdges / Math.sqrt(2);

// const sphereCenterLU = new THREE.Vector3(diagonal, -diagonal, 0);
// const sphereCenterUR = new THREE.Vector3(-diagonal, -diagonal, 0);
// const sphereCenterRD = new THREE.Vector3(-diagonal, diagonal, 0);
// const sphereCenterDL = new THREE.Vector3(diagonal, diagonal, 0);

// const sphereCenterBR = new THREE.Vector3(-diagonal, 0, diagonal);
// const sphereCenterRF = new THREE.Vector3(-diagonal, 0, -diagonal);
// const sphereCenterFL = new THREE.Vector3(diagonal, 0, -diagonal);
// const sphereCenterLB = new THREE.Vector3(diagonal, 0, diagonal);

// const sphereCenterDF = new THREE.Vector3(0, diagonal, -diagonal);
// const sphereCenterFU = new THREE.Vector3(0, -diagonal, -diagonal);
// const sphereCenterUB = new THREE.Vector3(0, -diagonal, diagonal);
// const sphereCenterBD = new THREE.Vector3(0, diagonal, diagonal);

// // --------------------------XY------------

// const fur = new THREE.Vector3(cornerX, cornerY, cornerZ);
// const ubr = new THREE.Vector3(cornerX, cornerY, -cornerZ);
// const frd = new THREE.Vector3(cornerX, -cornerY, cornerZ);
// const rbd = new THREE.Vector3(cornerX, -cornerY, -cornerZ);
// const fdl = new THREE.Vector3(-cornerX, -cornerY, cornerZ);
// const dbl = new THREE.Vector3(-cornerX, -cornerY, -cornerZ);
// const flu = new THREE.Vector3(-cornerX, cornerY, cornerZ);
// const lbu = new THREE.Vector3(-cornerX, cornerY, -cornerZ);

// // drawArc(sphereCenterUR, fur, ubr, 0xff0000);
// // drawArc(sphereCenterRD, frd, rbd, 0xff0000);
// // drawArc(sphereCenterDL, fdl, dbl, 0xff0000);
// // drawArc(sphereCenterLU, flu, lbu, 0xff0000);

// // const A = getArcPointForZ(frd.z, sphereCenterRD, frd);
// // const B = getArcPointForZ(rbd.z, sphereCenterRD, frd);

// // drawLine(A, B);

// // (z, sphereCenter, startP, endP);
// // console.log('A:', A);
// // console.log('frd:', frd.clone());

// // console.log('B:', B);
// // console.log('rbd:', rbd.clone());

// const pointsAB_UR = getArcPointsZ(fur, (size - 1) * 2 - 2, sphereCenterUR);
// const pointsAB_RD = getArcPointsZ(frd, (size - 1) * 2 - 2, sphereCenterRD);
// const pointsAB_DL = getArcPointsZ(fdl, (size - 1) * 2 - 2, sphereCenterDL);
// const pointsAB_LU = getArcPointsZ(flu, (size - 1) * 2 - 2, sphereCenterLU);

// // console.log('pointsAB_UR', pointsAB_UR);
// // console.log('pointsAB_RD', pointsAB_RD);
// // console.log('pointsAB_DL', pointsAB_DL);
// // console.log('pointsAB_LU', pointsAB_LU);
// // --------------------------XZ------------

// // drawArc(sphereCenterBR, ubr, rbd, 0xff0000);
// // drawArc(sphereCenterRF, fur, frd, 0xff0000);
// // drawArc(sphereCenterFL, flu, fdl, 0xff0000);
// // drawArc(sphereCenterLB, lbu, dbl, 0xff0000);

// const pointsAB_BR = getArcPointsY(ubr, (size - 1) * 2 - 2, sphereCenterBR, -1);
// const pointsAB_RF = getArcPointsY(fur, (size - 1) * 2 - 2, sphereCenterRF, -1);
// const pointsAB_FL = getArcPointsY(flu, (size - 1) * 2 - 2, sphereCenterFL, -1);
// const pointsAB_LB = getArcPointsY(lbu, (size - 1) * 2 - 2, sphereCenterLB, -1);

// // console.log('pointsAB_BR', pointsAB_BR);
// // console.log('pointsAB_RF', pointsAB_RF);
// // console.log('pointsAB_FL', pointsAB_FL);
// // console.log('pointsAB_LB', pointsAB_LB);
// // ============================YZ==============
// // drawArc(sphereCenterDF, fdl, frd, 0xff0000); // нормально
// // drawArc(sphereCenterFU, fur, flu, 0xff0000); // поменяли
// // drawArc(sphereCenterUB, lbu, ubr, 0xff0000); // нормально
// // drawArc(sphereCenterBD, rbd, dbl, 0xff0000); // поменяли

// const pointsAB_DF = getArcPointsX(frd, (size - 1) * 2 - 2, sphereCenterDF, -1);
// const pointsAB_FU = getArcPointsX(fur, (size - 1) * 2 - 2, sphereCenterFU, -1);
// const pointsAB_UB = getArcPointsX(ubr, (size - 1) * 2 - 2, sphereCenterUB, -1);
// const pointsAB_BD = getArcPointsX(rbd, (size - 1) * 2 - 2, sphereCenterBD, -1);

// // console.log('pointsAB_UB', pointsAB_UB);
// // console.log('pointsAB_DF', pointsAB_DF);
// // console.log('pointsAB_FU', pointsAB_FU);
// // console.log('pointsAB_BD', pointsAB_BD);
// // RIGHT 🔴 0xff0000
// // LEFT 🟠 0xffa500
// // UP ⚪ 0xffffff
// // DOWN 🟡 0xffff00
// // FRONT 🟢 0x00ff00
// // BACK 🔵 0x0000ff

// // createSurface(pointsAB_RF, CDtoL);

// // ===========================================================
// // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// // ==================================================================

// // const curve = new THREE.LineCurve3(A, B);
// // const points = curve.getPoints(32);

// // const curveGeometry = new THREE.BufferGeometry().setFromPoints(points);
// // const curveMaterial = new THREE.LineBasicMaterial({
// //   color: 0xff0000,
// //   depthTest: false,
// // });

// // cornerMesh.getMatrixAt(CORNER.FUR, dummy.matrix);
// // dummy.matrix.decompose(fur, new THREE.Quaternion(), new THREE.Vector3());

// // cornerMesh.getMatrixAt(CORNER.ubr, dummy.matrix);
// // dummy.matrix.decompose(ubr, new THREE.Quaternion(), new THREE.Vector3());

// // const rightBodyMesh = new THREE.InstancedMesh(
// //   rightGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // const frontBodyMesh = new THREE.InstancedMesh(
// //   frontGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // const upBodyMesh = new THREE.InstancedMesh(
// //   upGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // const bodyMesh = new THREE.InstancedMesh(
// //   geometry,
// //   bodyMaterial,
// //   size * size * 6
// // );

// // const leftBodyMesh = new THREE.InstancedMesh(
// //   leftGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // const backBodyMesh = new THREE.InstancedMesh(
// //   backGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // const downBodyMesh = new THREE.InstancedMesh(
// //   downGeometry,
// //   bodyMaterial,
// //   size * size
// // );

// // scene.add(leftBodyMesh);
// // scene.add(backBodyMesh);
// // scene.add(downBodyMesh);

// // scene.add(bodyMesh);
// // scene.add(rightBodyMesh);
// // scene.add(frontBodyMesh);
// // scene.add(upBodyMesh);

// // scene.add(cornerMesh);

// // scene.add(curve);
// // scene.add(line);
// // ====================
// // CUBIES
// // ====================

// for (let x = 0; x < size; x++) {
//   for (let y = 0; y < size; y++) {
//     for (let z = 0; z < size; z++) {
//       const visible =
//         x === 0 ||
//         x === size - 1 ||
//         y === 0 ||
//         y === size - 1 ||
//         z === 0 ||
//         z === size - 1;

//       if (!visible) continue;

//       cubies.push({
//         x,
//         y,
//         z,
//       });
//     }
//   }
// }

// // const cornerPositions = [
// //   //          X    Y    Z
// //   /* FUR */ [1, 1, 1],
// //   /* UBR */ [1, 1, -1],
// //   /* LUF */ [-1, 1, 1],
// //   /* LUB */ [-1, 1, -1],

// //   /* RDF */ [1, -1, 1],
// //   /* RDB */ [1, -1, -1],
// //   /* LDF */ [-1, -1, 1],
// //   /* LDB */ [-1, -1, -1],
// // ];

// // const cornerXPos = cornerX - cornerSize / 2;
// // const cornerYPos = cornerY - cornerSize / 2;
// // const cornerZPos = cornerZ - cornerSize / 2;

// // cornerPositions.forEach(([sx, sy, sz], index) => {
// //   dummy.position.set(
// //     sx > 0 ? cornerXPos : -cornerXPos,
// //     sy > 0 ? cornerYPos : -cornerYPos,
// //     sz > 0 ? cornerZPos : -cornerZPos
// //   );

// //   dummy.updateMatrix();

// //   cornerMesh.setMatrixAt(index, dummy.matrix);
// // });

// // cornerMesh.instanceMatrix.needsUpdate = true;

// // cornerMesh.visible = false;
// // dummy.position.set(
// //   cornerX - cornerSize / 2,
// //   cornerY - cornerSize / 2,
// //   cornerZ - cornerSize / 2
// // );

// // dummy.updateMatrix();

// // cornerMesh.setMatrixAt(0, dummy.matrix);
// // cornerMesh.instanceMatrix.needsUpdate = true;

// // ====================
// // LAYERS
// // ====================

// // const layers = {
// //   x: Array.from({ length: size }, () => []),
// //   y: Array.from({ length: size }, () => []),
// //   z: Array.from({ length: size }, () => []),
// // };

// // ====================
// // INDICES
// // ====================

// // let bodyIndex = 0;
// // let rightIndex = 0;
// // let frontIndex = 0;
// // let upIndex = 0;
// // let leftIndex = 0;
// // let backIndex = 0;
// // let downIndex = 0;

// // let rightTopIndex = 0;
// // let rightBottomIndex = 0;
// // let rightFrontIndex = 0;
// // let rightBackIndex = 0;

// // ====================
// // PLACE CUBIES
// // ====================
// let edgesAndCornersCubies = [];

// function createEgdes3d(pointsAB, pointsCD, pointsEF, color) {
//   const edgesArray = [];
//   for (let i = 0; i < pointsAB.length - 1; i += 2) {
//     const A = pointsAB[i];
//     const A2 = pointsAB[i + 1];
//     const C = pointsCD[i];
//     const C2 = pointsCD[i + 1];
//     const E = pointsEF[i];
//     const E2 = pointsEF[i + 1];
//     // 1. Левая внутренняя стенка
//     let left = createSurface([A, C], [E, E]);
//     // 2. Правая внутренняя стенка
//     let right = createSurface([A2, C2], [E2, E2]);
//     // 3. Нижняя внутренняя стенка
//     let down = createSurface([C, C2], [E, E2]);
//     // 4. Внешняя стенка
//     let outSurface = createSurface([A, A2], [C, C2], color);
//     const edge3d = { left, right, down, outSurface };
//     edgesArray.push(edge3d);
//   }

//   return edgesArray;
// }

// function createCorners3dBegin(pointsAB, pointsCD, pointsEF, color) {
//   // 1. Левая внутренняя стенка
//   const left = createSurface([pointsEF[0], pointsEF[0]], pointsCD.slice(0, 2));
//   // 2. Правая внутренняя стенка
//   const right = createSurface(
//     [pointsEF[0], pointsEF[0]],
//     [pointsAB[1], pointsCD[1]]
//   );
//   // 3. Внешняя стенка
//   const outSurface = createSurface(
//     pointsAB.slice(0, 2),
//     pointsCD.slice(0, 2),
//     color
//   );
//   return { left, right, outSurface };
// }

// function createCorners3dEnd(pointsAB, pointsCD, pointsEF, color) {
//   // 1. Левая внутренняя стенка
//   const left = createSurface([pointsEF[1], pointsEF[1]], pointsCD.slice(2, 4));
//   // 2. Правая внутренняя стенка
//   const right = createSurface(
//     [pointsEF[1], pointsEF[1]],
//     [pointsAB[2], pointsCD[2]]
//   );
//   // 3. Внешняя стенка
//   const outSurface = createSurface(
//     pointsAB.slice(2, 4),
//     pointsCD.slice(2, 4),
//     color
//   );
//   return { left, right, outSurface };
// }

// // const edgesMove = {
// //   Rw: [],
// //   Uw: [],
// //   Fw: [],
// // };

// function addEdgesToGroup(move, index, group) {
//   edgesMove[move].forEach(edgeArray => {
//     const edge = edgeArray[index];
//     if (!edge) return;
//     group.add(edge.left);
//     group.add(edge.right);
//     group.add(edge.down);
//     group.add(edge.outSurface);
//   });
// }

// // ==========================Surface RIGHT=============================
// const surfaceEdgeRU = createEgdes3d(
//   pointsAB_UR,
//   pointsCD_RU,
//   pointsEF_RU,
//   0xff0000
// );
// // edgesMove.Fw.push(surfaceEdgeRU);

// const surfaceEdgeRF = createEgdes3d(
//   pointsAB_RF,
//   pointsCD_RF,
//   pointsEF_RF,
//   0xff0000
// );
// // edgesMove.Uw.push(surfaceEdgeRF);

// const surfaceEdgeRB = createEgdes3d(
//   pointsAB_BR,
//   pointsCD_RB,
//   pointsEF_RB,
//   0xff0000
// );
// // edgesMove.Uw.push(surfaceEdgeRB);

// const surfaceEdgeRD = createEgdes3d(
//   pointsAB_RD,
//   pointsCD_RD,
//   pointsEF_RD,
//   0xff0000
// );
// // edgesMove.Fw.push(surfaceEdgeRD);

// // console.log('edgesMove', edgesMove);
// const surfaceCornerRFU = createCorners3dBegin(
//   pointsCornersAB_RU,
//   pointsCornersCD_RU,
//   pointsCornersEF_RU,
//   0xff0000
// );

// const surfaceCornerRUB = createCorners3dEnd(
//   pointsCornersAB_RU,
//   pointsCornersCD_RU,
//   pointsCornersEF_RU,
//   0xff0000
// );
// const surfaceCornerRDF = createCorners3dBegin(
//   pointsCornersAB_RD,
//   pointsCornersCD_RD,
//   pointsCornersEF_RD,
//   0xff0000
// );
// const surfaceCornerRBD = createCorners3dEnd(
//   pointsCornersAB_RD,
//   pointsCornersCD_RD,
//   pointsCornersEF_RD,
//   0xff0000
// );

// // ==========================Surface UP=============================
// const surfaceEdgeUB = createEgdes3d(
//   pointsAB_UB,
//   pointsCD_UB,
//   pointsEF_UB,
//   0xffffff
// );
// // edgesMove.Rw.push(surfaceEdgeUB);

// const surfaceEdgeUF = createEgdes3d(
//   pointsAB_FU,
//   pointsCD_UF,
//   pointsEF_UF,
//   0xffffff
// );
// // edgesMove.Rw.push(surfaceEdgeUF);

// const surfaceEdgeUR = createEgdes3d(
//   pointsAB_UR,
//   pointsCD_UR,
//   pointsEF_UR,
//   0xffffff
// );
// // edgesMove.Fw.push(surfaceEdgeUR);

// const surfaceEdgeUL = createEgdes3d(
//   pointsAB_LU,
//   pointsCD_UL,
//   pointsEF_UL,
//   0xffffff
// );
// // edgesMove.Fw.push(surfaceEdgeUL);

// const surfaceCornerULB = createCorners3dBegin(
//   pointsCornersAB_UB,
//   pointsCornersCD_UB,
//   pointsCornersEF_UB,
//   0xffffff
// );
// const surfaceCornerUBR = createCorners3dEnd(
//   pointsCornersAB_UB,
//   pointsCornersCD_UB,
//   pointsCornersEF_UB,
//   0xffffff
// );
// const surfaceCornerUFL = createCorners3dBegin(
//   pointsCornersAB_UF,
//   pointsCornersCD_UF,
//   pointsCornersEF_UF,
//   0xffffff
// );
// const surfaceCornerUFR = createCorners3dEnd(
//   pointsCornersAB_UF,
//   pointsCornersCD_UF,
//   pointsCornersEF_UF,
//   0xffffff
// );
// // ==========================Surface FRONT=============================
// const surfaceEdgeFU = createEgdes3d(
//   pointsAB_FU,
//   pointsCD_FU,
//   pointsEF_FU,
//   0x00ff00
// );
// // edgesMove.Rw.push(surfaceEdgeFU);

// const surfaceEdgeFD = createEgdes3d(
//   pointsAB_DF,
//   pointsCD_FD,
//   pointsEF_FD,
//   0x00ff00
// );
// // edgesMove.Rw.push(surfaceEdgeFD);

// const surfaceEdgeFR = createEgdes3d(
//   pointsAB_RF,
//   pointsCD_FR,
//   pointsEF_FR,
//   0x00ff00
// );
// // edgesMove.Uw.push(surfaceEdgeFR);

// const surfaceEdgeFL = createEgdes3d(
//   pointsAB_FL,
//   pointsCD_FL,
//   pointsEF_FL,
//   0x00ff00
// );
// // edgesMove.Uw.push(surfaceEdgeFL);

// const surfaceCornerFLU = createCorners3dBegin(
//   pointsCornersAB_FU,
//   pointsCornersCD_FU,
//   pointsCornersEF_FU,
//   0x00ff00
// );
// const surfaceCornerFUR = createCorners3dEnd(
//   pointsCornersAB_FU,
//   pointsCornersCD_FU,
//   pointsCornersEF_FU,
//   0x00ff00
// );
// const surfaceCornerFDL = createCorners3dBegin(
//   pointsCornersAB_FD,
//   pointsCornersCD_FD,
//   pointsCornersEF_FD,
//   0x00ff00
// );
// const surfaceCornerFRD = createCorners3dEnd(
//   pointsCornersAB_FD,
//   pointsCornersCD_FD,
//   pointsCornersEF_FD,
//   0x00ff00
// );
// // ==========================Surface Left=============================
// const surfaceEdgeLU = createEgdes3d(
//   pointsAB_LU,
//   pointsCD_LU,
//   pointsEF_LU,
//   0xffa500
// );
// // edgesMove.Fw.push(surfaceEdgeLU);

// const surfaceEdgeLD = createEgdes3d(
//   pointsAB_DL,
//   pointsCD_LD,
//   pointsEF_LD,
//   0xffa500
// );
// // edgesMove.Fw.push(surfaceEdgeLD);

// const surfaceEdgeLF = createEgdes3d(
//   pointsAB_FL,
//   pointsCD_LF,
//   pointsEF_LF,
//   0xffa500
// );
// // edgesMove.Uw.push(surfaceEdgeLF);

// const surfaceEdgeLB = createEgdes3d(
//   pointsAB_LB,
//   pointsCD_LB,
//   pointsEF_LB,
//   0xffa500
// );
// // edgesMove.Uw.push(surfaceEdgeLB);

// const surfaceCornerLUF = createCorners3dBegin(
//   pointsCornersAB_LU,
//   pointsCornersCD_LU,
//   pointsCornersEF_LU,
//   0xffa500
// );
// const surfaceCornerLBU = createCorners3dEnd(
//   pointsCornersAB_LU,
//   pointsCornersCD_LU,
//   pointsCornersEF_LU,
//   0xffa500
// );
// const surfaceCornerLFD = createCorners3dBegin(
//   pointsCornersAB_LD,
//   pointsCornersCD_LD,
//   pointsCornersEF_LD,
//   0xffa500
// );
// const surfaceCornerLDB = createCorners3dEnd(
//   pointsCornersAB_LD,
//   pointsCornersCD_LD,
//   pointsCornersEF_LD,
//   0xffa500
// );

// // ==========================Surface Back=============================

// const surfaceEdgeBD = createEgdes3d(
//   pointsAB_BD,
//   pointsCD_BD,
//   pointsEF_BD,
//   0x0000ff
// );
// // edgesMove.Rw.push(surfaceEdgeBD);

// const surfaceEdgeBU = createEgdes3d(
//   pointsAB_UB,
//   pointsCD_BU,
//   pointsEF_BU,
//   0x0000ff
// );
// // edgesMove.Rw.push(surfaceEdgeBU);

// const surfaceEdgeBR = createEgdes3d(
//   pointsAB_BR,
//   pointsCD_BR,
//   pointsEF_BR,
//   0x0000ff
// );
// // edgesMove.Uw.push(surfaceEdgeBR);

// const surfaceEdgeBL = createEgdes3d(
//   pointsAB_LB,
//   pointsCD_BL,
//   pointsEF_BL,
//   0x0000ff
// );
// // edgesMove.Uw.push(surfaceEdgeBL);

// const surfaceCornerBLD = createCorners3dBegin(
//   pointsCornersAB_BD,
//   pointsCornersCD_BD,
//   pointsCornersEF_BD,
//   0x0000ff
// );
// const surfaceCornerBDR = createCorners3dEnd(
//   pointsCornersAB_BD,
//   pointsCornersCD_BD,
//   pointsCornersEF_BD,
//   0x0000ff
// );
// const surfaceCornerBUL = createCorners3dBegin(
//   pointsCornersAB_BU,
//   pointsCornersCD_BU,
//   pointsCornersEF_BU,
//   0x0000ff
// );
// const surfaceCornerBRU = createCorners3dEnd(
//   pointsCornersAB_BU,
//   pointsCornersCD_BU,
//   pointsCornersEF_BU,
//   0x0000ff
// );
// // ==========================Surface Down=============================
// const surfaceEdgeDF = createEgdes3d(
//   pointsAB_DF,
//   pointsCD_DF,
//   pointsEF_DF,
//   0xffff00
// );
// // edgesMove.Rw.push(surfaceEdgeDF);

// const surfaceEdgeDB = createEgdes3d(
//   pointsAB_BD,
//   pointsCD_DB,
//   pointsEF_DB,
//   0xffff00
// );
// // edgesMove.Rw.push(surfaceEdgeDB);

// const surfaceEdgeDR = createEgdes3d(
//   pointsAB_RD,
//   pointsCD_DR,
//   pointsEF_DR,
//   0xffff00
// );
// // edgesMove.Fw.push(surfaceEdgeDR);

// const surfaceEdgeDL = createEgdes3d(
//   pointsAB_DL,
//   pointsCD_DL,
//   pointsEF_DL,
//   0xffff00
// );
// // edgesMove.Fw.push(surfaceEdgeDL);

// const surfaceCornerDLF = createCorners3dBegin(
//   pointsCornersAB_DF,
//   pointsCornersCD_DF,
//   pointsCornersEF_DF,
//   0xffff00
// );
// const surfaceCornerDFR = createCorners3dEnd(
//   pointsCornersAB_DF,
//   pointsCornersCD_DF,
//   pointsCornersEF_DF,
//   0xffff00
// );
// const surfaceCornerDBL = createCorners3dBegin(
//   pointsCornersAB_DB,
//   pointsCornersCD_DB,
//   pointsCornersEF_DB,
//   0xffff00
// );
// const surfaceCornerDRB = createCorners3dEnd(
//   pointsCornersAB_DB,
//   pointsCornersCD_DB,
//   pointsCornersEF_DB,
//   0xffff00
// );
// // ========================== CommonEdges =============================
// const edgesRU = [];

// for (let i = 0; i < surfaceEdgeRU.length; i++) {
//   edgesRU.push({
//     parts: [surfaceEdgeRU[i], surfaceEdgeUR[i]],
//     coord: {
//       x: size,
//       y: size,
//       z: size - 1 - i,
//     },
//   });
// }

// const edgesRD = [];

// for (let i = 0; i < surfaceEdgeRD.length; i++) {
//   edgesRD.push({
//     parts: [surfaceEdgeRD[i], surfaceEdgeDR[i]],
//     coord: {
//       x: size,
//       y: 1,
//       z: size - 1 - i,
//     },
//   });
// }

// const edgesRB = [];

// for (let i = 0; i < surfaceEdgeRB.length; i++) {
//   edgesRB.push({
//     parts: [surfaceEdgeRB[i], surfaceEdgeBR[i]],

//     coord: {
//       x: size,
//       y: i + 2,
//       z: 1,
//     },
//   });
// }

// const edgesRF = [];

// for (let i = 0; i < surfaceEdgeRF.length; i++) {
//   edgesRF.push({
//     parts: [surfaceEdgeRF[i], surfaceEdgeFR[i]],

//     coord: {
//       x: size,
//       y: i + 2,
//       z: size,
//     },
//   });
// }

// const edgesUF = [];

// for (let i = 0; i < surfaceEdgeUF.length; i++) {
//   edgesUF.push({
//     parts: [surfaceEdgeUF[i], surfaceEdgeFU[i]],

//     coord: {
//       x: i + 2,
//       y: size,
//       z: size,
//     },
//   });
// }

// const edgesUL = [];

// for (let i = 0; i < surfaceEdgeUL.length; i++) {
//   edgesUL.push({
//     parts: [surfaceEdgeUL[i], surfaceEdgeLU[i]],

//     coord: {
//       x: 1,
//       y: size,
//       z: size - 1 - i,
//     },
//   });
// }

// const edgesUB = [];

// for (let i = 0; i < surfaceEdgeUB.length; i++) {
//   edgesUB.push({
//     parts: [surfaceEdgeUB[i], surfaceEdgeBU[i]],

//     coord: {
//       x: i + 2,
//       y: size,
//       z: 1,
//     },
//   });
// }

// const edgesFL = [];

// for (let i = 0; i < surfaceEdgeFL.length; i++) {
//   edgesFL.push({
//     parts: [surfaceEdgeFL[i], surfaceEdgeLF[i]],

//     coord: {
//       x: 1,
//       y: i + 2,
//       z: size,
//     },
//   });
// }

// const edgesFD = [];

// for (let i = 0; i < surfaceEdgeFD.length; i++) {
//   edgesFD.push({
//     parts: [surfaceEdgeFD[i], surfaceEdgeDF[i]],

//     coord: {
//       x: i + 2,
//       y: 1,
//       z: size,
//     },
//   });
// }

// const edgesLB = [];

// for (let i = 0; i < surfaceEdgeLB.length; i++) {
//   edgesLB.push({
//     parts: [surfaceEdgeLB[i], surfaceEdgeBL[i]],

//     coord: {
//       x: 1,
//       y: i + 2,
//       z: 1,
//     },
//   });
// }

// const edgesLD = [];

// for (let i = 0; i < surfaceEdgeLD.length; i++) {
//   edgesLD.push({
//     parts: [surfaceEdgeLD[i], surfaceEdgeDL[i]],

//     coord: {
//       x: 1,
//       y: 1,
//       z: size - 1 - i,
//     },
//   });
// }

// const edgesBD = [];

// for (let i = 0; i < surfaceEdgeBD.length; i++) {
//   edgesBD.push({
//     parts: [surfaceEdgeBD[i], surfaceEdgeDB[i]],

//     coord: {
//       x: i + 2,
//       y: 1,
//       z: 1,
//     },
//   });
// }

// //  coord: {
// //       x: 1,
// //       y: size,
// //       z: size - 1 - i,
// //     },
// // console.log(
// //   edgesUF.map((edge, i) => ({
// //     index: i,
// //     coord: edge.coord,
// //     RU: surfaceEdgeRD[i],
// //     UR: surfaceEdgeDR[i],
// //   }))
// // );

// // console.log(
// //   edgesFL.map((edge, i) => ({
// //     index: i,
// //     coord: edge.coord,
// //     RD: edge.parts[0],
// //     DR: edge.parts[1],
// //   }))
// // );

// const cornerRFU = {
//   parts: [surfaceCornerRFU, surfaceCornerUFR, surfaceCornerFUR],

//   coord: {
//     x: size,
//     y: size,
//     z: size,
//   },
// };

// const cornerRUB = {
//   parts: [surfaceCornerRUB, surfaceCornerUBR, surfaceCornerBRU],

//   coord: {
//     x: size,
//     y: size,
//     z: 1,
//   },
// };

// const cornerRDF = {
//   parts: [surfaceCornerRDF, surfaceCornerDFR, surfaceCornerFRD],

//   coord: {
//     x: size,
//     y: 1,
//     z: size,
//   },
// };

// const cornerRBD = {
//   parts: [surfaceCornerRBD, surfaceCornerDRB, surfaceCornerBDR],

//   coord: {
//     x: size,
//     y: 1,
//     z: 1,
//   },
// };

// const cornerUFL = {
//   parts: [surfaceCornerLUF, surfaceCornerUFL, surfaceCornerFLU],

//   coord: {
//     x: 1,
//     y: size,
//     z: size,
//   },
// };

// const cornerULB = {
//   parts: [surfaceCornerLBU, surfaceCornerULB, surfaceCornerBUL],

//   coord: {
//     x: 1,
//     y: size,
//     z: 1,
//   },
// };

// const cornerFDL = {
//   parts: [surfaceCornerFDL, surfaceCornerLFD, surfaceCornerDLF],

//   coord: {
//     x: 1,
//     y: 1,
//     z: size,
//   },
// };

// const cornerLDB = {
//   parts: [surfaceCornerLDB, surfaceCornerDBL, surfaceCornerBLD],

//   coord: {
//     x: 1,
//     y: 1,
//     z: 1,
//   },
// };
// // const rightCubies = cubies.filter(
// //   cubie =>
// //     cubie.x === size - 1 &&
// //     cubie.y > 0 &&
// //     cubie.y < size - 1 &&
// //     cubie.z > 0 &&
// //     cubie.z < size - 1
// // );
// // console.log('rightCubies', rightCubies);

// // ==================================================================

// // const stickerDummy = new THREE.Object3D();

// const stickerGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize);

// // const rightStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0xff0000 }),
// //   size * size
// // );
// const rightMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });
// const upMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
// });

// const frontMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// });

// const leftMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffa500,
// });

// const backMaterial = new THREE.MeshBasicMaterial({
//   color: 0x0000ff,
// });

// const downMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffff00,
// });
// // const rightStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   rightMaterial,
// //   size * size
// // );
// // const upStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   upMaterial,
// //   size * size
// // );

// // const frontStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   frontMaterial,
// //   size * size
// // );

// // const leftStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   leftMaterial,
// //   size * size
// // );

// // const backStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   backMaterial,
// //   size * size
// // );

// // const downStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   downMaterial,
// //   size * size
// // );
// // const upStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0xffffff }),
// //   size * size
// // );

// // const frontStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
// //   size * size
// // );

// // const leftStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0xffa500 }),
// //   size * size
// // );

// // const backStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
// //   size * size
// // );

// // const downStickerMesh = new THREE.InstancedMesh(
// //   stickerGeometry,
// //   new THREE.MeshBasicMaterial({ color: 0xffff00 }),
// //   size * size
// // );

// // const rightGroup = new THREE.Group();
// // const upGroup = new THREE.Group();
// // const frontGroup = new THREE.Group();
// // const leftGroup = new THREE.Group();
// // const backGroup = new THREE.Group();
// // const downGroup = new THREE.Group();

// // scene.add(rightGroup, upGroup, frontGroup, leftGroup, backGroup, downGroup);
// const cubeGroup = new THREE.Group();
// scene.add(cubeGroup);
// cubeGroup.add(
//   surfaceCornerRFU.left,
//   surfaceCornerRFU.right,
//   surfaceCornerRFU.outSurface,
//   surfaceCornerRUB.left,
//   surfaceCornerRUB.right,
//   surfaceCornerRUB.outSurface,
//   surfaceCornerRDF.left,
//   surfaceCornerRDF.right,
//   surfaceCornerRDF.outSurface,
//   surfaceCornerRBD.left,
//   surfaceCornerRBD.right,
//   surfaceCornerRBD.outSurface,

//   surfaceCornerUBR.left,
//   surfaceCornerUBR.right,
//   surfaceCornerUBR.outSurface,
//   surfaceCornerUFR.left,
//   surfaceCornerUFR.right,
//   surfaceCornerUFR.outSurface,
//   surfaceCornerFUR.left,
//   surfaceCornerFUR.right,
//   surfaceCornerFUR.outSurface,
//   surfaceCornerFRD.left,
//   surfaceCornerFRD.right,
//   surfaceCornerFRD.outSurface,
//   surfaceCornerBDR.left,
//   surfaceCornerBDR.right,
//   surfaceCornerBDR.outSurface,
//   surfaceCornerBRU.left,
//   surfaceCornerBRU.right,
//   surfaceCornerBRU.outSurface,
//   surfaceCornerDFR.left,
//   surfaceCornerDFR.right,
//   surfaceCornerDFR.outSurface,
//   surfaceCornerDRB.left,
//   surfaceCornerDRB.right,
//   surfaceCornerDRB.outSurface,

//   // ---------------------UP-----------------------------
//   surfaceCornerULB.left,
//   surfaceCornerULB.right,
//   surfaceCornerULB.outSurface,
//   surfaceCornerUFL.left,
//   surfaceCornerUFL.right,
//   surfaceCornerUFL.outSurface,

//   surfaceCornerFLU.left,
//   surfaceCornerFLU.right,
//   surfaceCornerFLU.outSurface,
//   surfaceCornerBUL.left,
//   surfaceCornerBUL.right,
//   surfaceCornerBUL.outSurface,
//   surfaceCornerLUF.left,
//   surfaceCornerLUF.right,
//   surfaceCornerLUF.outSurface,
//   surfaceCornerLBU.left,
//   surfaceCornerLBU.right,
//   surfaceCornerLBU.outSurface,

//   // ---------------------Front-----------------------------

//   surfaceCornerFDL.left,
//   surfaceCornerFDL.right,
//   surfaceCornerFDL.outSurface,
//   surfaceCornerDLF.left,
//   surfaceCornerDLF.right,
//   surfaceCornerDLF.outSurface,
//   surfaceCornerLFD.left,
//   surfaceCornerLFD.right,
//   surfaceCornerLFD.outSurface,

//   // ---------------------Left-----------------------------
//   surfaceCornerLDB.left,
//   surfaceCornerLDB.right,
//   surfaceCornerLDB.outSurface,
//   surfaceCornerDBL.left,
//   surfaceCornerDBL.right,
//   surfaceCornerDBL.outSurface,
//   surfaceCornerBLD.left,
//   surfaceCornerBLD.right,
//   surfaceCornerBLD.outSurface
// );
// // -------------------------Right---------------------------------
// surfaceEdgeRU.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeRD.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeRF.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeRB.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeUR.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeFR.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeBR.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeDR.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// // -------------------------------UP---------------------------------

// surfaceEdgeUB.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeUF.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeUL.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeFU.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeLU.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeBU.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// // =------------------------------Front-------------------------------------
// surfaceEdgeLF.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeFL.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeDF.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeFD.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// // ---------------------------Left---------------------------
// surfaceEdgeBL.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeDL.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// surfaceEdgeLB.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeLD.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// // ---------------------------Back---------------------------

// surfaceEdgeBD.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });
// surfaceEdgeDB.forEach(edge => {
//   cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
// });

// // const rotationGroup = new THREE.Group();
// // scene.add(rotationGroup);

// cubies.forEach(cubie => {
//   const px = (cubie.x - (size - 1) / 2) * cellSize;
//   const py = (cubie.y - (size - 1) / 2) * cellSize;
//   const pz = (cubie.z - (size - 1) / 2) * cellSize;

//   const mesh = new THREE.Mesh(geometry, bodyMaterial);
//   mesh.position.set(px, py, pz);
//   cubie.mesh = mesh;

//   // Исходная позиция
//   // Исходная позиция
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();

//   // ====================
//   // RIGHT
//   // ====================

//   if (cubie.x === size - 1) {
//     const sphereX =
//       sphereCenterX + Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);
//     const bulgeOffset = sphereX - cornerSphereX;

//     // dummy.position.x = px + cornerExpand * faceOffsetFactor + bulgeOffset;
//     // dummy.updateMatrix();

//     // cubie.mesh.position.copy(dummy.position);

//     mesh.position.x = px + cornerExpand * faceOffsetFactor + bulgeOffset;

//     // stickerDummy.position.set(
//     //   dummy.position.x + cubeSize / 2,
//     //   dummy.position.y,
//     //   dummy.position.z
//     // );
//     // stickerDummy.rotation.set(0, Math.PI / 2, 0);
//     // stickerDummy.updateMatrix();

//     // rightStickerMesh.setMatrixAt(rightIndex, stickerDummy.matrix);

//     // const actualPosition = new THREE.Vector3();
//     // actualPosition.setFromMatrixPosition(dummy.matrix);
//     const isEdgeOrCorner =
//       (cubie.y === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
//       (cubie.y === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
//       (cubie.z === 0 && cubie.y > 0 && cubie.y < size - 1) ||
//       (cubie.z === size - 1 && cubie.y > 0 && cubie.y < size - 1);
//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }
//   // const rightMatrix = dummy.matrix.clone();

//   if (cubie.x === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
//     // rightBodyMesh.setMatrixAt(rightIndex++, rightMatrix);
//     const sticker = new THREE.Mesh(stickerGeometry, rightMaterial);
//     sticker.position.set(
//       mesh.position.x + cubeSize / 2,
//       mesh.position.y,
//       mesh.position.z
//     );
//     sticker.rotation.set(0, Math.PI / 2, 0);
//     // sticker.position.copy(stickerDummy.position);
//     // sticker.rotation.copy(stickerDummy.rotation);
//     cubie.sticker = sticker;
//     cubeGroup.add(sticker);
//     cubeGroup.add(cubie.mesh);
//     // rightStickerMesh.setMatrixAt(rightStickerIndex++, stickerDummy.matrix);
//     // cubie.instanceId = rightIndex;
//   }
//   edgesAndCornersCubies = [];

//   // ====================
//   // UP
//   // ====================
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();
//   if (cubie.y === size - 1) {
//     const sphereY =
//       sphereCenterY + Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
//     const bulgeOffsetY = sphereY - cornerSphereY;
//     // dummy.position.y = py + cornerExpand * faceOffsetFactor + bulgeOffsetY;
//     // dummy.updateMatrix();
//     // cubie.mesh.position.copy(dummy.position);

//     mesh.position.y = py + cornerExpand * faceOffsetFactor + bulgeOffsetY;

//     // stickerDummy.position.set(
//     //   dummy.position.x,
//     //   dummy.position.y + cubeSize / 2,
//     //   dummy.position.z
//     // );
//     // stickerDummy.rotation.set(-Math.PI / 2, 0, 0);
//     // stickerDummy.updateMatrix();

//     // upStickerMesh.setMatrixAt(upIndex, stickerDummy.matrix);

//     // const actualPosition = new THREE.Vector3();
//     // actualPosition.setFromMatrixPosition(dummy.matrix);
//     const isEdgeOrCorner =
//       (cubie.x === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
//       (cubie.x === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
//       (cubie.z === 0 && cubie.x > 0 && cubie.x < size - 1) ||
//       (cubie.z === size - 1 && cubie.x > 0 && cubie.x < size - 1);
//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }
//   // const upMatrix = dummy.matrix.clone();
//   if (cubie.y === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
//     // const sticker = new THREE.Mesh(stickerGeometry, upMaterial);
//     // sticker.position.copy(stickerDummy.position);
//     // sticker.rotation.copy(stickerDummy.rotation);
//     const sticker = new THREE.Mesh(stickerGeometry, upMaterial);

//     sticker.position.set(
//       mesh.position.x,
//       mesh.position.y + cubeSize / 2,
//       mesh.position.z
//     );

//     sticker.rotation.set(-Math.PI / 2, 0, 0);
//     cubie.sticker = sticker;
//     cubeGroup.add(sticker);
//     cubeGroup.add(cubie.mesh);
//     // upBodyMesh.setMatrixAt(upIndex++, upMatrix);
//     // console.log(upIndex);
//     // upStickerMesh.setMatrixAt(upStickerIndex++, stickerDummy.matrix);
//   }
//   edgesAndCornersCubies = [];

//   // // ====================
//   // // FRONT
//   // // ====================
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();
//   // if (cubie.z === size - 1) {
//   //   const sphereZ =
//   //     sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);
//   //   const bulgeOffset = sphereZ - cornerSphereZ;
//   //   dummy.position.z = pz + cornerExpand * faceOffsetFactor + bulgeOffset;
//   //   dummy.updateMatrix();

//   //   cubie.mesh.position.copy(dummy.position);

//   //   stickerDummy.position.set(
//   //     dummy.position.x,
//   //     dummy.position.y,
//   //     dummy.position.z + cubeSize / 2
//   //   );
//   //   stickerDummy.rotation.set(0, 0, 0);
//   //   stickerDummy.updateMatrix();
//   //   // frontStickerMesh.setMatrixAt(frontIndex, stickerDummy.matrix);

//   //   const actualPosition = new THREE.Vector3();
//   //   actualPosition.setFromMatrixPosition(dummy.matrix);
//   //   const isEdgeOrCorner =
//   //     (cubie.x === size - 1 && cubie.y >= 0 && cubie.y <= size - 1) ||
//   //     (cubie.x === 0 && cubie.y >= 0 && cubie.y <= size - 1) ||
//   //     (cubie.y === 0 && cubie.x > 0 && cubie.x < size - 1) ||
//   //     (cubie.y === size - 1 && cubie.x > 0 && cubie.x < size - 1);
//   //   if (isEdgeOrCorner) {
//   //     edgesAndCornersCubies.push(cubie);
//   //   }
//   // }
//   // // const frontMatrix = dummy.matrix.clone();
//   // if (cubie.z === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
//   //   const sticker = new THREE.Mesh(stickerGeometry, frontMaterial);
//   //   sticker.position.copy(stickerDummy.position);
//   //   sticker.rotation.copy(stickerDummy.rotation);
//   //   cubie.sticker = sticker;
//   //   scene.add(sticker);
//   //   scene.add(cubie.mesh);
//   //   // frontBodyMesh.setMatrixAt(frontIndex++, frontMatrix);
//   //   // frontStickerMesh.setMatrixAt(frontStickerIndex++, stickerDummy.matrix);
//   // }
//   // edgesAndCornersCubies = [];
//   // ====================
//   // FRONT
//   // ====================

//   if (cubie.z === size - 1) {
//     const sphereZ =
//       sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);

//     const bulgeOffset = sphereZ - cornerSphereZ;

//     mesh.position.z = pz + cornerExpand * faceOffsetFactor + bulgeOffset;

//     const isEdgeOrCorner =
//       cubie.x === size - 1 ||
//       cubie.x === 0 ||
//       cubie.y === 0 ||
//       cubie.y === size - 1;

//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }

//   if (cubie.z === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
//     const sticker = new THREE.Mesh(stickerGeometry, frontMaterial);

//     sticker.position.set(
//       mesh.position.x,
//       mesh.position.y,
//       mesh.position.z + cubeSize / 2
//     );

//     // Для FRONT базовая ориентация PlaneGeometry уже правильная
//     sticker.rotation.set(0, 0, 0);

//     cubie.sticker = sticker;
//     cubeGroup.add(cubie.mesh);
//     cubeGroup.add(sticker);
//   }

//   edgesAndCornersCubies = [];
//   // ====================
//   // LEFT
//   // ====================
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();
//   // if (cubie.x === 0) {
//   //   const sphereX =
//   //     sphereCenterXLeft - Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);
//   //   const bulgeOffsetX = sphereX - cornerSphereXLeft;
//   //   dummy.position.x = px - cornerExpand * faceOffsetFactor + bulgeOffsetX;
//   //   dummy.updateMatrix();

//   //   cubie.mesh.position.copy(dummy.position);

//   //   stickerDummy.position.set(
//   //     dummy.position.x - cubeSize / 2,
//   //     dummy.position.y,
//   //     dummy.position.z
//   //   );
//   //   stickerDummy.rotation.set(0, -Math.PI / 2, 0);
//   //   stickerDummy.updateMatrix();
//   //   // leftStickerMesh.setMatrixAt(leftIndex, stickerDummy.matrix);

//   //   const actualPosition = new THREE.Vector3();
//   //   actualPosition.setFromMatrixPosition(dummy.matrix);
//   //   const isEdgeOrCorner =
//   //     (cubie.y === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
//   //     (cubie.y === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
//   //     (cubie.z === 0 && cubie.y > 0 && cubie.y < size - 1) ||
//   //     (cubie.z === size - 1 && cubie.y > 0 && cubie.y < size - 1);
//   //   if (isEdgeOrCorner) {
//   //     edgesAndCornersCubies.push(cubie);
//   //   }
//   // }
//   // // const leftMatrix = dummy.matrix.clone();
//   // if (cubie.x === 0 && !edgesAndCornersCubies.includes(cubie)) {
//   //   const sticker = new THREE.Mesh(stickerGeometry, leftMaterial);
//   //   sticker.position.copy(stickerDummy.position);
//   //   sticker.rotation.copy(stickerDummy.rotation);
//   //   cubie.sticker = sticker;
//   //   scene.add(sticker);
//   //   scene.add(cubie.mesh);
//   //   // leftBodyMesh.setMatrixAt(leftIndex++, leftMatrix);
//   //   // leftStickerMesh.setMatrixAt(leftStickerIndex++, stickerDummy.matrix);
//   // }
//   // edgesAndCornersCubies = [];
//   // ====================
//   // LEFT
//   // ====================

//   if (cubie.x === 0) {
//     const sphereX =
//       sphereCenterXLeft - Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);

//     const bulgeOffsetX = sphereX - cornerSphereXLeft;

//     mesh.position.x = px - cornerExpand * faceOffsetFactor + bulgeOffsetX;

//     const isEdgeOrCorner =
//       cubie.y === size - 1 ||
//       cubie.y === 0 ||
//       cubie.z === 0 ||
//       cubie.z === size - 1;

//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }

//   if (cubie.x === 0 && !edgesAndCornersCubies.includes(cubie)) {
//     const sticker = new THREE.Mesh(stickerGeometry, leftMaterial);

//     sticker.position.set(
//       mesh.position.x - cubeSize / 2,
//       mesh.position.y,
//       mesh.position.z
//     );

//     sticker.rotation.set(0, -Math.PI / 2, 0);

//     cubie.sticker = sticker;

//     cubeGroup.add(sticker);
//     cubeGroup.add(cubie.mesh);
//   }

//   edgesAndCornersCubies = [];
//   // // ====================
//   // // DOWN
//   // // ====================
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();
//   // if (cubie.y === 0) {
//   //   const sphereY =
//   //     sphereCenterYBottom - Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
//   //   const bulgeOffsetY = sphereY - cornerSphereYBottom;
//   //   dummy.position.y = py - cornerExpand * faceOffsetFactor + bulgeOffsetY;
//   //   dummy.updateMatrix();

//   //   cubie.mesh.position.copy(dummy.position);

//   //   stickerDummy.position.set(
//   //     dummy.position.x,
//   //     dummy.position.y - cubeSize / 2,
//   //     dummy.position.z
//   //   );
//   //   stickerDummy.rotation.set(Math.PI / 2, 0, 0);
//   //   stickerDummy.updateMatrix();
//   //   // downStickerMesh.setMatrixAt(downIndex, stickerDummy.matrix);

//   //   const actualPosition = new THREE.Vector3();
//   //   actualPosition.setFromMatrixPosition(dummy.matrix);
//   //   const isEdgeOrCorner =
//   //     (cubie.x === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
//   //     (cubie.x === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
//   //     (cubie.z === 0 && cubie.x > 0 && cubie.x < size - 1) ||
//   //     (cubie.z === size - 1 && cubie.x > 0 && cubie.x < size - 1);
//   //   if (isEdgeOrCorner) {
//   //     edgesAndCornersCubies.push(cubie);
//   //   }
//   // }
//   // // const downMatrix = dummy.matrix.clone();
//   // if (cubie.y === 0 && !edgesAndCornersCubies.includes(cubie)) {
//   //   const sticker = new THREE.Mesh(stickerGeometry, downMaterial);
//   //   sticker.position.copy(stickerDummy.position);
//   //   sticker.rotation.copy(stickerDummy.rotation);
//   //   cubie.sticker = sticker;
//   //   scene.add(sticker);
//   //   scene.add(cubie.mesh);
//   //   // downBodyMesh.setMatrixAt(downIndex++, downMatrix);
//   //   // downStickerMesh.setMatrixAt(downStickerIndex++, stickerDummy.matrix);
//   // }
//   // edgesAndCornersCubies = [];

//   // ====================
//   // DOWN
//   // ====================

//   if (cubie.y === 0) {
//     const sphereY =
//       sphereCenterYBottom - Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);

//     const bulgeOffsetY = sphereY - cornerSphereYBottom;

//     mesh.position.y = py - cornerExpand * faceOffsetFactor + bulgeOffsetY;

//     const isEdgeOrCorner =
//       cubie.x === size - 1 ||
//       cubie.x === 0 ||
//       cubie.z === 0 ||
//       cubie.z === size - 1;

//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }

//   if (cubie.y === 0 && !edgesAndCornersCubies.includes(cubie)) {
//     const sticker = new THREE.Mesh(stickerGeometry, downMaterial);

//     sticker.position.set(
//       mesh.position.x,
//       mesh.position.y - cubeSize / 2,
//       mesh.position.z
//     );

//     sticker.rotation.set(Math.PI / 2, 0, 0);

//     cubie.sticker = sticker;

//     cubeGroup.add(sticker);
//     cubeGroup.add(cubie.mesh);
//   }

//   edgesAndCornersCubies = [];
//   // // ====================
//   // // BACK
//   // // ====================
//   // dummy.position.set(px, py, pz);
//   // dummy.updateMatrix();
//   // if (cubie.z === 0) {
//   //   const sphereZ =
//   //     sphereCenterZBack - Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);
//   //   const bulgeOffsetZ = sphereZ - cornerSphereZBack;
//   //   dummy.position.z = pz - cornerExpand * faceOffsetFactor + bulgeOffsetZ;
//   //   dummy.updateMatrix();

//   //   cubie.mesh.position.copy(dummy.position);

//   //   stickerDummy.position.set(
//   //     dummy.position.x,
//   //     dummy.position.y,
//   //     dummy.position.z - cubeSize / 2
//   //   );
//   //   stickerDummy.rotation.set(0, Math.PI, 0);
//   //   stickerDummy.updateMatrix();
//   //   // backStickerMesh.setMatrixAt(backIndex, stickerDummy.matrix);

//   //   const actualPosition = new THREE.Vector3();
//   //   actualPosition.setFromMatrixPosition(dummy.matrix);

//   //   const isEdgeOrCorner =
//   //     (cubie.x === size - 1 && cubie.y >= 0 && cubie.y <= size - 1) ||
//   //     (cubie.x === 0 && cubie.y >= 0 && cubie.y <= size - 1) ||
//   //     (cubie.y === 0 && cubie.x > 0 && cubie.x < size - 1) ||
//   //     (cubie.y === size - 1 && cubie.x > 0 && cubie.x < size - 1);
//   //   if (isEdgeOrCorner) {
//   //     edgesAndCornersCubies.push(cubie);
//   //   }
//   // }
//   // // const backMatrix = dummy.matrix.clone();
//   // if (cubie.z === 0 && !edgesAndCornersCubies.includes(cubie)) {
//   //   const sticker = new THREE.Mesh(stickerGeometry, backMaterial);
//   //   sticker.position.copy(stickerDummy.position);
//   //   sticker.rotation.copy(stickerDummy.rotation);
//   //   cubie.sticker = sticker;
//   //   scene.add(sticker);
//   //   scene.add(cubie.mesh);
//   //   // backBodyMesh.setMatrixAt(backIndex++, backMatrix);
//   //   // backStickerMesh.setMatrixAt(backStickerIndex++, stickerDummy.matrix);
//   // }
//   // edgesAndCornersCubies = [];

//   // ====================
//   // BACK
//   // ====================

//   if (cubie.z === 0) {
//     const sphereZ =
//       sphereCenterZBack - Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);

//     const bulgeOffsetZ = sphereZ - cornerSphereZBack;

//     mesh.position.z = pz - cornerExpand * faceOffsetFactor + bulgeOffsetZ;

//     const isEdgeOrCorner =
//       cubie.x === size - 1 ||
//       cubie.x === 0 ||
//       cubie.y === 0 ||
//       cubie.y === size - 1;

//     if (isEdgeOrCorner) {
//       edgesAndCornersCubies.push(cubie);
//     }
//   }

//   if (cubie.z === 0 && !edgesAndCornersCubies.includes(cubie)) {
//     const sticker = new THREE.Mesh(stickerGeometry, backMaterial);

//     sticker.position.set(
//       mesh.position.x,
//       mesh.position.y,
//       mesh.position.z - cubeSize / 2
//     );

//     sticker.rotation.set(0, Math.PI, 0);

//     cubie.sticker = sticker;

//     cubeGroup.add(sticker);
//     cubeGroup.add(cubie.mesh);
//   }

//   edgesAndCornersCubies = [];

//   // layers.x[cubie.x].push(cubie);
//   // layers.y[cubie.y].push(cubie);
//   // layers.z[cubie.z].push(cubie);
// });

// // ====================
// // UPDATE
// // ====================

// // bodyMesh.instanceMatrix.needsUpdate = true;
// // rightBodyMesh.instanceMatrix.needsUpdate = true;
// // frontBodyMesh.instanceMatrix.needsUpdate = true;
// // upBodyMesh.instanceMatrix.needsUpdate = true;
// // leftBodyMesh.instanceMatrix.needsUpdate = true;
// // backBodyMesh.instanceMatrix.needsUpdate = true;
// // downBodyMesh.instanceMatrix.needsUpdate = true;

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
controls.minDistance = 0;
controls.maxDistance = 40;

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

// function drawLine(start, end, color = 0xff0000) {
//   const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
//   const material = new THREE.LineBasicMaterial({
//     color,
//   });
//   const line = new THREE.Line(geometry, material);
//   scene.add(line);
//   return line;
// }

// function createSurface(pointsAB, pointsCD, colorSF = 0x808080) {
//   const vertices = [];
//   for (let i = 0; i < pointsAB.length - 1; i += 2) {
//     const A = pointsAB[i];
//     const A2 = pointsAB[i + 1];
//     const C = pointsCD[i];
//     const C2 = pointsCD[i + 1];
//     // Первый треугольник
//     vertices.push(A.x, A.y, A.z, A2.x, A2.y, A2.z, C.x, C.y, C.z);
//     // Второй треугольник
//     vertices.push(A2.x, A2.y, A2.z, C2.x, C2.y, C2.z, C.x, C.y, C.z);
//   }
//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute(
//     'position',
//     new THREE.Float32BufferAttribute(vertices, 3)
//   );
//   geometry.computeVertexNormals();

//   const material = new THREE.MeshStandardMaterial({
//     color: colorSF,
//     side: THREE.DoubleSide,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   // scene.add(mesh);
//   // groupSF.add(mesh);
//   return mesh;
// }

// function drawArc(center, pointA, pointB, color = 0x00ff00) {
//   const start = pointA.clone().sub(center);
//   const end = pointB.clone().sub(center);
//   const axis = new THREE.Vector3().crossVectors(start, end).normalize();
//   const angle = start.angleTo(end);
//   const points = [];
//   const segments = 64;
//   for (let i = 0; i <= segments; i++) {
//     const t = i / segments;
//     const point = start.clone();
//     point.applyAxisAngle(axis, angle * t);
//     point.add(center);
//     points.push(point);
//   }
//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   const material = new THREE.LineBasicMaterial({
//     color,
//     depthTest: false,
//   });
//   const line = new THREE.Line(geometry, material);
//   line.renderOrder = 1001;
//   scene.add(line);
//   return line;
// }

// for (let i = 0; i < pointsAB_UR.length; i++) {
//   drawLine(pointsAB_UR[i], pointsCD_RU[i], 0xff0000);
// }

// rightGroup.rotation.y += 0.5;
// console.log('cubies:', cubies.length);
// console.log(cubies.filter(cubie => cubie.x === 5));

// console.log(cubies.filter(cubie => cubie.x === 5).map(cubie => cubie.mesh));
//
//
// ------------------------------------------------------------------

function attachPiece(faceGroup, piece) {
  if (piece.cubie) {
    faceGroup.attach(piece.cubie.mesh);
    if (piece.cubie.sticker) {
      faceGroup.attach(piece.cubie.sticker);
    }
    return;
  }
  piece.parts.forEach(part => {
    // part уже является THREE.Object3D
    if (part.isObject3D) {
      faceGroup.attach(part);
      return;
    }
    // part — объект edge3d со своими Mesh
    if (part.left) faceGroup.attach(part.left);
    if (part.right) faceGroup.attach(part.right);
    if (part.down) faceGroup.attach(part.down);
    if (part.outSurface) faceGroup.attach(part.outSurface);
  });
}

function faceToMatrix(face, size, axis) {
  const matrix = Array.from({ length: size }, () => Array(size));

  face.forEach(piece => {
    let row;
    let col;

    if (axis === 'x') {
      row = size - piece.coord.y;
      col = piece.coord.z - 1;
    } else if (axis === 'y') {
      row = piece.coord.z - 1;
      col = piece.coord.x - 1;
    } else if (axis === 'z') {
      row = size - piece.coord.y;
      col = piece.coord.x - 1;
    }

    console.log('axis:', axis, 'coord:', piece.coord, 'row:', row, 'col:', col);

    matrix[row][col] = piece;
  });

  return matrix;
}

function matrixToFace(matrix) {
  return matrix.flat();
}

function rotateMatrix(matrix, axis, angle) {
  const size = matrix.length;
  const result = Array.from({ length: size }, () => Array(size));

  const reverse = angle === Math.PI / 2;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const piece = matrix[row][col];

      const newRow = reverse ? size - 1 - col : col;

      const newCol = reverse ? row : size - 1 - row;

      // const newRow = col;
      // const newCol = size - 1 - row;

      result[newRow][newCol] = piece;

      if (axis === 'x') {
        // piece.coord.x = size;
        piece.coord.y = newRow + 1;
        piece.coord.z = size - newCol;
      }

      if (axis === 'y') {
        piece.coord.x = newCol + 1;
        // piece.coord.y = size;
        piece.coord.z = newRow + 1;
      }

      if (axis === 'z') {
        piece.coord.x = newCol + 1;
        piece.coord.y = size - newRow;
        // piece.coord.z = size;
      }
    }
  }

  return result;
}

function orderRing(pieces) {
  console.log('I am HERE');
  const coords = pieces.map(piece => piece.coord);

  // Находим координату, которая одинаковая у всех
  const fixedAxes = ['x', 'y', 'z'].filter(axis =>
    coords.every(coord => coord[axis] === coords[0][axis])
  );
  console.log(fixedAxes);
  if (fixedAxes.length !== 1) {
    throw new Error('Не удалось определить фиксированную координату');
  }

  const fixedAxis = fixedAxes[0];

  // Две оставшиеся координаты
  const variableAxes = ['x', 'y', 'z'].filter(axis => axis !== fixedAxis);

  const A = variableAxes[0];
  const B = variableAxes[1];

  // Определяем size
  const size = Math.max(...coords.map(coord => Math.max(coord[A], coord[B])));

  const result = [];
  const used = new Set();

  function addPiece(a, b) {
    const piece = pieces.find(
      piece => !used.has(piece) && piece.coord[A] === a && piece.coord[B] === b
    );

    if (piece) {
      result.push(piece);
      used.add(piece);
    }
  }

  // A = 1, B растёт
  for (let b = 1; b <= size; b++) {
    addPiece(1, b);
  }

  // B = size, A растёт
  for (let a = 2; a <= size; a++) {
    addPiece(a, size);
  }

  // A = size, B уменьшается
  for (let b = size - 1; b >= 1; b--) {
    addPiece(size, b);
  }

  // B = 1, A уменьшается
  for (let a = size - 1; a >= 2; a--) {
    addPiece(a, 1);
  }

  if (fixedAxis === 'y') {
    console.log('resultY', result);
    return result.reverse();
  }
  console.log('result', result);
  return result;
}

function rotateRing(pieces, size, angle) {
  const orderedFace = orderRing(pieces);
  console.log('orderedFace', orderedFace);
  const shift = size - 1;
  // Сохраняем координаты ПОЗИЦИЙ
  const coords = orderedFace.map(piece => ({
    x: piece.coord.x,
    y: piece.coord.y,
    z: piece.coord.z,
  }));
  let array;
  if (angle === -Math.PI / 2) {
    array = [...orderedFace.slice(-shift), ...orderedFace.slice(0, -shift)];
  } else if (angle === Math.PI / 2) {
    array = [...orderedFace.slice(shift), ...orderedFace.slice(0, shift)];
  } else {
    return orderedFace;
  }
  // Новому элементу даём координаты позиции,
  // которую он занял
  array.forEach((piece, i) => {
    piece.coord.x = coords[i].x;
    piece.coord.y = coords[i].y;
    piece.coord.z = coords[i].z;
  });
  console.log('Array Return', array);
  return array;
}

function getFace(axis, value) {
  return cubePieces.filter(piece => piece.coord[axis] === value);
}

function rotateLayer(axis, value, angle) {
  if (Math.abs(angle) === Math.PI) {
    rotateLayer(axis, value, Math.PI / 2);
    rotateLayer(axis, value, Math.PI / 2);
    return;
  }
  const face = getFace(axis, value);

  const faceGroup = new THREE.Group();
  cubeGroup.add(faceGroup);

  face.forEach(piece => {
    attachPiece(faceGroup, piece);
  });

  faceGroup.rotation[axis] = angle;

  let rotatedFace;

  if (value > 1 && value < size) {
    rotatedFace = rotateRing(face, size, angle);
  } else if (Math.abs(angle) === Math.PI / 2) {
    rotatedFace = face;
    const matrix = faceToMatrix(face, size, axis);

    console.log('BEFORE');

    const beforeMatrix = matrix.map(row =>
      row.map(piece => ({
        x: piece.coord.x,
        y: piece.coord.y,
        z: piece.coord.z,
      }))
    );

    console.table(
      beforeMatrix.map(row => row.map(({ x, y, z }) => `(${x},${y},${z})`))
    );

    const rotatedMatrix = rotateMatrix(matrix, axis, angle);

    rotatedFace = matrixToFace(rotatedMatrix);

    console.log('ROTATED FACE:', rotatedFace);
  }
  console.log('rotatedFace', rotatedFace);
  // 3. Вернули обратно
  rotatedFace.forEach(piece => {
    if (piece.cubie) {
      cubeGroup.attach(piece.cubie.mesh);

      if (piece.cubie.sticker) {
        cubeGroup.attach(piece.cubie.sticker);
      }

      return;
    }

    piece.parts.forEach(part => {
      if (part.isObject3D) {
        cubeGroup.attach(part);
        return;
      }

      if (part.left) cubeGroup.attach(part.left);
      if (part.right) cubeGroup.attach(part.right);
      if (part.down) cubeGroup.attach(part.down);
      if (part.outSurface) cubeGroup.attach(part.outSurface);
    });
  });

  const indexes = face.map(piece => cubePieces.indexOf(piece));

  indexes.forEach((cubeIndex, i) => {
    cubePieces[cubeIndex] = rotatedFace[i];
  });
  cubeGroup.remove(faceGroup);
}

// ==================================================================
// const rightPieces = cubies
//   .filter(
//     cubie =>
//       cubie.x === size - 1 &&
//       cubie.y > 0 &&
//       cubie.y < size - 1 &&
//       cubie.z > 0 &&
//       cubie.z < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));

// const upPieces = cubies
//   .filter(
//     cubie =>
//       cubie.y === size - 1 &&
//       cubie.x > 0 &&
//       cubie.x < size - 1 &&
//       cubie.z > 0 &&
//       cubie.z < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));
// const frontPieces = cubies
//   .filter(
//     cubie =>
//       cubie.z === size - 1 &&
//       cubie.x > 0 &&
//       cubie.x < size - 1 &&
//       cubie.y > 0 &&
//       cubie.y < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));

// const leftPieces = cubies
//   .filter(
//     cubie =>
//       cubie.x === 0 &&
//       cubie.y > 0 &&
//       cubie.y < size - 1 &&
//       cubie.z > 0 &&
//       cubie.z < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));

// const downPieces = cubies
//   .filter(
//     cubie =>
//       cubie.y === 0 &&
//       cubie.x > 0 &&
//       cubie.x < size - 1 &&
//       cubie.z > 0 &&
//       cubie.z < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));

// const backPieces = cubies
//   .filter(
//     cubie =>
//       cubie.z === 0 &&
//       cubie.x > 0 &&
//       cubie.x < size - 1 &&
//       cubie.y > 0 &&
//       cubie.y < size - 1
//   )
//   .map(cubie => ({
//     cubie,
//     coord: {
//       x: cubie.x + 1,
//       y: cubie.y + 1,
//       z: cubie.z + 1,
//     },
//   }));
// // console.log('upPieces', upPieces);
// // console.log('rightCubies', rightCubies);
// rightPieces.push(...edgesRU);
// rightPieces.push(...edgesRF);
// rightPieces.push(...edgesRD);
// rightPieces.push(...edgesRB);

// rightPieces.push(cornerRFU, cornerRUB, cornerRDF, cornerRBD);

// upPieces.push(...edgesUB);
// upPieces.push(...edgesUF);
// upPieces.push(...edgesUL);

// upPieces.push(cornerUFL, cornerULB);

// frontPieces.push(...edgesFL);
// frontPieces.push(...edgesFD);

// frontPieces.push(cornerFDL);

// leftPieces.push(...edgesLB);
// leftPieces.push(...edgesLD);

// leftPieces.push(cornerLDB);

// backPieces.push(...edgesBD);

// const cubePieces = [];
// cubePieces.push(
//   ...rightPieces,
//   ...upPieces,
//   ...frontPieces,
//   ...leftPieces,
//   ...backPieces,
//   ...downPieces
// );
// console.log('cubePieces', cubePieces);

// const pieceIds = new Map(cubePieces.map((piece, index) => [piece, index]));

let before = cubePieces.map(piece => ({
  piece,
  coord: { ...piece.coord },
}));

rotateLayer('y', 2, Math.PI / 2);
rotateLayer('x', size, Math.PI / 2);

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

// function orderRing(pieces, fixedCoord, A, B, size) {
//   const result = [];
//   const used = new Set();

//   const getCoord = (piece, coord) => piece.coord[coord];

//   // 1. A = 1, B: 1 → size
//   for (let b = 1; b <= size; b++) {
//     const piece = pieces.find(
//       p => !used.has(p) && getCoord(p, A) === 1 && getCoord(p, B) === b
//     );

//     if (piece) {
//       result.push(piece);
//       used.add(piece);
//     }
//   }

//   // 2. B = size, A: 2 → size
//   for (let a = 2; a <= size; a++) {
//     const piece = pieces.find(
//       p => !used.has(p) && getCoord(p, A) === a && getCoord(p, B) === size
//     );

//     if (piece) {
//       result.push(piece);
//       used.add(piece);
//     }
//   }

//   // 3. A = size, B: size - 1 → 1
//   for (let b = size - 1; b >= 1; b--) {
//     const piece = pieces.find(
//       p => !used.has(p) && getCoord(p, A) === size && getCoord(p, B) === b
//     );

//     if (piece) {
//       result.push(piece);
//       used.add(piece);
//     }
//   }

//   // 4. B = 1, A: size - 1 → 2
//   for (let a = size - 1; a >= 2; a--) {
//     const piece = pieces.find(
//       p => !used.has(p) && getCoord(p, A) === a && getCoord(p, B) === 1
//     );

//     if (piece) {
//       result.push(piece);
//       used.add(piece);
//     }
//   }
//   console.log(result);
//   return result;
// }
// function rotateLayer(axis, value, angle) {
//   if (Math.abs(angle) === Math.PI) {
//     rotateLayer(axis, value, Math.PI / 2);
//     rotateLayer(axis, value, Math.PI / 2);
//     return;
//   }

//   const face = getFace(axis, value);

//   const faceGroup = new THREE.Group();
//   cubeGroup.add(faceGroup);

//   face.forEach(piece => {
//     attachPiece(faceGroup, piece);
//   });

//   faceGroup.rotation[axis] = angle;

//   let rotatedFace;

//   // Внутренний слой
//   if (value > 1 && value < size) {
//     rotatedFace = rotateRing(face, size, angle);

//     // Внешняя грань
//   } else if (Math.abs(angle) === Math.PI / 2) {
//     const matrix = faceToMatrix(face, size, axis);

//     const rotatedMatrix = rotateMatrix(matrix, axis, angle);

//     rotatedFace = matrixToFace(rotatedMatrix);
//   }

//   if (!rotatedFace) {
//     console.error('rotatedFace is undefined', {
//       axis,
//       value,
//       angle,
//     });

//     cubeGroup.remove(faceGroup);
//     return;
//   }

//   if (rotatedFace.length !== face.length) {
//     console.error('ROTATION LENGTH ERROR', {
//       face: face.length,
//       rotatedFace: rotatedFace.length,
//       axis,
//       value,
//       angle,
//     });

//     cubeGroup.remove(faceGroup);
//     return;
//   }

//   rotatedFace.forEach(piece => {
//     if (piece.cubie) {
//       cubeGroup.attach(piece.cubie.mesh);

//       if (piece.cubie.sticker) {
//         cubeGroup.attach(piece.cubie.sticker);
//       }

//       return;
//     }

//     piece.parts.forEach(part => {
//       if (part.isObject3D) {
//         cubeGroup.attach(part);
//         return;
//       }

//       if (part.left) cubeGroup.attach(part.left);
//       if (part.right) cubeGroup.attach(part.right);
//       if (part.down) cubeGroup.attach(part.down);
//       if (part.outSurface) cubeGroup.attach(part.outSurface);
//     });
//   });

//   const indexes = face.map(piece => cubePieces.indexOf(piece));

//   indexes.forEach((cubeIndex, i) => {
//     cubePieces[cubeIndex] = rotatedFace[i];
//   });

//   cubeGroup.remove(faceGroup);
// }
