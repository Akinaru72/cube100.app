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

function convertCDtoRU(arrA, arrB, arrC) {
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrC[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoRU(arrA, arrB, arrC) {
  const pointsEF = [];
  for (let i = 0; i < arrA.length; i++) {
    const Obj = { x: arrC[i], y: arrC[i], z: arrB[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_RU = convertEFtoRU(pointsA, pointsB, pointsC);
// console.log('pointsEF_RU', pointsEF_RU);

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

function convertCornersEFtoRU(coordA_CD, coordB_CD, coordC_CD) {
  const pointsCornersEF = [
    // { x: coordB_CD, y: coordB_CD, z: coordA_CD },
    { x: coordB_CD, y: coordB_CD, z: coordC_CD },
    { x: coordB_CD, y: coordB_CD, z: -coordC_CD },
    // { x: coordB_CD, y: coordB_CD, z: -coordA_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_RU = convertCornersEFtoRU(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD
);
// console.log('pointsCornersEF_RU', pointsCornersEF_RU);

function convertCDtoRD(arrA, arrB, arrC) {
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: -arrC[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoRD(arrA, arrB, arrC) {
  const pointsEF = [];
  for (let i = 0; i < arrA.length; i++) {
    const Obj = { x: arrC[i], y: -arrC[i], z: arrB[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_RD = convertEFtoRD(pointsA, pointsB, pointsC);
// console.log('pointsEF_RD', pointsEF_RD);

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

function convertCornersEFtoRD(coordA_CD, coordB_CD, coordC_CD) {
  const pointsCornersEF = [
    // { x: coordB_CD, y: -coordB_CD, z: coordA_CD },
    { x: coordB_CD, y: -coordB_CD, z: coordC_CD },
    { x: coordB_CD, y: -coordB_CD, z: -coordC_CD },
    // { x: coordB_CD, y: -coordB_CD, z: -coordA_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_RD = convertCornersEFtoRD(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD
);
// console.log('pointsCornersEF_RD', pointsCornersEF_RD);

function convertCDtoRF(arrA, arrB, arrC) {
  const arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrayB[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoRF(arrA, arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrA.length; i++) {
    const Obj = { x: arrC[i], y: arrayB[i], z: arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_RF = convertEFtoRF(pointsA, pointsB, pointsC);
// console.log('pointsEF_RF', pointsEF_RF);

function convertCDtoRB(arrA, arrB, arrC) {
  let arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrA[i], y: arrayB[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}
function convertEFtoRB(arrA, arrB, arrC) {
  let arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrA.length; i++) {
    const Obj = { x: arrC[i], y: arrayB[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_RB = convertEFtoRB(pointsA, pointsB, pointsC);
// console.log('pointsEF_RB', pointsEF_RB);

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_RF = convertCDtoRF(pointsA, pointsB, pointsC);
export const pointsCD_RB = convertCDtoRB(pointsA, pointsB, pointsC);
export const pointsCD_RU = convertCDtoRU(pointsA, pointsB, pointsC);
export const pointsCD_RD = convertCDtoRD(pointsA, pointsB, pointsC);
// console.log('pointsCD_RF', pointsCD_RF);
// console.log('pointsCD_RB', pointsCD_RB);
// console.log('pointsCD_RU', pointsCD_RU);
// console.log('pointsCD_RD', pointsCD_RD);
