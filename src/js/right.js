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

function convertCornersABtoRU(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
    { x: coordAB, y: coordAB, z: coordC_CD },
    { x: coordAB, y: coordAB, z: -coordC_CD },
    { x: fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_RU = convertCornersABtoRU(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_RU', pointsCornersAB_RU);

function convertCornersCDtoRU(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: coordAB, y: coordB_CD, z: coordAB },
    { x: coordA_CD, y: coordB_CD, z: coordC_CD },
    { x: coordA_CD, y: coordB_CD, z: -coordC_CD },
    { x: coordAB, y: coordB_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_RU = convertCornersCDtoRU(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_RU', pointsCornersCD_RU);

function convertCornersABtoRD(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    { x: coordAB, y: -coordAB, z: coordC_CD },
    { x: coordAB, y: -coordAB, z: -coordC_CD },
    { x: fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_RD = convertCornersABtoRD(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_RD', pointsCornersAB_RD);

function convertCornersCDtoRD(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: coordAB, y: -coordB_CD, z: coordAB },
    { x: coordA_CD, y: -coordB_CD, z: coordC_CD },
    { x: coordA_CD, y: -coordB_CD, z: -coordC_CD },
    { x: coordAB, y: -coordB_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_RD = convertCornersCDtoRD(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_RD', pointsCornersCD_RD);

function convertCDtoRF(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrayB[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoRB(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrB[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoRU(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrC[i], z: arrayB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoRD(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: -arrC[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_RF = convertCDtoRF(pointsA, pointsB, pointsC);
export const pointsCD_RB = convertCDtoRB(pointsA, pointsB, pointsC);
export const pointsCD_RU = convertCDtoRU(pointsA, pointsB, pointsC);
export const pointsCD_RD = convertCDtoRD(pointsA, pointsB, pointsC);
// console.log('pointsCD_RU', pointsCD_RU);
