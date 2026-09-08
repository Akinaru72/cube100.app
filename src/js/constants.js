// constants.js
export const DEFAULT_SIZE = 15;
export const cubeSize = 0.9;
export const gap = 0.1;
export const cellSize = cubeSize + gap;
export const cornerSize = cellSize * 2;
export const halfSize = (DEFAULT_SIZE * cellSize) / 2;
export const cornerExpand = cornerSize - cellSize; //отодвинули грань
export const faceOffsetFactor = 1.5; // коэффициент смещения грани
// export const faceOffsetFactor = ; // коэффициент смещения грани
export const sphereOffset = DEFAULT_SIZE * cellSize * 1.4;
// export const sphereOffset = size * cellSize * 0;
export const fullsize = (DEFAULT_SIZE - 2) * cellSize + cornerSize * 2;
export const bulgeRadius = Math.sqrt(
  (halfSize + cornerExpand + sphereOffset) ** 2 +
    (halfSize + cornerExpand) ** 2 +
    (halfSize + cornerExpand) ** 2
);

export let expand;
const expandValue = ((halfSize - cellSize) * (Math.sqrt(2) - 1)) / cellSize;
expandValue > 1 ? (expand = expandValue) : (expand = 1);

console.log('expand', expand);

const halfCell = cellSize / 2;
// console.log('bulgeRadius', bulgeRadius);

export const CORNER = {
  FUR: 0,
  UBR: 1,
  LUF: 2,
  LUB: 3,
  RDF: 4,
  RDB: 5,
  LDF: 6,
  LDB: 7,
};

export const cd = [];

for (let i = 0; i < DEFAULT_SIZE - 2; i++) {
  const b = (i + 1 - (DEFAULT_SIZE - 1) / 2) * cellSize;
  const c = (DEFAULT_SIZE - 1 - (DEFAULT_SIZE - 1) / 2) * cellSize;
  const T = Math.sqrt(bulgeRadius ** 2 - b ** 2 - c ** 2);
  const R = Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
  const a = c + T - R + cornerExpand * 1.5;
  cd.push({ a, b, c });
}
console.log('cd', cd);

export const sphereOffsetEdges =
  Math.sqrt((sphereOffset + fullsize / 2) ** 2 + (fullsize / 2) ** 2) -
  (fullsize / 2) * Math.sqrt(2);

export const diagonal = sphereOffsetEdges / Math.sqrt(2);

export const halfCenters = ((DEFAULT_SIZE - 1) / 2) * cellSize;
export const pointsA = [];
export const pointsB = [];
export const pointsC = [];

function getCDPoints(centers, DEFAULT_SIZE) {
  // const halfCell = cellSize / 2;
  for (let i = centers.length - 1; i >= 0; i--) {
    const center = centers[i];
    pointsA.push(center.a + halfCell);
    pointsB.push(center.b + halfCell - gap / 2);
    pointsC.push(center.c - halfCell + gap / 2);
    pointsA.push(center.a + halfCell);
    pointsB.push(center.b - halfCell + gap / 2);
    pointsC.push(center.c - halfCell + gap / 2);
  }
}

// console.log('pointsA', pointsA);
// console.log('pointsB', pointsB);
// console.log('pointsC', pointsC);

getCDPoints(cd);
// export const cornerB_CD = (i + 1 - (size - 1) / 2) * cellSize;
// export const cornerC_CD = (size - 1 - (size - 1) / 2) * cellSize;
export const cornerB_CD = ((DEFAULT_SIZE - 2) / 2) * cellSize + gap / 2;
export const cornerC_CD = ((DEFAULT_SIZE - 2) / 2) * cellSize + gap / 2;
const realBforA = (1 - (DEFAULT_SIZE - 1) / 2) * cellSize;
const realCforA = (DEFAULT_SIZE - 1 - (DEFAULT_SIZE - 1) / 2) * cellSize;
// console.log('rA', realBforA);
// console.log('rB', realCforA);
// export const cornerA_CD =
// Math.sqrt(bulgeRadius ** 2 - 3.5 ** 2 - 4.5 ** 2) / Math.sqrt(2) - 8;
const P = Math.sqrt(bulgeRadius ** 2 - realBforA ** 2 - realCforA ** 2);
const O = Math.sqrt(bulgeRadius ** 2 - halfSize ** 2 - halfSize ** 2);
export const cornerA_CD = realCforA + P - O + cornerExpand * 1.5 + halfCell;
// (sphereOffset - fullsize / 2);

console.log('cornerA_CD', cornerA_CD);
console.log('cornerB_CD', cornerB_CD);
console.log('cornerC_CD', cornerC_CD);

const cornerB_AB = ((DEFAULT_SIZE - 2) / 2) * cellSize + gap / 2;
const cornerA_AB =
  Math.sqrt(bulgeRadius ** 2 - cornerB_AB ** 2) / Math.sqrt(2) - diagonal;
const cornerC_AB =
  Math.sqrt(bulgeRadius ** 2 - cornerB_AB ** 2) / Math.sqrt(2) - diagonal;
export const cornerAB = cornerC_AB;

// console.log('cornerA_AB', cornerA_AB);
// console.log('cornerB_AB', cornerB_AB);
// console.log('cornerC_AB', cornerC_AB);
// console.log('cornerAB', cornerAB);
