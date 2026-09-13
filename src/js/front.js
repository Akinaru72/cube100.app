// import {
//   pointsA,
//   pointsB,
//   pointsC,
//   cornerA_CD,
//   cornerB_CD,
//   cornerC_CD,
//   cornerAB,
//   fullsize,
// } from './constants.js';
export function createFrontPoints(params) {
  // console.log('I am here');
  const {
    pointsA,
    pointsB,
    pointsC,
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB,
    fullsize,
  } = params;

  function convertCDtoFU(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrayB[i], y: arrC[i], z: arrA[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoFU(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrayB[i], y: arrC[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_FU = convertEFtoFU(pointsB, pointsC);
  // console.log('pointsEF_FU', pointsEF_FU);

  function convertCornersABtoFU(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
      { x: -coordC_CD, y: coordAB, z: coordAB },
      { x: coordC_CD, y: coordAB, z: coordAB },
      { x: fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_FU = convertCornersABtoFU(cornerC_CD, cornerAB);
  // console.log('pointsCornersAB_FU', pointsCornersAB_FU);

  function convertCornersCDtoFU(coordA_CD, coordB_CD, coordC_CD, coordAB) {
    const pointsCornersCD = [
      { x: -coordAB, y: coordC_CD, z: coordAB },
      { x: -coordB_CD, y: coordC_CD, z: coordA_CD },
      { x: coordB_CD, y: coordC_CD, z: coordA_CD },
      { x: coordAB, y: coordC_CD, z: coordAB },
    ];
    return pointsCornersCD;
  }
  const pointsCornersCD_FU = convertCornersCDtoFU(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_FU', pointsCornersCD_FU);

  function convertCornersEFtoFU(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: coordB_CD, z: coordB_CD },
      { x: coordB_CD, y: coordB_CD, z: coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_FU = convertCornersEFtoFU(cornerB_CD);
  // console.log('pointsCornersEF_FU', pointsCornersEF_FU);

  function convertCDtoFD(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrayB[i], y: -arrC[i], z: arrA[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoFD(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrayB[i], y: -arrC[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_FD = convertEFtoFD(pointsB, pointsC);
  // console.log('pointsEF_FD', pointsEF_FD);

  function convertCornersABtoFD(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
      { x: -coordC_CD, y: -coordAB, z: coordAB },
      { x: coordC_CD, y: -coordAB, z: coordAB },
      { x: fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_FD = convertCornersABtoFD(cornerC_CD, cornerAB);
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
  const pointsCornersCD_FD = convertCornersCDtoFD(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_FD', pointsCornersCD_FD);

  function convertCornersEFtoFD(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: -coordB_CD, z: coordB_CD },
      { x: coordB_CD, y: -coordB_CD, z: coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_FD = convertCornersEFtoFD(cornerB_CD);
  // console.log('pointsCornersEF_FD', pointsCornersEF_FD);

  function convertCDtoFR(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrC[i], y: arrayB[i], z: arrA[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoFR(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrC[i], y: arrayB[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_FR = convertEFtoFR(pointsB, pointsC);
  // console.log('pointsEF_FR', pointsEF_FR);

  function convertCDtoFL(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrC[i], y: arrayB[i], z: arrA[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoFL(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: arrayB[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_FL = convertEFtoFL(pointsB, pointsC);
  // console.log('pointsEF_FL', pointsEF_FL);

  // console.log(pointsA, pointsB, pointsC);
  const pointsCD_FU = convertCDtoFU(pointsA, pointsB, pointsC);
  const pointsCD_FD = convertCDtoFD(pointsA, pointsB, pointsC);
  const pointsCD_FR = convertCDtoFR(pointsA, pointsB, pointsC);
  const pointsCD_FL = convertCDtoFL(pointsA, pointsB, pointsC);
  // console.log('pointsCD_FD', pointsCD_FD);
  // console.log('pointsCD_FL', pointsCD_FL);
  return {
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
  };
}
