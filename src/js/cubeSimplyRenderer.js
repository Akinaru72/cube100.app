import * as THREE from 'three';

import { size, cubeSize, cellSize } from '../js/constants';

// ====================
// GEOMETRY
// ====================

const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
// const bodyMaterial = new THREE.MeshStandardMaterial({
//   color: 0x808080,
// });

const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x111111,
  roughness: 0.38,
  metalness: 0.02,
  clearcoat: 0.45,
  clearcoatRoughness: 0.18,
  emissive: 0x000000,
});

const cubies = [];
export const cubePieces = [];

// ====================
// CUBIES
// ====================

for (let x = 0; x < size; x++) {
  for (let y = 0; y < size; y++) {
    for (let z = 0; z < size; z++) {
      const visible =
        x === 0 ||
        x === size - 1 ||
        y === 0 ||
        y === size - 1 ||
        z === 0 ||
        z === size - 1;

      if (!visible) continue;

      const cubie = {
        x,
        y,
        z,
        stickers: [],
      };

      cubies.push(cubie);

      cubePieces.push({
        cubie,
        coord: {
          x: x + 1,
          y: y + 1,
          z: z + 1,
        },
      });
    }
  }
}

// ==================================================================

// const stickerGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
const stickerGeometry = new THREE.BoxGeometry(
  cubeSize * 0.82,
  cubeSize * 0.82,
  0.02
);
const createStickerMaterial = color =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: 0.18,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
const rightMaterial = createStickerMaterial(0xff0000);
const upMaterial = createStickerMaterial(0xffffff);
const frontMaterial = createStickerMaterial(0x00ff00);
const leftMaterial = createStickerMaterial(0xffa500);
const backMaterial = createStickerMaterial(0x0000ff);
const downMaterial = createStickerMaterial(0xffff00);
// const rightMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
// });
// const upMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
// });

// const frontMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// });

// const leftMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffa500,
// });

// const backMaterial = new THREE.MeshBasicMaterial({
//   color: 0x0000ff,
// });

// const downMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffff00,
// });

export const cubeGroup = new THREE.Group();

cubies.forEach(cubie => {
  const px = (cubie.x - (size - 1) / 2) * cellSize;
  const py = (cubie.y - (size - 1) / 2) * cellSize;
  const pz = (cubie.z - (size - 1) / 2) * cellSize;

  const mesh = new THREE.Mesh(geometry, bodyMaterial);
  mesh.position.set(px, py, pz);
  cubie.mesh = mesh;
  cubeGroup.add(mesh);
  // ====================
  // RIGHT
  // ====================
  if (cubie.x === size - 1) {
    const sticker = new THREE.Mesh(stickerGeometry, rightMaterial);
    sticker.position.set(
      mesh.position.x + cubeSize / 2,
      mesh.position.y,
      mesh.position.z
    );
    sticker.rotation.set(0, Math.PI / 2, 0);
    cubie.stickers.push(sticker);
    cubeGroup.add(sticker);
  }
  // ====================
  // UP
  // ====================
  if (cubie.y === size - 1) {
    const sticker = new THREE.Mesh(stickerGeometry, upMaterial);
    sticker.position.set(
      mesh.position.x,
      mesh.position.y + cubeSize / 2,
      mesh.position.z
    );
    sticker.rotation.set(-Math.PI / 2, 0, 0);
    cubie.stickers.push(sticker);
    cubeGroup.add(sticker);
  }
  // ====================
  // FRONT
  // ====================

  if (cubie.z === size - 1) {
    const sticker = new THREE.Mesh(stickerGeometry, frontMaterial);

    sticker.position.set(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z + cubeSize / 2
    );
    sticker.rotation.set(0, 0, 0);
    cubie.stickers.push(sticker);
    cubeGroup.add(sticker);
  }

  // ====================
  // LEFT
  // ====================
  if (cubie.x === 0) {
    const sticker = new THREE.Mesh(stickerGeometry, leftMaterial);
    sticker.position.set(
      mesh.position.x - cubeSize / 2,
      mesh.position.y,
      mesh.position.z
    );
    sticker.rotation.set(0, -Math.PI / 2, 0);
    cubie.stickers.push(sticker);
    cubeGroup.add(sticker);
  }
  // ====================
  // DOWN
  // ====================

  if (cubie.y === 0) {
    const sticker = new THREE.Mesh(stickerGeometry, downMaterial);

    sticker.position.set(
      mesh.position.x,
      mesh.position.y - cubeSize / 2,
      mesh.position.z
    );

    sticker.rotation.set(Math.PI / 2, 0, 0);

    cubie.stickers.push(sticker);

    cubeGroup.add(sticker);
  }
  // ====================
  // BACK
  // ====================

  if (cubie.z === 0) {
    const sticker = new THREE.Mesh(stickerGeometry, backMaterial);
    sticker.position.set(
      mesh.position.x,
      mesh.position.y,
      mesh.position.z - cubeSize / 2
    );
    sticker.rotation.set(0, Math.PI, 0);
    cubie.stickers.push(sticker);
    cubeGroup.add(sticker);
  }
});
