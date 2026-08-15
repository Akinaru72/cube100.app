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

function convertCDtoLU(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrA[i], y: arrC[i], z: arrayB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoLU(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
    { x: -coordAB, y: coordAB, z: coordC_CD },
    { x: -coordAB, y: coordAB, z: -coordC_CD },
    { x: -fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_LU = convertCornersABtoLU(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_LU', pointsCornersAB_LU);

function convertCornersCDtoLU(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: coordC_CD, z: coordAB },
    { x: -coordA_CD, y: coordC_CD, z: coordB_CD },
    { x: -coordA_CD, y: coordC_CD, z: -coordB_CD },
    { x: -coordAB, y: coordC_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_LU = convertCornersCDtoLU(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
// console.log('pointsCornersCD_LU', pointsCornersCD_LU);

function convertCDtoLD(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrA[i], y: -arrC[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCornersABtoLD(coordC_CD, coordAB) {
  const pointsCornersAB = [
    { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    { x: -coordAB, y: -coordAB, z: coordC_CD },
    { x: -coordAB, y: -coordAB, z: -coordC_CD },
    { x: -fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
  ];
  return pointsCornersAB;
}
export const pointsCornersAB_LD = convertCornersABtoLD(cornerC_CD, cornerAB);
// console.log('pointsCornersAB_LD', pointsCornersAB_LD);

function convertCornersCDtoLD(coordA_CD, coordB_CD, coordC_CD, coordAB) {
  const pointsCornersCD = [
    { x: -coordAB, y: -coordC_CD, z: coordAB },
    { x: -coordA_CD, y: -coordC_CD, z: coordB_CD },
    { x: -coordA_CD, y: -coordC_CD, z: -coordB_CD },
    { x: -coordAB, y: -coordC_CD, z: -coordAB },
  ];
  return pointsCornersCD;
}
export const pointsCornersCD_LD = convertCornersCDtoLD(
  cornerA_CD,
  cornerB_CD,
  cornerC_CD,
  cornerAB
);
console.log('pointsCornersCD_LD', pointsCornersCD_LD);

function convertCDtoLF(arrA, arrB, arrC) {
  let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrA[i], y: arrayB[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertCDtoLB(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrA[i], y: arrB[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

// console.log(pointsA, pointsB, pointsC);

export const pointsCD_LU = convertCDtoLU(pointsA, pointsB, pointsC);
export const pointsCD_LD = convertCDtoLD(pointsA, pointsB, pointsC);
export const pointsCD_LF = convertCDtoLF(pointsA, pointsB, pointsC);
export const pointsCD_LB = convertCDtoLB(pointsA, pointsB, pointsC);
console.log('pointsCD_LB', pointsCD_LB);
