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

export function createLeftPoints(params) {
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

  function convertCDtoLU(arrA, arrB, arrC) {
    // let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrA[i], y: arrC[i], z: arrB[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoLU(arrB, arrC) {
    // const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: arrC[i], z: arrB[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_LU = convertEFtoLU(pointsB, pointsC);
  // console.log('pointsEF_LU', pointsEF_LU);

  function convertCornersABtoLU(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: fullsize / 2, z: fullsize / 2 },
      { x: -coordAB, y: coordAB, z: coordC_CD },
      { x: -coordAB, y: coordAB, z: -coordC_CD },
      { x: -fullsize / 2, y: fullsize / 2, z: -fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_LU = convertCornersABtoLU(cornerC_CD, cornerAB);
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
  const pointsCornersCD_LU = convertCornersCDtoLU(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_LU', pointsCornersCD_LU);

  function convertCornersEFtoLU(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: coordB_CD, z: coordB_CD },
      { x: -coordB_CD, y: coordB_CD, z: -coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_LU = convertCornersEFtoLU(cornerB_CD);
  // console.log('pointsCornersEF_LU', pointsCornersEF_LU);

  function convertCDtoLD(arrA, arrB, arrC) {
    // let arrayB = arrB.reverse();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrA[i], y: -arrC[i], z: arrB[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoLD(arrB, arrC) {
    // const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: -arrC[i], z: arrB[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_LD = convertEFtoLD(pointsB, pointsC);
  // console.log('pointsEF_LD', pointsEF_LD);

  function convertCornersABtoLD(coordC_CD, coordAB) {
    const pointsCornersAB = [
      { x: -fullsize / 2, y: -fullsize / 2, z: fullsize / 2 },
      { x: -coordAB, y: -coordAB, z: coordC_CD },
      { x: -coordAB, y: -coordAB, z: -coordC_CD },
      { x: -fullsize / 2, y: -fullsize / 2, z: -fullsize / 2 },
    ];
    return pointsCornersAB;
  }
  const pointsCornersAB_LD = convertCornersABtoLD(cornerC_CD, cornerAB);
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
  const pointsCornersCD_LD = convertCornersCDtoLD(
    cornerA_CD,
    cornerB_CD,
    cornerC_CD,
    cornerAB
  );
  // console.log('pointsCornersCD_LD', pointsCornersCD_LD);

  function convertCornersEFtoLD(coordB_CD) {
    const pointsCornersEF = [
      { x: -coordB_CD, y: -coordB_CD, z: coordB_CD },
      { x: -coordB_CD, y: -coordB_CD, z: -coordB_CD },
    ];
    return pointsCornersEF;
  }
  const pointsCornersEF_LD = convertCornersEFtoLD(cornerB_CD);
  // console.log('pointsCornersEF_LD', pointsCornersEF_LD);

  function convertCDtoLF(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrA[i], y: arrayB[i], z: arrC[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoLF(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: arrayB[i], z: arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_LF = convertEFtoLF(pointsB, pointsC);
  // console.log('pointsEF_LF', pointsEF_LF);

  function convertCDtoLB(arrA, arrB, arrC) {
    let arrayB = arrB.toReversed();
    let pointsCD = [];
    for (let i = 0; i < arrA.length; i++) {
      let Obj = { x: -arrA[i], y: arrayB[i], z: -arrC[i] };
      pointsCD.push(Obj);
    }
    return pointsCD;
  }

  function convertEFtoLB(arrB, arrC) {
    const arrayB = arrB.toReversed();
    const pointsEF = [];
    for (let i = 0; i < arrB.length; i++) {
      const Obj = { x: -arrC[i], y: arrayB[i], z: -arrC[i] };
      pointsEF.push(Obj);
    }
    return pointsEF;
  }
  const pointsEF_LB = convertEFtoLB(pointsB, pointsC);
  // console.log('pointsEF_LB', pointsEF_LB);

  // console.log(pointsA, pointsB, pointsC);

  const pointsCD_LU = convertCDtoLU(pointsA, pointsB, pointsC);
  const pointsCD_LD = convertCDtoLD(pointsA, pointsB, pointsC);
  const pointsCD_LF = convertCDtoLF(pointsA, pointsB, pointsC);
  const pointsCD_LB = convertCDtoLB(pointsA, pointsB, pointsC);
  // console.log('pointsCD_LB', pointsCD_LB);
  // console.log('pointsCD_LD', pointsCD_LD);
  return {
    pointsCD_LU,
    pointsCornersAB_LU,
    pointsCornersCD_LU,
    pointsCornersEF_LU,
    pointsCD_LD,
    pointsCornersAB_LD,
    pointsCornersCD_LD,
    pointsCornersEF_LD,
    pointsCD_LF,
    pointsCD_LB,
    pointsEF_LB,
    pointsEF_LU,
    pointsEF_LD,
    pointsEF_LF,
  };
}
