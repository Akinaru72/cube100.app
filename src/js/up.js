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

function convertCDtoUB(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: arrA[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoUB(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
    { x: -coordC_CD, y: coordAB, z: -coordAB },
    { x: coordC_CD, y: coordAB, z: -coordAB },
    { x: fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_UB = convertCornersABtoUB(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_UB', pointsCornersAB_UB);

function convertCornersCDtoUB(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: coordAB, z: -coordC_CD },
    { x: -coordB_CD, y: coordA_CD, z: -coordC_CD },
    { x: coordB_CD, y: coordA_CD, z: -coordC_CD },
    { x: coordAB, y: coordAB, z: -coordC_CD },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_UB = convertCornersCDtoUB(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_UB', pointsCornersCD_UB);

function convertCDtoUF(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrB[i], y: arrA[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoUF(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
    { x: -coordC_CD, y: coordAB, z: coordAB },
    { x: coordC_CD, y: coordAB, z: coordAB },
    { x: fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_UF = convertCornersABtoUF(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_UF', pointsCornersAB_UF);

function convertCornersCDtoUF(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: coordAB, z: coordB_CD },
    { x: -coordB_CD, y: coordA_CD, z: coordC_CD },
    { x: coordB_CD, y: coordA_CD, z: coordC_CD },
    { x: coordAB, y: coordAB, z: coordB_CD },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_UF = convertCornersCDtoUF(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_UF', pointsCornersCD_UF);

function convertCDtoUR(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: arrA[i], z: arrayB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoUL(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: arrA[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_UB = convertCDtoUB(pointsA, pointsB, pointsC);
export const pointsCD_UF = convertCDtoUF(pointsA, pointsB, pointsC);
export const pointsCD_UR = convertCDtoUR(pointsA, pointsB, pointsC);
export const pointsCD_UL = convertCDtoUL(pointsA, pointsB, pointsC);
// console.log('pointsCD_UL', pointsCD_UL);
