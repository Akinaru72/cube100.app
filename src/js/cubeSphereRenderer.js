import * as THREE from 'three';

import { createRightPoints } from '../js/right.js';

import { createUpPoints } from '../js/up.js';

import { createFrontPoints } from '../js/front.js';

import { createLeftPoints } from '../js/left.js';

import { createBackPoints } from '../js/back.js';

import { createDownPoints } from '../js/down.js';

import {
  cubeSize,
  cellSize,
  faceOffsetFactor,
  gap,
  getCubeSphereParams,
} from '../js/constants';
export function createCubeRenderer(cubeState, size) {
  const {
    halfSize,
    cornerExpand,
    sphereOffset,
    fullsize,
    bulgeRadius,
    sphereOffsetEdges,
    diagonal,
    halfCenters,
    cornerSize,

    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB,

    pointsA,
    pointsB,
    pointsC,
  } = getCubeSphereParams(size);

  const params = getCubeSphereParams(size);

  const rightPoints = createRightPoints(params);
  // console.log(pointsA);
  const {
    pointsCD_RF,
    pointsCD_RB,
    pointsCD_RU,
    pointsCD_RD,
    pointsCornersAB_RU,
    pointsCornersCD_RU,
    pointsCornersEF_RU,
    pointsCornersAB_RD,
    pointsCornersCD_RD,
    pointsCornersEF_RD,
    pointsEF_RU,
    pointsEF_RD,
    pointsEF_RF,
    pointsEF_RB,
  } = rightPoints;

  const upPoints = createUpPoints(params);
  const {
    pointsCD_UB,
    pointsCornersAB_UB,
    pointsCornersCD_UB,
    pointsCornersEF_UB,
    pointsCD_UF,
    pointsCornersAB_UF,
    pointsCornersCD_UF,
    pointsCornersEF_UF,
    pointsCD_UR,
    pointsCD_UL,
    pointsEF_UB,
    pointsEF_UF,
    pointsEF_UR,
    pointsEF_UL,
  } = upPoints;

  const frontPoints = createFrontPoints(params);
  const {
    pointsCD_FU,
    pointsCornersAB_FU,
    pointsCornersCD_FU,
    pointsCornersEF_FU,
    pointsCD_FD,
    pointsCornersAB_FD,
    pointsCornersCD_FD,
    pointsCornersEF_FD,
    pointsCD_FR,
    pointsCD_FL,
    pointsEF_FU,
    pointsEF_FD,
    pointsEF_FR,
    pointsEF_FL,
  } = frontPoints;

  const leftPoints = createLeftPoints(params);
  const {
    pointsCD_LU,
    pointsCornersAB_LU,
    pointsCornersCD_LU,
    pointsCornersEF_LU,
    pointsCD_LD,
    pointsCornersAB_LD,
    pointsCornersCD_LD,
    pointsCornersEF_LD,
    pointsCD_LF,
    pointsCD_LB,
    pointsEF_LB,
    pointsEF_LU,
    pointsEF_LD,
    pointsEF_LF,
  } = leftPoints;

  const backPoints = createBackPoints(params);
  const {
    pointsCD_BD,
    pointsCornersAB_BD,
    pointsCornersCD_BD,
    pointsCornersEF_BD,
    pointsCD_BU,
    pointsCornersAB_BU,
    pointsCornersCD_BU,
    pointsCornersEF_BU,
    pointsCD_BR,
    pointsCD_BL,
    pointsEF_BL,
    pointsEF_BD,
    pointsEF_BU,
    pointsEF_BR,
  } = backPoints;

  const downPoints = createDownPoints(params);
  const {
    pointsCD_DF,
    pointsCornersAB_DF,
    pointsCornersCD_DF,
    pointsCornersEF_DF,
    pointsCD_DB,
    pointsCornersAB_DB,
    pointsCornersCD_DB,
    pointsCornersEF_DB,
    pointsCD_DR,
    pointsCD_DL,
    pointsEF_DR,
    pointsEF_DL,
    pointsEF_DB,
    pointsEF_DF,
  } = downPoints;

  const scene = new THREE.Scene();

  console.log('bulgeRadius', bulgeRadius);

  // ====================
  // GEOMETRY
  // ====================

  const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.18,
    emissive: 0x000000,
  });
  // const bodyMaterial = new THREE.MeshStandardMaterial({
  //   color: 0x808080,
  // });

  const cubies = [];

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

  // drawArc(sphereCenterUR, fur, ubr, 0xff0000);
  // drawArc(sphereCenterRD, frd, rbd, 0xff0000);
  // drawArc(sphereCenterDL, fdl, dbl, 0xff0000);
  // drawArc(sphereCenterLU, flu, lbu, 0xff0000);

  // const A = getArcPointForZ(frd.z, sphereCenterRD, frd);
  // const B = getArcPointForZ(rbd.z, sphereCenterRD, frd);

  // drawLine(A, B);

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

  // drawArc(sphereCenterBR, ubr, rbd, 0xff0000);
  // drawArc(sphereCenterRF, fur, frd, 0xff0000);
  // drawArc(sphereCenterFL, flu, fdl, 0xff0000);
  // drawArc(sphereCenterLB, lbu, dbl, 0xff0000);

  const pointsAB_BR = getArcPointsY(
    ubr,
    (size - 1) * 2 - 2,
    sphereCenterBR,
    -1
  );
  const pointsAB_RF = getArcPointsY(
    fur,
    (size - 1) * 2 - 2,
    sphereCenterRF,
    -1
  );
  const pointsAB_FL = getArcPointsY(
    flu,
    (size - 1) * 2 - 2,
    sphereCenterFL,
    -1
  );
  const pointsAB_LB = getArcPointsY(
    lbu,
    (size - 1) * 2 - 2,
    sphereCenterLB,
    -1
  );

  // console.log('pointsAB_BR', pointsAB_BR);
  // console.log('pointsAB_RF', pointsAB_RF);
  // console.log('pointsAB_FL', pointsAB_FL);
  // console.log('pointsAB_LB', pointsAB_LB);
  // ============================YZ==============
  // drawArc(sphereCenterDF, fdl, frd, 0xff0000); // нормально
  // drawArc(sphereCenterFU, fur, flu, 0xff0000); // поменяли
  // drawArc(sphereCenterUB, lbu, ubr, 0xff0000); // нормально
  // drawArc(sphereCenterBD, rbd, dbl, 0xff0000); // поменяли

  const pointsAB_DF = getArcPointsX(
    frd,
    (size - 1) * 2 - 2,
    sphereCenterDF,
    -1
  );
  const pointsAB_FU = getArcPointsX(
    fur,
    (size - 1) * 2 - 2,
    sphereCenterFU,
    -1
  );
  const pointsAB_UB = getArcPointsX(
    ubr,
    (size - 1) * 2 - 2,
    sphereCenterUB,
    -1
  );
  const pointsAB_BD = getArcPointsX(
    rbd,
    (size - 1) * 2 - 2,
    sphereCenterBD,
    -1
  );

  // console.log('pointsAB_UB', pointsAB_UB);
  // console.log('pointsAB_DF', pointsAB_DF);
  // console.log('pointsAB_FU', pointsAB_FU);
  // console.log('pointsAB_BD', pointsAB_BD);
  // RIGHT 🔴 0xff0000
  // LEFT 🟠 0xffa500
  // UP ⚪ 0xffffff
  // DOWN 🟡 0xffff00
  // FRONT 🟢 0x00ff00
  // BACK 🔵 0x0000ff

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

        cubies.push({
          x,
          y,
          z,
        });
      }
    }
  }

  let edgesAndCornersCubies = [];

  function createEgdes3d(pointsAB, pointsCD, pointsEF, color) {
    const edgesArray = [];
    let j = 0;
    for (let i = 0; i < pointsAB.length - 1; i += 2) {
      const A = pointsAB[i];
      const A2 = pointsAB[i + 1];
      const C = pointsCD[i];
      const C2 = pointsCD[i + 1];
      const E = pointsEF[i];
      const E2 = pointsEF[i + 1];
      // 1. Левая внутренняя стенка
      let left = createSurface([A, C], [E, E], color[j]);
      // 2. Правая внутренняя стенка
      let right = createSurface([A2, C2], [E2, E2], color[j]);
      // 3. Нижняя внутренняя стенка
      let down = createSurface([C, C2], [E, E2], color[j]);
      // 4. Внешняя стенка
      let outSurface = createSurface([A, A2], [C, C2], color[j]);

      const edge3d = { left, right, down, outSurface };
      edgesArray.push(edge3d);
      j = j + 1;
    }

    return edgesArray;
  }

  function createCorners3dBegin(pointsAB, pointsCD, pointsEF, color) {
    // 1. Левая внутренняя стенка
    const left = createSurface(
      [pointsEF[0], pointsEF[0]],
      pointsCD.slice(0, 2),
      color
    );
    // 2. Правая внутренняя стенка
    const right = createSurface(
      [pointsEF[0], pointsEF[0]],
      [pointsAB[1], pointsCD[1]],
      color
    );
    // 3. Внешняя стенка
    const outSurface = createSurface(
      pointsAB.slice(0, 2),
      pointsCD.slice(0, 2),
      color
    );
    return { left, right, outSurface };
  }

  function createCorners3dEnd(pointsAB, pointsCD, pointsEF, color) {
    // 1. Левая внутренняя стенка
    const left = createSurface(
      [pointsEF[1], pointsEF[1]],
      pointsCD.slice(2, 4),
      color
    );
    // 2. Правая внутренняя стенка
    const right = createSurface(
      [pointsEF[1], pointsEF[1]],
      [pointsAB[2], pointsCD[2]],
      color
    );
    // 3. Внешняя стенка
    const outSurface = createSurface(
      pointsAB.slice(2, 4),
      pointsCD.slice(2, 4),
      color
    );
    return { left, right, outSurface };
  }

  const colors = {
    W: 0xffffff,
    Y: 0xffff00,
    G: 0x00ff00,
    B: 0x0000ff,
    R: 0xff0000,
    O: 0xffa500,
  };

  const getMaterial = value => {
    return createStickerMaterial(colors[value[0]]);
  };

  const getMaterialSurface = value => {
    return colors[value[0]];
  };

  // ==========================Surface RIGHT=============================

  const stateRU = cubeState.getRow('R', 0).slice(1, -1);
  let arrayColorsRU = [];
  stateRU.map(el => {
    arrayColorsRU.push(getMaterialSurface(el.slice(0, 1)));
  });

  const surfaceEdgeRU = createEgdes3d(
    pointsAB_UR,
    pointsCD_RU,
    pointsEF_RU,
    arrayColorsRU
  );

  const stateRF = cubeState.getCol('R', 0).slice(1, -1);
  let arrayColorsRF = [];
  stateRF.map(el => {
    arrayColorsRF.push(getMaterialSurface(el.slice(0, 1)));
  });

  const surfaceEdgeRF = createEgdes3d(
    pointsAB_RF,
    pointsCD_RF,
    pointsEF_RF,
    arrayColorsRF.toReversed()
  );

  const stateRB = cubeState.getCol('R', size - 1).slice(1, -1);
  let arrayColorsRB = [];
  stateRB.map(el => {
    arrayColorsRB.push(getMaterialSurface(el.slice(0, 1)));
  });

  const surfaceEdgeRB = createEgdes3d(
    pointsAB_BR,
    pointsCD_RB,
    pointsEF_RB,
    arrayColorsRB.toReversed()
  );

  const stateRD = cubeState.getRow('R', size - 1).slice(1, -1);
  let arrayColorsRD = [];
  stateRD.map(el => {
    arrayColorsRD.push(getMaterialSurface(el.slice(0, 1)));
  });

  const surfaceEdgeRD = createEgdes3d(
    pointsAB_RD,
    pointsCD_RD,
    pointsEF_RD,
    arrayColorsRD
  );

  const stateRFU = cubeState.getCell('R', 0, 0);
  const colorCornerRFU = getMaterialSurface(stateRFU.slice(0, 1));

  const surfaceCornerRFU = createCorners3dBegin(
    pointsCornersAB_RU,
    pointsCornersCD_RU,
    pointsCornersEF_RU,
    colorCornerRFU
  );

  const stateRUB = cubeState.getCell('R', 0, size - 1);
  const colorCornerRUB = getMaterialSurface(stateRUB.slice(0, 1));

  const surfaceCornerRUB = createCorners3dEnd(
    pointsCornersAB_RU,
    pointsCornersCD_RU,
    pointsCornersEF_RU,
    colorCornerRUB
  );

  const stateRDF = cubeState.getCell('R', size - 1, 0);
  const colorCornerRDF = getMaterialSurface(stateRDF.slice(0, 1));

  const surfaceCornerRDF = createCorners3dBegin(
    pointsCornersAB_RD,
    pointsCornersCD_RD,
    pointsCornersEF_RD,
    colorCornerRDF
  );

  const stateRBD = cubeState.getCell('R', size - 1, size - 1);
  const colorCornerRBD = getMaterialSurface(stateRBD.slice(0, 1));

  const surfaceCornerRBD = createCorners3dEnd(
    pointsCornersAB_RD,
    pointsCornersCD_RD,
    pointsCornersEF_RD,
    colorCornerRBD
  );

  // ==========================Surface UP=============================

  const stateUB = cubeState.getRow('U', 0).slice(1, -1);
  let arrayColorsUB = [];
  stateUB.map(el => {
    arrayColorsUB.push(getMaterialSurface(el.slice(0, 1)));
  });
  // console.log(stateUB);
  // console.log(arrayColorsUB);

  const surfaceEdgeUB = createEgdes3d(
    pointsAB_UB,
    pointsCD_UB,
    pointsEF_UB,
    arrayColorsUB
  );

  const stateUF = cubeState.getRow('U', size - 1).slice(1, -1);
  let arrayColorsUF = [];
  stateUF.map(el => {
    arrayColorsUF.push(getMaterialSurface(el.slice(0, 1)));
  });
  // console.log(stateUF);
  // console.log(arrayColorsUF);

  const surfaceEdgeUF = createEgdes3d(
    pointsAB_FU,
    pointsCD_UF,
    pointsEF_UF,
    arrayColorsUF
  );

  const stateUR = cubeState.getCol('U', size - 1).slice(1, -1);
  let arrayColorsUR = [];
  stateUR.map(el => {
    arrayColorsUR.push(getMaterialSurface(el.slice(0, 1)));
  });
  // console.log(stateUR);
  // console.log(arrayColorsUR);

  const surfaceEdgeUR = createEgdes3d(
    pointsAB_UR,
    pointsCD_UR,
    pointsEF_UR,
    arrayColorsUR.toReversed()
  );

  const stateUL = cubeState.getCol('U', 0).slice(1, -1);
  let arrayColorsUL = [];
  stateUL.map(el => {
    arrayColorsUL.push(getMaterialSurface(el.slice(0, 1)));
  });
  // console.log(stateUL);
  // console.log(arrayColorsUL);

  const surfaceEdgeUL = createEgdes3d(
    pointsAB_LU,
    pointsCD_UL,
    pointsEF_UL,
    arrayColorsUL.toReversed()
  );

  const stateULB = cubeState.getCell('U', 0, 0);
  const colorCornerULB = getMaterialSurface(stateULB.slice(0, 1));

  const surfaceCornerULB = createCorners3dBegin(
    pointsCornersAB_UB,
    pointsCornersCD_UB,
    pointsCornersEF_UB,
    colorCornerULB
  );

  const stateUBR = cubeState.getCell('U', 0, size - 1);
  const colorCornerUBR = getMaterialSurface(stateUBR.slice(0, 1));
  // console.log(stateUBR);

  const surfaceCornerUBR = createCorners3dEnd(
    pointsCornersAB_UB,
    pointsCornersCD_UB,
    pointsCornersEF_UB,
    colorCornerUBR
  );

  const stateUFL = cubeState.getCell('U', size - 1, 0);
  const colorCornerUFL = getMaterialSurface(stateUFL.slice(0, 1));
  // console.log(stateUFL);

  const surfaceCornerUFL = createCorners3dBegin(
    pointsCornersAB_UF,
    pointsCornersCD_UF,
    pointsCornersEF_UF,
    colorCornerUFL
  );

  const stateUFR = cubeState.getCell('U', size - 1, size - 1);
  const colorCornerUFR = getMaterialSurface(stateUFR.slice(0, 1));
  // console.log(stateUFR);

  const surfaceCornerUFR = createCorners3dEnd(
    pointsCornersAB_UF,
    pointsCornersCD_UF,
    pointsCornersEF_UF,
    colorCornerUFR
  );
  // ==========================Surface FRONT=============================

  const stateFU = cubeState.getRow('F', 0).slice(1, -1);
  let arrayColorsFU = [];
  stateFU.map(el => {
    arrayColorsFU.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateFU);
  // console.log(arrayColorsFU);

  const surfaceEdgeFU = createEgdes3d(
    pointsAB_FU,
    pointsCD_FU,
    pointsEF_FU,
    arrayColorsFU
  );

  const stateFD = cubeState.getRow('F', size - 1).slice(1, -1);
  let arrayColorsFD = [];
  stateFD.map(el => {
    arrayColorsFD.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateFD);
  // console.log(arrayColorsFD);

  const surfaceEdgeFD = createEgdes3d(
    pointsAB_DF,
    pointsCD_FD,
    pointsEF_FD,
    arrayColorsFD
  );

  const stateFR = cubeState.getCol('F', size - 1).slice(1, -1);
  let arrayColorsFR = [];
  stateFR.map(el => {
    arrayColorsFR.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateFR);
  // console.log(arrayColorsFR);

  const surfaceEdgeFR = createEgdes3d(
    pointsAB_RF,
    pointsCD_FR,
    pointsEF_FR,
    arrayColorsFR.toReversed()
  );

  const stateFL = cubeState.getCol('F', 0).slice(1, -1);
  let arrayColorsFL = [];
  stateFL.map(el => {
    arrayColorsFL.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateFL);
  // console.log(arrayColorsFL);

  const surfaceEdgeFL = createEgdes3d(
    pointsAB_FL,
    pointsCD_FL,
    pointsEF_FL,
    arrayColorsFL.toReversed()
  );

  const stateFLU = cubeState.getCell('F', 0, 0);
  const colorCornerFLU = getMaterialSurface(stateFLU.slice(0, 1));
  // console.log(stateFLU);

  const surfaceCornerFLU = createCorners3dBegin(
    pointsCornersAB_FU,
    pointsCornersCD_FU,
    pointsCornersEF_FU,
    colorCornerFLU
  );

  const stateFUR = cubeState.getCell('F', 0, size - 1);
  const colorCornerFUR = getMaterialSurface(stateFUR.slice(0, 1));
  // console.log(stateFUR);

  const surfaceCornerFUR = createCorners3dEnd(
    pointsCornersAB_FU,
    pointsCornersCD_FU,
    pointsCornersEF_FU,
    colorCornerFUR
  );

  const stateFDL = cubeState.getCell('F', size - 1, 0);
  const colorCornerFDL = getMaterialSurface(stateFDL.slice(0, 1));
  // console.log(stateFDL);

  const surfaceCornerFDL = createCorners3dBegin(
    pointsCornersAB_FD,
    pointsCornersCD_FD,
    pointsCornersEF_FD,
    colorCornerFDL
  );

  const stateFRD = cubeState.getCell('F', size - 1, size - 1);
  const colorCornerFRD = getMaterialSurface(stateFRD.slice(0, 1));
  // console.log(stateFRD);

  const surfaceCornerFRD = createCorners3dEnd(
    pointsCornersAB_FD,
    pointsCornersCD_FD,
    pointsCornersEF_FD,
    colorCornerFRD
  );
  // ==========================Surface Left=============================

  const stateLU = cubeState.getRow('L', 0).slice(1, -1);
  let arrayColorsLU = [];
  stateLU.map(el => {
    arrayColorsLU.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateLU);
  // console.log(arrayColorsLU);

  const surfaceEdgeLU = createEgdes3d(
    pointsAB_LU,
    pointsCD_LU,
    pointsEF_LU,
    arrayColorsLU.toReversed()
  );

  const stateLD = cubeState.getRow('L', size - 1).slice(1, -1);
  let arrayColorsLD = [];
  stateLD.map(el => {
    arrayColorsLD.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateLD);
  // console.log(arrayColorsLD);

  const surfaceEdgeLD = createEgdes3d(
    pointsAB_DL,
    pointsCD_LD,
    pointsEF_LD,
    arrayColorsLD.toReversed()
  );

  const stateLF = cubeState.getCol('L', size - 1).slice(1, -1);
  let arrayColorsLF = [];
  stateLF.map(el => {
    arrayColorsLF.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateLF);
  // console.log(arrayColorsLF);

  const surfaceEdgeLF = createEgdes3d(
    pointsAB_FL,
    pointsCD_LF,
    pointsEF_LF,
    arrayColorsLF.toReversed()
  );

  const stateLB = cubeState.getCol('L', 0).slice(1, -1);
  let arrayColorsLB = [];
  stateLB.map(el => {
    arrayColorsLB.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateLB);
  // console.log(arrayColorsLB);

  const surfaceEdgeLB = createEgdes3d(
    pointsAB_LB,
    pointsCD_LB,
    pointsEF_LB,
    arrayColorsLB.toReversed()
  );

  const stateLUF = cubeState.getCell('L', 0, size - 1);
  const colorCornerLUF = getMaterialSurface(stateLUF.slice(0, 1));
  // console.log(stateLUF);

  const surfaceCornerLUF = createCorners3dBegin(
    pointsCornersAB_LU,
    pointsCornersCD_LU,
    pointsCornersEF_LU,
    colorCornerLUF
  );

  const stateLBU = cubeState.getCell('L', 0, 0);
  const colorCornerLBU = getMaterialSurface(stateLBU.slice(0, 1));
  // console.log(stateLBU);

  const surfaceCornerLBU = createCorners3dEnd(
    pointsCornersAB_LU,
    pointsCornersCD_LU,
    pointsCornersEF_LU,
    colorCornerLBU
  );

  const stateLFD = cubeState.getCell('L', size - 1, size - 1);
  const colorCornerLFD = getMaterialSurface(stateLFD.slice(0, 1));
  // console.log(stateLFD);

  const surfaceCornerLFD = createCorners3dBegin(
    pointsCornersAB_LD,
    pointsCornersCD_LD,
    pointsCornersEF_LD,
    colorCornerLFD
  );

  const stateLDB = cubeState.getCell('L', size - 1, 0);
  const colorCornerLDB = getMaterialSurface(stateLDB.slice(0, 1));
  // console.log(stateLDB);

  const surfaceCornerLDB = createCorners3dEnd(
    pointsCornersAB_LD,
    pointsCornersCD_LD,
    pointsCornersEF_LD,
    colorCornerLDB
  );

  // ==========================Surface Back=============================

  const stateBD = cubeState.getRow('B', size - 1).slice(1, -1);
  let arrayColorsBD = [];
  stateBD.map(el => {
    arrayColorsBD.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateBD);
  // console.log(arrayColorsBD);

  const surfaceEdgeBD = createEgdes3d(
    pointsAB_BD,
    pointsCD_BD,
    pointsEF_BD,
    arrayColorsBD.toReversed()
  );

  const stateBU = cubeState.getRow('B', 0).slice(1, -1);
  let arrayColorsBU = [];
  stateBU.map(el => {
    arrayColorsBU.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateBU);
  // console.log(arrayColorsBU);

  const surfaceEdgeBU = createEgdes3d(
    pointsAB_UB,
    pointsCD_BU,
    pointsEF_BU,
    arrayColorsBU.toReversed()
  );

  const stateBR = cubeState.getCol('B', 0).slice(1, -1);
  let arrayColorsBR = [];
  stateBR.map(el => {
    arrayColorsBR.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateBR);
  // console.log(arrayColorsBR);

  const surfaceEdgeBR = createEgdes3d(
    pointsAB_BR,
    pointsCD_BR,
    pointsEF_BR,
    arrayColorsBR.toReversed()
  );

  const stateBL = cubeState.getCol('B', size - 1).slice(1, -1);
  let arrayColorsBL = [];
  stateBL.map(el => {
    arrayColorsBL.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateBL);
  // console.log(arrayColorsBL);

  const surfaceEdgeBL = createEgdes3d(
    pointsAB_LB,
    pointsCD_BL,
    pointsEF_BL,
    arrayColorsBL.toReversed()
  );

  const stateBLD = cubeState.getCell('B', size - 1, size - 1);
  const colorCornerBLD = getMaterialSurface(stateBLD.slice(0, 1));
  console.log(stateBLD);

  const surfaceCornerBLD = createCorners3dBegin(
    pointsCornersAB_BD,
    pointsCornersCD_BD,
    pointsCornersEF_BD,
    colorCornerBLD
  );

  const stateBDR = cubeState.getCell('B', size - 1, 0);
  const colorCornerBDR = getMaterialSurface(stateBDR.slice(0, 1));
  // console.log(stateBDR);

  const surfaceCornerBDR = createCorners3dEnd(
    pointsCornersAB_BD,
    pointsCornersCD_BD,
    pointsCornersEF_BD,
    colorCornerBDR
  );

  const stateBUL = cubeState.getCell('B', 0, size - 1);
  const colorCornerBUL = getMaterialSurface(stateBUL.slice(0, 1));
  // console.log(stateBUL);

  const surfaceCornerBUL = createCorners3dBegin(
    pointsCornersAB_BU,
    pointsCornersCD_BU,
    pointsCornersEF_BU,
    colorCornerBUL
  );

  const stateBRU = cubeState.getCell('B', 0, 0);
  const colorCornerBRU = getMaterialSurface(stateBRU.slice(0, 1));
  // console.log(stateBRU);

  const surfaceCornerBRU = createCorners3dEnd(
    pointsCornersAB_BU,
    pointsCornersCD_BU,
    pointsCornersEF_BU,
    colorCornerBRU
  );
  // ==========================Surface Down=============================

  const stateDF = cubeState.getRow('D', 0).slice(1, -1);
  let arrayColorsDF = [];
  stateDF.map(el => {
    arrayColorsDF.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateDF);
  // console.log(arrayColorsDF);

  const surfaceEdgeDF = createEgdes3d(
    pointsAB_DF,
    pointsCD_DF,
    pointsEF_DF,
    arrayColorsDF
  );

  const stateDB = cubeState.getRow('D', size - 1).slice(1, -1);
  let arrayColorsDB = [];
  stateDB.map(el => {
    arrayColorsDB.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateDB);
  // console.log(arrayColorsDB);

  const surfaceEdgeDB = createEgdes3d(
    pointsAB_BD,
    pointsCD_DB,
    pointsEF_DB,
    arrayColorsDB
  );

  const stateDR = cubeState.getCol('D', size - 1).slice(1, -1);
  let arrayColorsDR = [];
  stateDR.map(el => {
    arrayColorsDR.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateDR);
  // console.log(arrayColorsDR);

  const surfaceEdgeDR = createEgdes3d(
    pointsAB_RD,
    pointsCD_DR,
    pointsEF_DR,
    arrayColorsDR
  );

  const stateDL = cubeState.getCol('D', 0).slice(1, -1);
  let arrayColorsDL = [];
  stateDL.map(el => {
    arrayColorsDL.push(getMaterialSurface(el.slice(0, 1)));
  });

  // console.log(stateDL);
  // console.log(arrayColorsDL);

  const surfaceEdgeDL = createEgdes3d(
    pointsAB_DL,
    pointsCD_DL,
    pointsEF_DL,
    arrayColorsDL
  );

  const stateDLF = cubeState.getCell('D', 0, 0);
  const colorCornerDLF = getMaterialSurface(stateDLF.slice(0, 1));
  // console.log(stateDLF);

  const surfaceCornerDLF = createCorners3dBegin(
    pointsCornersAB_DF,
    pointsCornersCD_DF,
    pointsCornersEF_DF,
    colorCornerDLF
  );

  const stateDFR = cubeState.getCell('D', 0, size - 1);
  const colorCornerDFR = getMaterialSurface(stateDFR.slice(0, 1));
  // console.log(stateDFR);

  const surfaceCornerDFR = createCorners3dEnd(
    pointsCornersAB_DF,
    pointsCornersCD_DF,
    pointsCornersEF_DF,
    colorCornerDFR
  );

  const stateDBL = cubeState.getCell('D', size - 1, 0);
  const colorCornerDBL = getMaterialSurface(stateDBL.slice(0, 1));
  // console.log(stateDBL);

  const surfaceCornerDBL = createCorners3dBegin(
    pointsCornersAB_DB,
    pointsCornersCD_DB,
    pointsCornersEF_DB,
    colorCornerDBL
  );

  const stateDRB = cubeState.getCell('D', size - 1, size - 1);
  const colorCornerDRB = getMaterialSurface(stateDRB.slice(0, 1));
  console.log(stateDRB);

  const surfaceCornerDRB = createCorners3dEnd(
    pointsCornersAB_DB,
    pointsCornersCD_DB,
    pointsCornersEF_DB,
    colorCornerDRB
  );
  // ========================== CommonEdges =============================
  const edgesRU = [];

  for (let i = 0; i < surfaceEdgeRU.length; i++) {
    edgesRU.push({
      parts: [surfaceEdgeRU[i], surfaceEdgeUR[i]],
      coord: {
        x: size,
        y: size,
        z: size - 1 - i,
      },
    });
  }

  const edgesRD = [];

  for (let i = 0; i < surfaceEdgeRD.length; i++) {
    edgesRD.push({
      parts: [surfaceEdgeRD[i], surfaceEdgeDR[i]],
      coord: {
        x: size,
        y: 1,
        z: size - 1 - i,
      },
    });
  }

  const edgesRB = [];

  for (let i = 0; i < surfaceEdgeRB.length; i++) {
    edgesRB.push({
      parts: [surfaceEdgeRB[i], surfaceEdgeBR[i]],

      coord: {
        x: size,
        y: i + 2,
        z: 1,
      },
    });
  }

  const edgesRF = [];

  for (let i = 0; i < surfaceEdgeRF.length; i++) {
    edgesRF.push({
      parts: [surfaceEdgeRF[i], surfaceEdgeFR[i]],

      coord: {
        x: size,
        y: i + 2,
        z: size,
      },
    });
  }

  const edgesUF = [];

  for (let i = 0; i < surfaceEdgeUF.length; i++) {
    edgesUF.push({
      parts: [surfaceEdgeUF[i], surfaceEdgeFU[i]],

      coord: {
        x: i + 2,
        y: size,
        z: size,
      },
    });
  }

  const edgesUL = [];

  for (let i = 0; i < surfaceEdgeUL.length; i++) {
    edgesUL.push({
      parts: [surfaceEdgeUL[i], surfaceEdgeLU[i]],

      coord: {
        x: 1,
        y: size,
        z: size - 1 - i,
      },
    });
  }

  const edgesUB = [];

  for (let i = 0; i < surfaceEdgeUB.length; i++) {
    edgesUB.push({
      parts: [surfaceEdgeUB[i], surfaceEdgeBU[i]],

      coord: {
        x: i + 2,
        y: size,
        z: 1,
      },
    });
  }

  const edgesFL = [];

  for (let i = 0; i < surfaceEdgeFL.length; i++) {
    edgesFL.push({
      parts: [surfaceEdgeFL[i], surfaceEdgeLF[i]],

      coord: {
        x: 1,
        y: i + 2,
        z: size,
      },
    });
  }

  const edgesFD = [];

  for (let i = 0; i < surfaceEdgeFD.length; i++) {
    edgesFD.push({
      parts: [surfaceEdgeFD[i], surfaceEdgeDF[i]],

      coord: {
        x: i + 2,
        y: 1,
        z: size,
      },
    });
  }

  const edgesLB = [];

  for (let i = 0; i < surfaceEdgeLB.length; i++) {
    edgesLB.push({
      parts: [surfaceEdgeLB[i], surfaceEdgeBL[i]],

      coord: {
        x: 1,
        y: i + 2,
        z: 1,
      },
    });
  }

  const edgesLD = [];

  for (let i = 0; i < surfaceEdgeLD.length; i++) {
    edgesLD.push({
      parts: [surfaceEdgeLD[i], surfaceEdgeDL[i]],

      coord: {
        x: 1,
        y: 1,
        z: size - 1 - i,
      },
    });
  }

  const edgesBD = [];

  for (let i = 0; i < surfaceEdgeBD.length; i++) {
    edgesBD.push({
      parts: [surfaceEdgeBD[i], surfaceEdgeDB[i]],

      coord: {
        x: i + 2,
        y: 1,
        z: 1,
      },
    });
  }

  // console.log(
  //   edgesFL.map((edge, i) => ({
  //     index: i,
  //     coord: edge.coord,
  //     RD: edge.parts[0],
  //     DR: edge.parts[1],
  //   }))
  // );

  const cornerRFU = {
    parts: [surfaceCornerRFU, surfaceCornerUFR, surfaceCornerFUR],

    coord: {
      x: size,
      y: size,
      z: size,
    },
  };

  const cornerRUB = {
    parts: [surfaceCornerRUB, surfaceCornerUBR, surfaceCornerBRU],

    coord: {
      x: size,
      y: size,
      z: 1,
    },
  };

  const cornerRDF = {
    parts: [surfaceCornerRDF, surfaceCornerDFR, surfaceCornerFRD],

    coord: {
      x: size,
      y: 1,
      z: size,
    },
  };

  const cornerRBD = {
    parts: [surfaceCornerRBD, surfaceCornerDRB, surfaceCornerBDR],

    coord: {
      x: size,
      y: 1,
      z: 1,
    },
  };

  const cornerUFL = {
    parts: [surfaceCornerLUF, surfaceCornerUFL, surfaceCornerFLU],

    coord: {
      x: 1,
      y: size,
      z: size,
    },
  };

  const cornerULB = {
    parts: [surfaceCornerLBU, surfaceCornerULB, surfaceCornerBUL],

    coord: {
      x: 1,
      y: size,
      z: 1,
    },
  };

  const cornerFDL = {
    parts: [surfaceCornerFDL, surfaceCornerLFD, surfaceCornerDLF],

    coord: {
      x: 1,
      y: 1,
      z: size,
    },
  };

  const cornerLDB = {
    parts: [surfaceCornerLDB, surfaceCornerDBL, surfaceCornerBLD],

    coord: {
      x: 1,
      y: 1,
      z: 1,
    },
  };
  // const rightCubies = cubies.filter(
  //   cubie =>
  //     cubie.x === size - 1 &&
  //     cubie.y > 0 &&
  //     cubie.y < size - 1 &&
  //     cubie.z > 0 &&
  //     cubie.z < size - 1
  // );
  // console.log('rightCubies', rightCubies);

  // ==================================================================

  // const stickerGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
  const stickerGeometry = new THREE.BoxGeometry(
    cubeSize * 0.9,
    cubeSize * 0.9,
    0.02
  );

  const createStickerMaterial = color =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.18,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
  const rightMaterial = createStickerMaterial(0xff0000);
  const upMaterial = createStickerMaterial(0xffffff);
  const frontMaterial = createStickerMaterial(0x00ff00);
  const leftMaterial = createStickerMaterial(0xffa500);
  const backMaterial = createStickerMaterial(0x0000ff);
  const downMaterial = createStickerMaterial(0xffff00);

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

  const cubeGroup = new THREE.Group();
  // scene.add(cubeGroup);
  cubeGroup.add(
    surfaceCornerRFU.left,
    surfaceCornerRFU.right,
    surfaceCornerRFU.outSurface,
    surfaceCornerRUB.left,
    surfaceCornerRUB.right,
    surfaceCornerRUB.outSurface,
    surfaceCornerRDF.left,
    surfaceCornerRDF.right,
    surfaceCornerRDF.outSurface,
    surfaceCornerRBD.left,
    surfaceCornerRBD.right,
    surfaceCornerRBD.outSurface,

    surfaceCornerUBR.left,
    surfaceCornerUBR.right,
    surfaceCornerUBR.outSurface,
    surfaceCornerUFR.left,
    surfaceCornerUFR.right,
    surfaceCornerUFR.outSurface,
    surfaceCornerFUR.left,
    surfaceCornerFUR.right,
    surfaceCornerFUR.outSurface,
    surfaceCornerFRD.left,
    surfaceCornerFRD.right,
    surfaceCornerFRD.outSurface,
    surfaceCornerBDR.left,
    surfaceCornerBDR.right,
    surfaceCornerBDR.outSurface,
    surfaceCornerBRU.left,
    surfaceCornerBRU.right,
    surfaceCornerBRU.outSurface,
    surfaceCornerDFR.left,
    surfaceCornerDFR.right,
    surfaceCornerDFR.outSurface,
    surfaceCornerDRB.left,
    surfaceCornerDRB.right,
    surfaceCornerDRB.outSurface,

    // ---------------------UP-----------------------------
    surfaceCornerULB.left,
    surfaceCornerULB.right,
    surfaceCornerULB.outSurface,
    surfaceCornerUFL.left,
    surfaceCornerUFL.right,
    surfaceCornerUFL.outSurface,

    surfaceCornerFLU.left,
    surfaceCornerFLU.right,
    surfaceCornerFLU.outSurface,
    surfaceCornerBUL.left,
    surfaceCornerBUL.right,
    surfaceCornerBUL.outSurface,
    surfaceCornerLUF.left,
    surfaceCornerLUF.right,
    surfaceCornerLUF.outSurface,
    surfaceCornerLBU.left,
    surfaceCornerLBU.right,
    surfaceCornerLBU.outSurface,

    // ---------------------Front-----------------------------

    surfaceCornerFDL.left,
    surfaceCornerFDL.right,
    surfaceCornerFDL.outSurface,
    surfaceCornerDLF.left,
    surfaceCornerDLF.right,
    surfaceCornerDLF.outSurface,
    surfaceCornerLFD.left,
    surfaceCornerLFD.right,
    surfaceCornerLFD.outSurface,

    // ---------------------Left-----------------------------
    surfaceCornerLDB.left,
    surfaceCornerLDB.right,
    surfaceCornerLDB.outSurface,
    surfaceCornerDBL.left,
    surfaceCornerDBL.right,
    surfaceCornerDBL.outSurface,
    surfaceCornerBLD.left,
    surfaceCornerBLD.right,
    surfaceCornerBLD.outSurface
  );
  // -------------------------Right---------------------------------
  surfaceEdgeRU.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeRD.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeRF.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeRB.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeUR.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeFR.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeBR.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeDR.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  // -------------------------------UP---------------------------------

  surfaceEdgeUB.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeUF.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeUL.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeFU.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeLU.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeBU.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  // =------------------------------Front-------------------------------------
  surfaceEdgeLF.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeFL.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeDF.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeFD.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  // ---------------------------Left---------------------------
  surfaceEdgeBL.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeDL.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  surfaceEdgeLB.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeLD.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  // ---------------------------Back---------------------------

  surfaceEdgeBD.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });
  surfaceEdgeDB.forEach(edge => {
    cubeGroup.add(edge.left, edge.right, edge.down, edge.outSurface);
  });

  const bodyMaterials = {
    U: new THREE.MeshStandardMaterial({ color: 0xffffff }),
    D: new THREE.MeshStandardMaterial({ color: 0xffff00 }),
    R: new THREE.MeshStandardMaterial({ color: 0xff0000 }),
    L: new THREE.MeshStandardMaterial({ color: 0xff8800 }),
    F: new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
    B: new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  };

  // function getBodyMaterial(cubie) {
  //   if (cubie.x === size - 1) return bodyMaterials.R;
  //   if (cubie.x === 0) return bodyMaterials.L;
  //   if (cubie.y === size - 1) return bodyMaterials.U;
  //   if (cubie.y === 0) return bodyMaterials.D;
  //   if (cubie.z === size - 1) return bodyMaterials.F;
  //   if (cubie.z === 0) return bodyMaterials.B;

  //   return bodyMaterial;
  // }

  cubies.forEach(cubie => {
    const px = (cubie.x - (size - 1) / 2) * cellSize;
    const py = (cubie.y - (size - 1) / 2) * cellSize;
    const pz = (cubie.z - (size - 1) / 2) * cellSize;

    const mesh = new THREE.Mesh(geometry, bodyMaterial);
    // const mesh = new THREE.Mesh(geometry, getBodyMaterial(cubie));
    mesh.position.set(px, py, pz);
    cubie.mesh = mesh;

    // ====================
    // RIGHT
    // ====================

    if (cubie.x === size - 1) {
      // console.log(mesh);
      const sphereX =
        sphereCenterX + Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);
      const bulgeOffset = sphereX - cornerSphereX;

      mesh.position.x = px + cornerExpand * faceOffsetFactor + bulgeOffset;

      const isEdgeOrCorner =
        (cubie.y === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
        (cubie.y === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
        (cubie.z === 0 && cubie.y > 0 && cubie.y < size - 1) ||
        (cubie.z === size - 1 && cubie.y > 0 && cubie.y < size - 1);
      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }
    if (cubie.x === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell(
        'R',
        size - 1 - cubie.y,
        size - 1 - cubie.z
      );
      // const material = getMaterial(value[0][0]).clone();
      // material.color.multiplyScalar(0.4);
      // mesh.material = material;
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, rightMaterial);
      sticker.position.set(
        mesh.position.x + cubeSize / 2,
        mesh.position.y,
        mesh.position.z
      );
      sticker.rotation.set(0, Math.PI / 2, 0);
      cubie.sticker = sticker;
      cubeGroup.add(sticker);
      cubeGroup.add(cubie.mesh);
    }
    edgesAndCornersCubies = [];

    // ====================
    // UP
    // ====================
    if (cubie.y === size - 1) {
      const sphereY =
        sphereCenterY + Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
      const bulgeOffsetY = sphereY - cornerSphereY;
      mesh.position.y = py + cornerExpand * faceOffsetFactor + bulgeOffsetY;
      const isEdgeOrCorner =
        (cubie.x === size - 1 && cubie.z >= 0 && cubie.z <= size - 1) ||
        (cubie.x === 0 && cubie.z >= 0 && cubie.z <= size - 1) ||
        (cubie.z === 0 && cubie.x > 0 && cubie.x < size - 1) ||
        (cubie.z === size - 1 && cubie.x > 0 && cubie.x < size - 1);
      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }
    if (cubie.y === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell('U', cubie.z, cubie.x);
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, upMaterial);
      sticker.position.set(
        mesh.position.x,
        mesh.position.y + cubeSize / 2,
        mesh.position.z
      );

      sticker.rotation.set(-Math.PI / 2, 0, 0);
      cubie.sticker = sticker;
      cubeGroup.add(sticker);
      cubeGroup.add(cubie.mesh);
    }
    edgesAndCornersCubies = [];

    // ====================
    // FRONT
    // ====================

    if (cubie.z === size - 1) {
      const sphereZ =
        sphereCenterZ + Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);

      const bulgeOffset = sphereZ - cornerSphereZ;

      mesh.position.z = pz + cornerExpand * faceOffsetFactor + bulgeOffset;

      const isEdgeOrCorner =
        cubie.x === size - 1 ||
        cubie.x === 0 ||
        cubie.y === 0 ||
        cubie.y === size - 1;

      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }

    if (cubie.z === size - 1 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell('F', size - 1 - cubie.y, cubie.x);
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, frontMaterial);

      sticker.position.set(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z + cubeSize / 2
      );

      sticker.rotation.set(0, 0, 0);
      cubie.sticker = sticker;
      cubeGroup.add(cubie.mesh);
      cubeGroup.add(sticker);
    }

    edgesAndCornersCubies = [];
    // ====================
    // LEFT
    // ====================

    if (cubie.x === 0) {
      const sphereX =
        sphereCenterXLeft - Math.sqrt(bulgeRadius ** 2 - py ** 2 - pz ** 2);

      const bulgeOffsetX = sphereX - cornerSphereXLeft;

      mesh.position.x = px - cornerExpand * faceOffsetFactor + bulgeOffsetX;

      const isEdgeOrCorner =
        cubie.y === size - 1 ||
        cubie.y === 0 ||
        cubie.z === 0 ||
        cubie.z === size - 1;

      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }

    if (cubie.x === 0 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell('L', size - 1 - cubie.y, cubie.z);
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, leftMaterial);

      sticker.position.set(
        mesh.position.x - cubeSize / 2,
        mesh.position.y,
        mesh.position.z
      );

      sticker.rotation.set(0, -Math.PI / 2, 0);

      cubie.sticker = sticker;

      cubeGroup.add(sticker);
      cubeGroup.add(cubie.mesh);
    }

    edgesAndCornersCubies = [];
    // ====================
    // DOWN
    // ====================

    if (cubie.y === 0) {
      const sphereY =
        sphereCenterYBottom - Math.sqrt(bulgeRadius ** 2 - px ** 2 - pz ** 2);
      const bulgeOffsetY = sphereY - cornerSphereYBottom;
      mesh.position.y = py - cornerExpand * faceOffsetFactor + bulgeOffsetY;
      const isEdgeOrCorner =
        cubie.x === size - 1 ||
        cubie.x === 0 ||
        cubie.z === 0 ||
        cubie.z === size - 1;

      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }

    if (cubie.y === 0 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell('D', size - 1 - cubie.z, cubie.x);
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, downMaterial);
      sticker.position.set(
        mesh.position.x,
        mesh.position.y - cubeSize / 2,
        mesh.position.z
      );
      sticker.rotation.set(Math.PI / 2, 0, 0);
      cubie.sticker = sticker;
      cubeGroup.add(sticker);
      cubeGroup.add(cubie.mesh);
    }

    edgesAndCornersCubies = [];
    // ====================
    // BACK
    // ====================

    if (cubie.z === 0) {
      const sphereZ =
        sphereCenterZBack - Math.sqrt(bulgeRadius ** 2 - px ** 2 - py ** 2);
      const bulgeOffsetZ = sphereZ - cornerSphereZBack;
      mesh.position.z = pz - cornerExpand * faceOffsetFactor + bulgeOffsetZ;
      const isEdgeOrCorner =
        cubie.x === size - 1 ||
        cubie.x === 0 ||
        cubie.y === 0 ||
        cubie.y === size - 1;

      if (isEdgeOrCorner) {
        edgesAndCornersCubies.push(cubie);
      }
    }

    if (cubie.z === 0 && !edgesAndCornersCubies.includes(cubie)) {
      const value = cubeState.getCell(
        'B',
        size - 1 - cubie.y,
        size - 1 - cubie.x
      );
      mesh.material = getMaterial(value[0][0]);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
      // const sticker = new THREE.Mesh(stickerGeometry, backMaterial);

      sticker.position.set(
        mesh.position.x,
        mesh.position.y,
        mesh.position.z - cubeSize / 2
      );
      sticker.rotation.set(0, Math.PI, 0);
      cubie.sticker = sticker;
      cubeGroup.add(sticker);
      cubeGroup.add(cubie.mesh);
    }

    edgesAndCornersCubies = [];
  });

  // // ====================
  // // CAMERA
  // // ====================

  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // camera.position.set(15, 15, 15);
  // camera.lookAt(0, 0, 0);

  // // ====================
  // // RENDERER
  // // ====================

  // const renderer = new THREE.WebGLRenderer({
  //   antialias: true,
  // });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // // ====================
  // // LIGHT
  // // ====================

  // scene.add(new THREE.AmbientLight(0xffffff, 2));

  // const light = new THREE.DirectionalLight(0xffffff, 2);
  // light.position.set(100, 100, 100);
  // scene.add(light);

  // // ====================
  // // CONTROLS
  // // ====================

  // const controls = new OrbitControls(camera, renderer.domElement);

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.08;
  // controls.enablePan = false;
  // controls.minDistance = 0;
  // controls.maxDistance = 40;

  // // ====================
  // // ANIMATION
  // // ====================

  // function animate() {
  //   requestAnimationFrame(animate);
  //   controls.update();
  //   renderer.render(scene, camera);
  // }

  // animate();

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
  //  colorSF = 0x808080;
  function createSurface(pointsAB, pointsCD, colorSF = 0x111111) {
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

    // const material = new THREE.MeshStandardMaterial({
    //   color: colorSF,

    //   side: THREE.DoubleSide,
    // });
    const material = new THREE.MeshStandardMaterial({
      color: colorSF,
      roughness: 0.18,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    // groupSF.add(mesh);
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

  // rightGroup.rotation.y += 0.5;
  // console.log('cubies:', cubies.length);
  // console.log(cubies.filter(cubie => cubie.x === 5));

  // console.log(cubies.filter(cubie => cubie.x === 5).map(cubie => cubie.mesh));
  //
  //

  // ==================================================================
  const rightPieces = cubies
    .filter(
      cubie =>
        cubie.x === size - 1 &&
        cubie.y > 0 &&
        cubie.y < size - 1 &&
        cubie.z > 0 &&
        cubie.z < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));

  const upPieces = cubies
    .filter(
      cubie =>
        cubie.y === size - 1 &&
        cubie.x > 0 &&
        cubie.x < size - 1 &&
        cubie.z > 0 &&
        cubie.z < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));
  const frontPieces = cubies
    .filter(
      cubie =>
        cubie.z === size - 1 &&
        cubie.x > 0 &&
        cubie.x < size - 1 &&
        cubie.y > 0 &&
        cubie.y < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));

  const leftPieces = cubies
    .filter(
      cubie =>
        cubie.x === 0 &&
        cubie.y > 0 &&
        cubie.y < size - 1 &&
        cubie.z > 0 &&
        cubie.z < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));

  const downPieces = cubies
    .filter(
      cubie =>
        cubie.y === 0 &&
        cubie.x > 0 &&
        cubie.x < size - 1 &&
        cubie.z > 0 &&
        cubie.z < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));

  const backPieces = cubies
    .filter(
      cubie =>
        cubie.z === 0 &&
        cubie.x > 0 &&
        cubie.x < size - 1 &&
        cubie.y > 0 &&
        cubie.y < size - 1
    )
    .map(cubie => ({
      cubie,
      coord: {
        x: cubie.x + 1,
        y: cubie.y + 1,
        z: cubie.z + 1,
      },
    }));
  // console.log('upPieces', upPieces);
  // console.log('rightCubies', rightCubies);
  rightPieces.push(...edgesRU);
  rightPieces.push(...edgesRF);
  rightPieces.push(...edgesRD);
  rightPieces.push(...edgesRB);

  rightPieces.push(cornerRFU, cornerRUB, cornerRDF, cornerRBD);

  upPieces.push(...edgesUB);
  upPieces.push(...edgesUF);
  upPieces.push(...edgesUL);

  upPieces.push(cornerUFL, cornerULB);

  frontPieces.push(...edgesFL);
  frontPieces.push(...edgesFD);

  frontPieces.push(cornerFDL);

  leftPieces.push(...edgesLB);
  leftPieces.push(...edgesLD);

  leftPieces.push(cornerLDB);

  backPieces.push(...edgesBD);

  const cubePieces = [];
  cubePieces.push(
    ...rightPieces,
    ...upPieces,
    ...frontPieces,
    ...leftPieces,
    ...backPieces,
    ...downPieces
  );
  console.log('rightPieces', rightPieces);
  // console.log('cubePieces', cubePieces);

  function getArcPointForZ(z, sphereCenter, startP) {
    const start = startP.clone().sub(sphereCenter);
    // положение по Z относительно центра
    const zLocal = z - sphereCenter.z;
    // расстояние от центра до точки в плоскости XY
    const xyRadius = Math.sqrt(bulgeRadius ** 2 - zLocal ** 2);
    // направление от центра в сторону RUF/RUB
    const startXY = new THREE.Vector2(start.x, start.y).normalize();
    // для нашей дуги выбираем соответствующее направление
    const direction = startXY;
    return new THREE.Vector3(
      sphereCenter.x + direction.x * xyRadius,
      sphereCenter.y + direction.y * xyRadius,
      z
    );
  }

  function getArcPointsZ(start, count, sphereCenter) {
    const points = [];

    let startZ = start.z - cornerSize - gap / 2;
    for (let i = 0; i < count; i++) {
      const z =
        startZ - Math.floor(i / 2) * (cubeSize + gap) - (i % 2) * cubeSize;
      points.push(getArcPointForZ(z, sphereCenter, start));
    }
    return points;
  }

  return {
    cubeGroup,
    cubePieces,
  };

  function getArcPointForY(y, sphereCenter, startP) {
    const start = startP.clone().sub(sphereCenter);
    const yLocal = y - sphereCenter.y;
    const xzRadius = Math.sqrt(bulgeRadius ** 2 - yLocal ** 2);
    const startXZ = new THREE.Vector2(start.x, start.z).normalize();
    const direction = startXZ;
    return new THREE.Vector3(
      sphereCenter.x + direction.x * xzRadius,
      y,
      sphereCenter.z + direction.y * xzRadius
    );
  }

  function getArcPointsY(start, count, sphereCenter, direction = 1) {
    const points = [];

    let startY = start.y - cornerSize - gap / 2;
    for (let i = 0; i < count; i++) {
      const offset = Math.floor(i / 2) * (cubeSize + gap) + (i % 2) * cubeSize;
      const y = direction * (startY - offset);
      points.push(getArcPointForY(y, sphereCenter, start));
    }

    return points;
  }

  function getArcPointForX(x, sphereCenter, startP) {
    const start = startP.clone().sub(sphereCenter);
    const xLocal = x - sphereCenter.x;
    const yzRadius = Math.sqrt(bulgeRadius ** 2 - xLocal ** 2);
    const startYZ = new THREE.Vector2(start.y, start.z).normalize();
    const direction = startYZ;
    return new THREE.Vector3(
      x,
      sphereCenter.y + direction.x * yzRadius,
      sphereCenter.z + direction.y * yzRadius
    );
  }

  function getArcPointsX(start, count, sphereCenter, direction = 1) {
    const points = [];
    let startX = start.x - cornerSize - gap / 2;
    for (let i = 0; i < count; i++) {
      const offset = Math.floor(i / 2) * (cubeSize + gap) + (i % 2) * cubeSize;
      const x = direction * (startX - offset);
      points.push(getArcPointForX(x, sphereCenter, start));
    }

    return points;
  }
}
