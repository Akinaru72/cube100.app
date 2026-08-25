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
  const arrayB = arrB.toReversed();
  const pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: arrA[i], z: -arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoUB(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrayB[i], y: arrC[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_UB = convertEFtoUB(pointsB, pointsC);
// console.log('pointsEF_UB', pointsEF_UB);

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

function convertCornersEFtoUB(coordB_CD) {
  const pointsCornersEF = [
    { x: -coordB_CD, y: coordB_CD, z: -coordB_CD },
    { x: coordB_CD, y: coordB_CD, z: -coordB_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_UB = convertCornersEFtoUB(cornerB_CD);
// console.log('pointsCornersEF_UB', pointsCornersEF_UB);

function convertCDtoUF(arrA, arrB, arrC) {
  let arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: arrA[i], z: arrC[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoUF(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrayB[i], y: arrC[i], z: arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_UF = convertEFtoUF(pointsB, pointsC);
// console.log('pointsEF_UF', pointsEF_UF);

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

function convertCornersEFtoUF(coordB_CD) {
  const pointsCornersEF = [
    { x: -coordB_CD, y: coordB_CD, z: coordB_CD },
    { x: coordB_CD, y: coordB_CD, z: coordB_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_UF = convertCornersEFtoUF(cornerB_CD);
// console.log('pointsCornersEF_UF', pointsCornersEF_UF);

function convertCDtoUR(arrA, arrB, arrC) {
  // let arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: arrA[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoUR(arrB, arrC) {
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrC[i], y: arrC[i], z: arrB[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_UR = convertEFtoUR(pointsB, pointsC);
// console.log('pointsEF_UR', pointsEF_UR);

function convertCDtoUL(arrA, arrB, arrC) {
  // let arrayB = arrB.reverse();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: arrA[i], z: arrB[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoUL(arrB, arrC) {
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: -arrC[i], y: arrC[i], z: arrB[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_UL = convertEFtoUL(pointsB, pointsC);
// console.log('pointsEF_UL', pointsEF_UL);

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_UB = convertCDtoUB(pointsA, pointsB, pointsC);
export const pointsCD_UF = convertCDtoUF(pointsA, pointsB, pointsC);
export const pointsCD_UR = convertCDtoUR(pointsA, pointsB, pointsC);
export const pointsCD_UL = convertCDtoUL(pointsA, pointsB, pointsC);
// console.log('pointsCD_UB', pointsCD_UB);
// console.log('pointsCD_UF', pointsCD_UF);
// console.log('pointsCD_UR', pointsCD_UR);
// console.log('pointsCD_UL', pointsCD_UL);
