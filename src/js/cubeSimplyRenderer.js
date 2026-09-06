import * as THREE from 'three';

import { cubeSize, cellSize } from '../js/constants';
export function createCubeRenderer(cubeState, size) {
  console.log(cubeState.U[0][0][0]);
  console.log(cubeState.F[0][0][0]);
  console.log(cubeState.R[0][0][0]);
  // getMaterial(cubeState.F[row][col]);
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
  const cubePieces = [];

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

  // const materials = {
  //   W: upMaterial,
  //   Y: downMaterial,
  //   G: frontMaterial,
  //   B: backMaterial,
  //   R: rightMaterial,
  //   O: leftMaterial,
  // };

  const colors = {
    W: 0xffffff,
    Y: 0xffff00,
    G: 0x00ff00,
    B: 0x0000ff,
    R: 0xff0000,
    O: 0xffa500,
  };

  const getMaterial = value => {
    return createStickerMaterial(colors[value[0]]);
  };

  console.log('R[0][0]', getMaterial(cubeState.R[0][0]));
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

  const cubeGroup = new THREE.Group();

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
      // const value = cubeState.getCell('R', cubie.y, cubie.z);
      const value = cubeState.getCell(
        'R',
        size - 1 - cubie.y,
        size - 1 - cubie.z
      );

      // console.log('R', value);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
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
      // console.log(cubeState.getCell('U', cubie.x, cubie.z));
      const value = cubeState.getCell('U', cubie.z, cubie.x);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
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
      // console.log(cubeState.getCell('F', cubie.x, cubie.y));
      const value = cubeState.getCell('F', size - 1 - cubie.y, cubie.x);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));

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
      // console.log(cubeState.getCell('L', cubie.y, cubie.z));
      const value = cubeState.getCell('L', size - 1 - cubie.y, cubie.z);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
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
      // console.log(cubeState.getCell('D', cubie.x, cubie.z));
      const value = cubeState.getCell('D', size - 1 - cubie.z, cubie.x);
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));

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
      // console.log(cubeState.getCell('B', cubie.x, cubie.y));
      const value = cubeState.getCell(
        'B',
        size - 1 - cubie.y,
        size - 1 - cubie.x
      );
      const sticker = new THREE.Mesh(stickerGeometry, getMaterial(value[0][0]));
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
  return {
    cubeGroup,
    cubePieces,
  };
}
