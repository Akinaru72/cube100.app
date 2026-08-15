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

function convertCDtoFU(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: arrC[i], z: arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoFU(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
    { x: -coordC_CD, y: coordAB, z: coordAB },
    { x: coordC_CD, y: coordAB, z: coordAB },
    { x: fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_FU = convertCornersABtoFU(cornerC_CD, cornerAB);
console.log('pointsCornersAB_FU', pointsCornersAB_FU);

function convertCornersCDtoFU(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: coordC_CD, z: coordAB },
    { x: -coordB_CD, y: coordC_CD, z: coordA_CD },
    { x: coordB_CD, y: coordC_CD, z: coordA_CD },
    { x: coordAB, y: coordC_CD, z: coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_FU = convertCornersCDtoFU(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
console.log('pointsCornersCD_FU', pointsCornersCD_FU);

function convertCDtoFD(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: -arrC[i], z: arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoFD(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    { x: -coordC_CD, y: -coordAB, z: coordAB },
    { x: coordC_CD, y: -coordAB, z: coordAB },
    { x: fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_FD = convertCornersABtoFD(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_FD', pointsCornersAB_FD);

function convertCornersCDtoFD(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: -coordC_CD, z: coordAB },
    { x: -coordB_CD, y: -coordC_CD, z: coordA_CD },
    { x: coordB_CD, y: -coordC_CD, z: coordA_CD },
    { x: coordAB, y: -coordC_CD, z: coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_FD = convertCornersCDtoFD(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_FD', pointsCornersCD_FD);

function convertCDtoFR(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: arrB[i], z: arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoFL(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: arrB[i], z: arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_FU = convertCDtoFU(pointsA, pointsB, pointsC);
export const pointsCD_FD = convertCDtoFD(pointsA, pointsB, pointsC);
export const pointsCD_FR = convertCDtoFR(pointsA, pointsB, pointsC);
export const pointsCD_FL = convertCDtoFL(pointsA, pointsB, pointsC);
// console.log('pointsCD_FL', pointsCD_FL);
