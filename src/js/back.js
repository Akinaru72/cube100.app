import {
  pointsA,
  pointsB,
  pointsC,
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB,
  fullsize,
} from './constants.js';

function convertCDtoBD(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: -arrC[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoBD(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
    { x: -coordC_CD, y: -coordAB, z: -coordAB },
    { x: coordC_CD, y: -coordAB, z: -coordAB },
    { x: fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_BD = convertCornersABtoBD(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_BD', pointsCornersAB_BD);

function convertCornersCDtoBD(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: -coordC_CD, z: -coordAB },
    { x: -coordB_CD, y: -coordC_CD, z: -coordA_CD },
    { x: coordB_CD, y: -coordC_CD, z: -coordA_CD },
    { x: coordAB, y: -coordC_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_BD = convertCornersCDtoBD(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_BD', pointsCornersCD_BD);

function convertCDtoBU(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: arrC[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoBU(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
    { x: -coordC_CD, y: coordAB, z: -coordAB },
    { x: coordC_CD, y: coordAB, z: -coordAB },
    { x: fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_BU = convertCornersABtoBU(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_BU', pointsCornersAB_BU);

function convertCornersCDtoBU(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: coordB_CD, z: -coordAB },
    { x: -coordB_CD, y: coordC_CD, z: -coordA_CD },
    { x: coordB_CD, y: coordC_CD, z: -coordA_CD },
    { x: coordAB, y: coordB_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_BU = convertCornersCDtoBU(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_BU', pointsCornersCD_BU);

function convertCDtoBR(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: arrB[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoBL(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: arrB[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_BD = convertCDtoBD(pointsA, pointsB, pointsC);
export const pointsCD_BU = convertCDtoBU(pointsA, pointsB, pointsC);
export const pointsCD_BR = convertCDtoBR(pointsA, pointsB, pointsC);
export const pointsCD_BL = convertCDtoBL(pointsA, pointsB, pointsC);
// console.log('pointsCD_BL', pointsCD_BL);
