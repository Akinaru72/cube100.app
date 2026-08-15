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

function convertCDtoDF(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: -arrA[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoDF(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    { x: -coordC_CD, y: -coordAB, z: coordAB },
    { x: coordC_CD, y: -coordAB, z: coordAB },
    { x: fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_DF = convertCornersABtoDF(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_DF', pointsCornersAB_DF);

function convertCornersCDtoDF(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: -coordAB, z: coordC_CD },
    { x: -coordB_CD, y: -coordA_CD, z: coordC_CD },
    { x: coordB_CD, y: -coordA_CD, z: coordC_CD },
    { x: coordAB, y: -coordAB, z: coordC_CD },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_DF = convertCornersCDtoDF(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_DF', pointsCornersCD_DF);

function convertCDtoDB(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: -arrA[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoDB(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
    { x: -coordC_CD, y: -coordAB, z: -coordAB },
    { x: coordC_CD, y: -coordAB, z: -coordAB },
    { x: fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_DB = convertCornersABtoDB(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_DB', pointsCornersAB_DB);

function convertCornersCDtoDB(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: -coordAB, z: -coordB_CD },
    { x: -coordB_CD, y: -coordA_CD, z: -coordC_CD },
    { x: coordB_CD, y: -coordA_CD, z: -coordC_CD },
    { x: coordAB, y: -coordAB, z: -coordB_CD },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_DB = convertCornersCDtoDB(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_DB', pointsCornersCD_DB);

function convertCDtoDR(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: -arrA[i], z: arrayB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoDL(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: -arrA[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_DF = convertCDtoDF(pointsA, pointsB, pointsC);
export const pointsCD_DB = convertCDtoDB(pointsA, pointsB, pointsC);
export const pointsCD_DR = convertCDtoDR(pointsA, pointsB, pointsC);
export const pointsCD_DL = convertCDtoDL(pointsA, pointsB, pointsC);
// console.log('pointsCD_DL', pointsCD_DL);
