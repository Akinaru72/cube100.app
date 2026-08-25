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
  const arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: -arrC[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoBD(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrayB[i], y: -arrC[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_BD = convertEFtoBD(pointsB, pointsC);
// console.log('pointsEF_BD', pointsEF_BD);

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

function convertCornersEFtoBD(coordB_CD) {
  const pointsCornersEF = [
    { x: -coordB_CD, y: -coordB_CD, z: -coordB_CD },
    { x: coordB_CD, y: -coordB_CD, z: -coordB_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_BD = convertCornersEFtoBD(cornerB_CD);
// console.log('pointsCornersEF_BD', pointsCornersEF_BD);

function convertCDtoBU(arrA, arrB, arrC) {
  const arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrayB[i], y: arrC[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoBU(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrayB[i], y: arrC[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_BU = convertEFtoBU(pointsB, pointsC);
// console.log('pointsEF_BU', pointsEF_BU);

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

function convertCornersEFtoBU(coordB_CD) {
  const pointsCornersEF = [
    { x: -coordB_CD, y: coordB_CD, z: -coordB_CD },
    { x: coordB_CD, y: coordB_CD, z: -coordB_CD },
  ];
  return pointsCornersEF;
}
export const pointsCornersEF_BU = convertCornersEFtoBU(cornerB_CD);
// console.log('pointsCornersEF_BU', pointsCornersEF_BU);

function convertCDtoBR(arrA, arrB, arrC) {
  const arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: arrC[i], y: arrayB[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoBR(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: arrC[i], y: arrayB[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_BR = convertEFtoBR(pointsB, pointsC);
// console.log('pointsEF_BR', pointsEF_BR);

function convertCDtoBL(arrA, arrB, arrC) {
  const arrayB = arrB.toReversed();
  let pointsCD = [];
  for (let i = 0; i < arrA.length; i++) {
    let Obj = { x: -arrC[i], y: arrayB[i], z: -arrA[i] };
    pointsCD.push(Obj);
  }
  return pointsCD;
}

function convertEFtoBL(arrB, arrC) {
  const arrayB = arrB.toReversed();
  const pointsEF = [];
  for (let i = 0; i < arrB.length; i++) {
    const Obj = { x: -arrC[i], y: arrayB[i], z: -arrC[i] };
    pointsEF.push(Obj);
  }
  return pointsEF;
}
export const pointsEF_BL = convertEFtoBL(pointsB, pointsC);
// console.log('pointsEF_BL', pointsEF_BL);

// console.log(pointsA, pointsB, pointsC);
export const pointsCD_BD = convertCDtoBD(pointsA, pointsB, pointsC);
export const pointsCD_BU = convertCDtoBU(pointsA, pointsB, pointsC);
export const pointsCD_BR = convertCDtoBR(pointsA, pointsB, pointsC);
export const pointsCD_BL = convertCDtoBL(pointsA, pointsB, pointsC);
console.log('pointsCD_BD', pointsCD_BD);
