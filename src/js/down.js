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

export function createDownPoints(params) {
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

  function convertCDtoDF(arrA, arrB, arrC) {
    const arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrayB[i], y: -arrA[i], z: arrC[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoDF(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrayB[i], y: -arrC[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_DF = convertEFtoDF(pointsB, pointsC);
  // console.log('pointsEF_DF', pointsEF_DF);

  function convertCornersABtoDF(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
      { x: -coordC_CD, y: -coordAB, z: coordAB },
      { x: coordC_CD, y: -coordAB, z: coordAB },
      { x: fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_DF = convertCornersABtoDF(cornerC_CD, cornerAB);
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
  const pointsCornersCD_DF = convertCornersCDtoDF(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_DF', pointsCornersCD_DF);

  function convertCornersEFtoDF(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: -coordB_CD, z: coordB_CD },
      { x: coordB_CD, y: -coordB_CD, z: coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_DF = convertCornersEFtoDF(cornerB_CD);
  // console.log('pointsCornersEF_DF', pointsCornersEF_DF);

  function convertCDtoDB(arrA, arrB, arrC) {
    const arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrayB[i], y: -arrA[i], z: -arrC[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoDB(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrayB[i], y: -arrC[i], z: -arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_DB = convertEFtoDB(pointsB, pointsC);
  // console.log('pointsEF_DB', pointsEF_DB);

  function convertCornersABtoDB(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
      { x: -coordC_CD, y: -coordAB, z: -coordAB },
      { x: coordC_CD, y: -coordAB, z: -coordAB },
      { x: fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_DB = convertCornersABtoDB(cornerC_CD, cornerAB);
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
  const pointsCornersCD_DB = convertCornersCDtoDB(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_DB', pointsCornersCD_DB);

  function convertCornersEFtoDB(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: -coordB_CD, z: -coordB_CD },
      { x: coordB_CD, y: -coordB_CD, z: -coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_DB = convertCornersEFtoDB(cornerB_CD);
  // console.log('pointsCornersEF_DB', pointsCornersEF_DB);

  function convertCDtoDR(arrA, arrB, arrC) {
    // const arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: arrC[i], y: -arrA[i], z: arrB[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoDR(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: arrC[i], y: -arrC[i], z: -arrayB[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_DR = convertEFtoDR(pointsB, pointsC);
  // console.log('pointsEF_DR', pointsEF_DR);

  function convertCDtoDL(arrA, arrB, arrC) {
    // const arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrC[i], y: -arrA[i], z: arrB[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoDL(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: -arrC[i], z: -arrayB[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_DL = convertEFtoDL(pointsB, pointsC);
  // console.log('pointsEF_DL', pointsEF_DL);

  // console.log(pointsA, pointsB, pointsC);
  const pointsCD_DF = convertCDtoDF(pointsA, pointsB, pointsC);
  const pointsCD_DB = convertCDtoDB(pointsA, pointsB, pointsC);
  const pointsCD_DR = convertCDtoDR(pointsA, pointsB, pointsC);
  const pointsCD_DL = convertCDtoDL(pointsA, pointsB, pointsC);
  console.log('pointsCD_DB', pointsCD_DB);
  return {
    pointsCD_DF,
    pointsCornersAB_DF,
    pointsCornersCD_DF,
    pointsCornersEF_DF,
    pointsCD_DB,
    pointsCornersAB_DB,
    pointsCornersCD_DB,
    pointsCornersEF_DB,
    pointsCD_DR,
    pointsCD_DL,
    pointsEF_DR,
    pointsEF_DL,
    pointsEF_DB,
    pointsEF_DF,
  };
}
