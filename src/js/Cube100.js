import * as THREE from 'three';
import { CubeState } from './CubeState';
import { onSolve1thSideSol } from './solver/onSolve1thSide.js';
import { onSolve2thSideSol } from './solver/onSolve2thSide.js';

const scrambleBtn = document.querySelector('#scramble-btn');
const solveFisrtSide = document.querySelector('#solve-first-side');
const solveSecondSide = document.querySelector('#solve-second-side');

export class Cube100 {
  constructor(cubePieces, cubeGroup, size, cubeState, onAnimationEnd) {
    // constructor(cubePieces, cubeGroup, size, cubeState) {
    this.cubePieces = cubePieces;
    this.cubeGroup = cubeGroup;
    this.size = size;
    this.currentRotation = null;
    this.rotationSpeed = 0.1;
    this.rotationQueue = [];
    // this.cubeState = new CubeState(this.size);
    // this.cubeState = cubeState ?? new CubeState(this.size);
    this.cubeState = cubeState;
    // this.isSolving = false;
    this.isMoving = false;

    this.onAnimationEnd = onAnimationEnd;
    this.instantFinish = false;

    this.solSide1 = false;
    this.solSide2 = false;
  }
  updateResetButtons() {
    // console.log('cubeState.R', this.cubeState.U);
    if (this.cubeState.isSolved()) {
      // console.log('ON', this.isSolved);
      scrambleBtn.disabled = false;
    } else {
      // console.log('OFF', this.isSolved);
      scrambleBtn.disabled = true;
    }

    if (this.isMoving) {
      console.log('Moving');
      // console.log('MOV___ABLE___OFF');
      solveFisrtSide.disabled = true;
      solveSecondSide.disabled = true;
    }

    if (this.cubeState.isSolvedU()) {
      this.solSide1 = true;
      solveFisrtSide.disabled = true;
      // console.log('IF___ABLE___OFF');
    } else {
      this.solSide1 = false;
      solveFisrtSide.disabled = false;
      // console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedD() && this.solSide1) {
      this.solSide2 = true;
      solveSecondSide.disabled = true;
      // console.log('IF___ABLE___OFF');
    } else {
      this.solSide2 = false;
      solveSecondSide.disabled = false;
      // console.log('ABLE___ON');
    }

    // if (this.isSolving) {
    //   console.log('Solving');
    //   console.log('Sol___ABLE___OFF');
    //   solveFisrtSide.disabled = true;
    // }
  }

  attachPiece(faceGroup, piece) {
    if (piece.cubie) {
      faceGroup.attach(piece.cubie.mesh);

      // Новая версия: несколько стикеров
      if (piece.cubie.stickers) {
        piece.cubie.stickers.forEach(sticker => {
          faceGroup.attach(sticker);
        });
      }

      // Старая версия: один стикер
      else if (piece.cubie.sticker) {
        faceGroup.attach(piece.cubie.sticker);
      }

      return;
    }
    // if (piece.cubie) {
    //   faceGroup.attach(piece.cubie.mesh);
    //   if (piece.cubie.sticker) {
    //     faceGroup.attach(piece.cubie.sticker);
    //   }
    //   return;
    // }
    piece.parts.forEach(part => {
      if (part.isObject3D) {
        faceGroup.attach(part);
        return;
      }
      // part — объект edge3d со своими Mesh
      if (part.left) faceGroup.attach(part.left);
      if (part.right) faceGroup.attach(part.right);
      if (part.down) faceGroup.attach(part.down);
      if (part.outSurface) faceGroup.attach(part.outSurface);
    });
  }

  faceToMatrix(face, size, axis) {
    const matrix = Array.from({ length: size }, () => Array(size));

    face.forEach(piece => {
      let row;
      let col;

      if (axis === 'x') {
        row = size - piece.coord.y;
        col = piece.coord.z - 1;
      } else if (axis === 'y') {
        row = piece.coord.z - 1;
        col = piece.coord.x - 1;
      } else if (axis === 'z') {
        row = size - piece.coord.y;
        col = piece.coord.x - 1;
      }

      // console.log(
      //   'axis:',
      //   axis,
      //   'coord:',
      //   piece.coord,
      //   'row:',
      //   row,
      //   'col:',
      //   col
      // );

      matrix[row][col] = piece;
    });

    return matrix;
  }

  matrixToFace(matrix) {
    return matrix.flat();
  }

  rotateMatrix(matrix, axis, angle) {
    const size = matrix.length;
    const result = Array.from({ length: size }, () => Array(size));

    const reverse = angle === Math.PI / 2;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const piece = matrix[row][col];

        const newRow = reverse ? size - 1 - col : col;

        const newCol = reverse ? row : size - 1 - row;

        // const newRow = col;
        // const newCol = size - 1 - row;

        result[newRow][newCol] = piece;

        if (axis === 'x') {
          // piece.coord.x = size;
          piece.coord.y = newRow + 1;
          piece.coord.z = size - newCol;
        }

        if (axis === 'y') {
          piece.coord.x = newCol + 1;
          // piece.coord.y = size;
          piece.coord.z = newRow + 1;
        }

        if (axis === 'z') {
          piece.coord.x = newCol + 1;
          piece.coord.y = size - newRow;
          // piece.coord.z = size;
        }
      }
    }

    return result;
  }

  orderRing(pieces) {
    // console.log('I am HERE');
    const coords = pieces.map(piece => piece.coord);

    // Находим координату, которая одинаковая у всех
    const fixedAxes = ['x', 'y', 'z'].filter(axis =>
      coords.every(coord => coord[axis] === coords[0][axis])
    );
    // console.log(fixedAxes);
    if (fixedAxes.length !== 1) {
      throw new Error('Не удалось определить фиксированную координату');
    }

    const fixedAxis = fixedAxes[0];

    // Две оставшиеся координаты
    const variableAxes = ['x', 'y', 'z'].filter(axis => axis !== fixedAxis);

    const A = variableAxes[0];
    const B = variableAxes[1];

    // Определяем size
    const size = Math.max(...coords.map(coord => Math.max(coord[A], coord[B])));

    const result = [];
    const used = new Set();

    function addPiece(a, b) {
      const piece = pieces.find(
        piece =>
          !used.has(piece) && piece.coord[A] === a && piece.coord[B] === b
      );

      if (piece) {
        result.push(piece);
        used.add(piece);
      }
    }

    // A = 1, B растёт
    for (let b = 1; b <= size; b++) {
      addPiece(1, b);
    }

    // B = size, A растёт
    for (let a = 2; a <= size; a++) {
      addPiece(a, size);
    }

    // A = size, B уменьшается
    for (let b = size - 1; b >= 1; b--) {
      addPiece(size, b);
    }

    // B = 1, A уменьшается
    for (let a = size - 1; a >= 2; a--) {
      addPiece(a, 1);
    }

    if (fixedAxis === 'y') {
      // console.log('resultY', result);
      return result.reverse();
    }
    // console.log('result', result);
    return result;
  }

  rotateRing(pieces, size, angle) {
    const orderedFace = this.orderRing(pieces);
    // console.log('orderedFace', orderedFace);
    const shift = size - 1;
    // Сохраняем координаты ПОЗИЦИЙ
    const coords = orderedFace.map(piece => ({
      x: piece.coord.x,
      y: piece.coord.y,
      z: piece.coord.z,
    }));
    let array;
    if (angle === -Math.PI / 2) {
      array = [...orderedFace.slice(-shift), ...orderedFace.slice(0, -shift)];
    } else if (angle === Math.PI / 2) {
      array = [...orderedFace.slice(shift), ...orderedFace.slice(0, shift)];
    } else {
      return orderedFace;
    }
    // Новому элементу даём координаты позиции,
    // которую он занял
    array.forEach((piece, i) => {
      piece.coord.x = coords[i].x;
      piece.coord.y = coords[i].y;
      piece.coord.z = coords[i].z;
    });
    // console.log('Array Return', array);
    return array;
  }

  getFace(axis, value) {
    return this.cubePieces.filter(piece => piece.coord[axis] === value);
  }

  rotateLayers(axis, layers, angle) {
    if (Math.abs(angle) === Math.PI) {
      this.rotationQueue.push({
        axis,
        layers,
        angle: angle / 2,
      });

      this.rotationQueue.push({
        axis,
        layers,
        angle: angle / 2,
      });
    } else {
      this.rotationQueue.push({
        axis,
        layers,
        angle,
      });
    }

    if (!this.currentRotation) {
      this.startNextRotation();
    }
  }

  // rotateLayer(axis, value, angle) {
  //   this.rotationQueue.push({
  //     axis,
  //     value,
  //     angle,
  //   });

  //   if (!this.currentRotation) {
  //     this.startNextRotation();
  //   }
  // }

  startNextRotation() {
    if (this.currentRotation) return;

    const move = this.rotationQueue.shift();

    if (!move) return;
    // // -------New
    // if (!move) {
    //   if (this.instantFinish) {
    //     this.instantFinish = false;
    //   }
    //   return;
    // }
    // // -------
    this.startRotation(move);
    // -------New
    if (this.instantFinish) {
      this.finishRotation();
    }
    // -------New
  }

  finishAnimation() {
    this.instantFinish = true;

    if (this.currentRotation) {
      this.finishRotation();
    } else {
      this.startNextRotation();
    }
  }

  startRotation(move) {
    if (move.isCubeRotation) {
      this.currentRotation = {
        ...move,
        currentAngle: 0,
        faceGroup: this.cubeGroup,
      };

      return;
    }
    const layers = [];

    // Разворачиваем [[2, 5], [9], [15, 20]]
    // в отдельные слои
    move.layers.forEach(group => {
      const [from, to = from] = group;

      const start = Math.min(from, to);
      const end = Math.max(from, to);

      for (let value = start; value <= end; value++) {
        const pieces = this.getFace(move.axis, value);

        layers.push({
          value,
          pieces,
        });
      }
    });

    // Одна временная группа для ВСЕХ выбранных слоёв
    const faceGroup = new THREE.Group();
    this.cubeGroup.add(faceGroup);

    // Чтобы один piece случайно не attach-нулся дважды
    const attached = new Set();

    layers.forEach(({ pieces }) => {
      pieces.forEach(piece => {
        if (attached.has(piece)) return;

        attached.add(piece);
        this.attachPiece(faceGroup, piece);
      });
    });

    this.currentRotation = {
      ...move,
      currentAngle: 0,
      layers,
      faceGroup,
    };
  }

  updateRotation() {
    if (!this.currentRotation) return;

    if (this.instantFinish) {
      this.finishRotation();
      return;
    }
    // console.log('updateRotation');
    const rotation = this.currentRotation;

    const direction = Math.sign(rotation.angle);

    const remaining =
      Math.abs(rotation.angle) - Math.abs(rotation.currentAngle);

    const step = Math.min(this.rotationSpeed, remaining) * direction;

    rotation.faceGroup.rotation[rotation.axis] += step;

    rotation.currentAngle += step;

    if (Math.abs(rotation.currentAngle) >= Math.abs(rotation.angle)) {
      rotation.faceGroup.rotation[rotation.axis] = rotation.angle;

      this.finishRotation();
    }
  }

  finishRotation() {
    const rotation = this.currentRotation;
    // console.log(
    //   'FINISH:',
    //   rotation.axis,
    //   rotation.angle,
    //   'isCubeRotation:',
    //   rotation.isCubeRotation
    // );
    // if (rotation.isCubeRotation) {
    //   this.currentRotation = null;
    //   if (this.rotationQueue.length === 0) {
    //     this.isMoving = false;

    //     this.instantFinish = false;
    //     this.rotationSpeed = 0.1;

    //     this.onAnimationEnd();
    //   }
    //   this.startNextRotation();

    //   return;
    // }

    const { layers, faceGroup, axis, angle } = rotation;

    // Финальный угол
    faceGroup.rotation[axis] = angle;

    // Каждый выбранный слой обрабатываем отдельно
    layers.forEach(({ value, pieces }) => {
      let rotatedFace;

      // ==========================
      // ВНУТРЕННИЙ СЛОЙ
      // ==========================
      if (value > 1 && value < this.size) {
        rotatedFace = this.rotateRing(pieces, this.size, angle);
      }

      // ==========================
      // ПЕРВАЯ / ПОСЛЕДНЯЯ ГРАНЬ
      // ==========================
      else if (Math.abs(angle) === Math.PI / 2) {
        const matrix = this.faceToMatrix(pieces, this.size, axis);

        const rotatedMatrix = this.rotateMatrix(matrix, axis, angle);

        rotatedFace = this.matrixToFace(rotatedMatrix);
      }

      // ==========================
      // ВОЗВРАЩАЕМ ОБЪЕКТЫ
      // ==========================
      rotatedFace.forEach(piece => {
        if (piece.cubie) {
          this.cubeGroup.attach(piece.cubie.mesh);

          if (piece.cubie.stickers) {
            piece.cubie.stickers.forEach(sticker => {
              this.cubeGroup.attach(sticker);
            });
          } else if (piece.cubie.sticker) {
            this.cubeGroup.attach(piece.cubie.sticker);
          }

          return;
        }

        piece.parts.forEach(part => {
          if (part.isObject3D) {
            this.cubeGroup.attach(part);
            return;
          }

          if (part.left) this.cubeGroup.attach(part.left);
          if (part.right) this.cubeGroup.attach(part.right);
          if (part.down) this.cubeGroup.attach(part.down);
          if (part.outSurface) this.cubeGroup.attach(part.outSurface);
        });
      });

      // ==========================
      // ОБНОВЛЯЕМ cubePieces
      // ==========================
      const indexes = pieces.map(piece => this.cubePieces.indexOf(piece));

      indexes.forEach((cubeIndex, i) => {
        this.cubePieces[cubeIndex] = rotatedFace[i];
      });
    });

    // ==========================
    // ЗАВЕРШЕНИЕ ВСЕГО ПОВОРОТА
    // ==========================

    this.cubeGroup.remove(faceGroup);
    // console.log('STATE MOVE:', {
    //   axis,
    //   layers,
    //   angle,
    // });
    // if (!this.isCubeMoving) {
    this.cubeState.move({
      axis,
      layers,
      angle,
    });
    //   this.isCubeMoving = false;
    // }
    // console.log('STATE AFTER MOVE:', this.cubeState);

    if (this.cubeState.isSolved()) {
      console.log('Cube solved');
    }
    this.currentRotation = null;
    // console.log('QUEUE:', this.rotationQueue.length);

    if (this.rotationQueue.length === 0) {
      this.isMoving = false;

      // this.isCubeMoving = false;
      this.instantFinish = false;
      this.rotationSpeed = 0.1;
      // if (this.resolveExecute) {
      //   this.resolveExecute();
      //   this.resolveExecute = null;
      // }
      this.onAnimationEnd();
    }
    this.updateResetButtons();
    // this.currentRotation = null;

    this.startNextRotation();
  }

  normalizeLayers(layers, defaultLayer) {
    // R() / L() / U() и т.д.
    if (layers === undefined) {
      return [[defaultLayer]];
    }

    // R(5)
    if (typeof layers === 'number') {
      return [[layers]];
    }

    // R("5")
    // if (typeof layers === 'string') {
    //   return layers.split(';').map(group => {
    //     const values = group.split(',').map(Number);

    //     if (values.length === 1) {
    //       return [values[0]];
    //     }

    //     if (values.length === 2) {
    //       return [values[0], values[1]];
    //     }

    //     throw new Error(`Неверная группа слоёв: ${group}`);
    //   });
    // }

    // if (!Array.isArray(layers)) {
    //   throw new Error('Неверно указаны слои');
    // }
    if (typeof layers === 'string') {
      return [layers.split(',').map(Number)];
    }

    // R([5])
    // R([2, 5])
    // if (layers.every(value => typeof value === 'number')) {
    //   if (layers.length === 1) {
    //     return [[layers[0]]];
    //   }

    //   if (layers.length === 2) {
    //     return [[layers[0], layers[1]]];
    //   }

    //   throw new Error('Массив слоёв должен содержать 1 или 2 числа');
    // }
    // if (layers.every(value => typeof value === 'number')) {
    //   return [layers];
    // }
    if (layers.every(value => typeof value === 'number')) {
      return layers.map(value => [value]);
    }

    // R([[1, 4], [5], [7, 9]])
    return layers.map(group => {
      if (!Array.isArray(group)) {
        throw new Error('Каждая группа слоёв должна быть массивом');
      }

      if (group.length === 1) {
        return [group[0]];
      }

      if (group.length === 2) {
        return [group[0], group[1]];
      }

      throw new Error(`Неверная группа слоёв: ${group}`);
    });
  }

  R(layers) {
    this.rotateLayers(
      'x',
      this.normalizeLayers(layers, this.size),
      -Math.PI / 2
    );
  }

  L(layers) {
    this.rotateLayers('x', this.normalizeLayers(layers, 1), Math.PI / 2);
  }

  U(layers) {
    this.rotateLayers(
      'y',
      this.normalizeLayers(layers, this.size),
      -Math.PI / 2
    );
  }

  D(layers) {
    this.rotateLayers('y', this.normalizeLayers(layers, 1), Math.PI / 2);
  }

  F(layers) {
    this.rotateLayers(
      'z',
      this.normalizeLayers(layers, this.size),
      -Math.PI / 2
    );
  }

  B(layers) {
    this.rotateLayers('z', this.normalizeLayers(layers, 1), Math.PI / 2);
  }

  Rprime(layers) {
    this.rotateLayers(
      'x',
      this.normalizeLayers(layers, this.size),
      Math.PI / 2
    );
  }

  Lprime(layers) {
    this.rotateLayers('x', this.normalizeLayers(layers, 1), -Math.PI / 2);
  }

  Uprime(layers) {
    this.rotateLayers(
      'y',
      this.normalizeLayers(layers, this.size),
      Math.PI / 2
    );
  }

  Dprime(layers) {
    this.rotateLayers('y', this.normalizeLayers(layers, 1), -Math.PI / 2);
  }

  Fprime(layers) {
    this.rotateLayers(
      'z',
      this.normalizeLayers(layers, this.size),
      Math.PI / 2
    );
  }

  Bprime(layers) {
    this.rotateLayers('z', this.normalizeLayers(layers, 1), -Math.PI / 2);
  }

  // normalizeMove(move) {
  //   if (move.endsWith("'")) {
  //     return move.slice(0, -1) + 'prime';
  //   }

  //   if (move.startsWith('2')) {
  //     move = move.slice(1);

  //     return [move, move];
  //   }

  //   if (!'RLUDFB'.includes(move[0])) {
  //     throw new Error(`Неизвестный ход: ${move}`);
  //   }

  //   return move;
  // }
  normalizeMove(move) {
    if (move.includes("'")) {
      move = move.replace("'", 'prime');
    }

    if (move.startsWith('2')) {
      move = move.slice(1);
      return [move, move];
    }

    if (!'RLUDFB'.includes(move[0])) {
      throw new Error(`Неизвестный ход: ${move}`);
    }

    return move;
  }
  // normalizeMove(move) {
  //   if (move.includes("'")) {
  //     move = move.replace("'", 'prime');
  //   }

  //   if (move.startsWith('2')) {
  //     move = move.slice(1);
  //     return [move, move];
  //   }

  //   if (!'RLUDFB'.includes(move[0])) {
  //     throw new Error(`Неизвестный ход: ${move}`);
  //   }

  //   return move;
  // }
  // normalizeMove(move) {
  //   const match = move.match(/^([RLUDFB])(prime|')?(?:\(([^)]+)\))?$/);

  //   if (!match) {
  //     throw new Error(`Неизвестный ход: ${move}`);
  //   }

  //   const face = match[1];
  //   const prime = match[2];
  //   const layers = match[3];

  //   let method = face;

  //   if (prime === "'" || prime === 'prime') {
  //     method += 'prime';
  //   }

  //   return {
  //     method,
  //     layers,
  //   };
  // }
  scramble(count = this.size * 10) {
    this.isMoving = true;
    const faces = ['R', 'L', 'U', 'D', 'F', 'B'];

    const axisMap = {
      R: 'x',
      L: 'x',
      U: 'y',
      D: 'y',
      F: 'z',
      B: 'z',
    };

    const angleMap = {
      R: -Math.PI / 2,
      L: Math.PI / 2,
      U: -Math.PI / 2,
      D: Math.PI / 2,
      F: -Math.PI / 2,
      B: Math.PI / 2,
    };

    let lastFace = null;
    let lastAxis = null;

    const sequence = [];

    for (let i = 0; i < count; i++) {
      let face;
      let axis;

      do {
        face = faces[Math.floor(Math.random() * faces.length)];
        axis = axisMap[face];

        if (face === lastFace) continue;

        if (axis === lastAxis && i >= 2) continue;

        break;
      } while (true);

      // Случайный слой от 1 до size
      const value = Math.floor(Math.random() * this.size) + 1;

      // 0 = обычный
      // 1 = обратный
      // 2 = двойной
      const type = Math.floor(Math.random() * 3);

      const angle = angleMap[face];

      if (type === 0) {
        this.rotateLayers(axis, [[value]], angle);

        sequence.push(`${face}(${value})`);
      }

      if (type === 1) {
        this.rotateLayers(axis, [[value]], -angle);

        sequence.push(`${face}'(${value})`);
      }

      if (type === 2) {
        this.rotateLayers(axis, [[value]], angle);

        this.rotateLayers(axis, [[value]], angle);

        sequence.push(`2${face}(${value})`);
      }

      lastFace = face;
      lastAxis = axis;
    }

    this.updateResetButtons();

    return sequence.join(' ');
  }

  // execute(sequence) {
  //   if (!sequence?.length) return;

  //   sequence.forEach(move => {
  //     const normalized = this.normalizeMove(move);

  //     if (Array.isArray(normalized)) {
  //       normalized.forEach(m => this[m]());
  //     } else {
  //       this[normalized]();
  //     }
  //   });
  // }
  // execute(sequence) {
  //   if (!sequence?.length) return;

  //   sequence.forEach(move => {
  //     const normalized = this.normalizeMove(move);

  //     if (Array.isArray(normalized)) {
  //       normalized.forEach(m => {
  //         const [method, layers] = m.split('(');
  //         this[method](layers?.slice(0, -1));
  //       });
  //     } else {
  //       const [method, layers] = normalized.split('(');
  //       this[method](layers?.slice(0, -1));
  //     }
  //   });
  // }
  // execute(sequence) {
  //   if (!sequence?.length) return;

  //   sequence.forEach(move => {
  //     const normalized = this.normalizeMove(move);

  //     if (Array.isArray(normalized)) {
  //       normalized.forEach(m => this.execute([m]));
  //       return;
  //     }

  //     const [method, layers] = normalized.split('(');

  //     if (!layers) {
  //       this[method]();
  //       return;
  //     }

  //     let layer = layers.slice(0, -1);

  //     // if ('RUF'.includes(method)) {
  //     //   layer = layer
  //     //     .split(';')
  //     //     .map(group =>
  //     //       group
  //     //         .split(',')
  //     //         .map(n => this.size - Number(n) + 1)
  //     //         .join(',')
  //     //     )
  //     //     .join(';');
  //     // }
  //     if ('RUF'.includes(method)) {
  //       layer = layer.split(',').map(n => this.size - Number(n) + 1);
  //     } else {
  //       layer = layer.split(',').map(Number);
  //     }

  //     this[method](layer);
  //   });
  // }

  execute(sequence) {
    if (!sequence?.length) return;

    sequence.forEach(move => {
      const normalized = this.normalizeMove(move);

      if (Array.isArray(normalized)) {
        normalized.forEach(m => this.execute([m]));
        return;
      }

      let method;
      let layers;

      if (normalized.includes('(')) {
        [method, layers] = normalized.split('(');
        layers = layers.slice(0, -1);
      } else if (normalized.includes('[')) {
        [method, layers] = normalized.split('[');
        layers = layers.slice(0, -1);
      } else {
        this[normalized]();
        return;
      }

      if ('RUF'.includes(method[0])) {
        layers = layers.split(',').map(n => this.size - Number(n) + 1);
      } else {
        layers = layers.split(',').map(Number);
      }

      this[method](layers);
    });
  }

  // async execute(sequence) {
  //   if (!sequence?.length) return;

  //   return new Promise(resolve => {
  //     this.resolveExecute = resolve;

  //     sequence.forEach(move => {
  //       const normalized = this.normalizeMove(move);

  //       if (Array.isArray(normalized)) {
  //         normalized.forEach(m => this.execute([m]));
  //         return;
  //       }

  //       let method;
  //       let layers;

  //       if (normalized.includes('(')) {
  //         [method, layers] = normalized.split('(');
  //         layers = layers.slice(0, -1);
  //       } else if (normalized.includes('[')) {
  //         [method, layers] = normalized.split('[');
  //         layers = layers.slice(0, -1);
  //       } else {
  //         this[normalized]();
  //         return;
  //       }

  //       if ('RUF'.includes(method[0])) {
  //         layers = layers.split(',').map(n => this.size - Number(n) + 1);
  //       } else {
  //         layers = layers.split(',').map(Number);
  //       }

  //       this[method](layers);
  //     });
  //   });
  // }

  reset() {
    console.log('RESET');

    this.rotationQueue = [];
    this.currentRotation = null;

    this.cubeState = new CubeState(this.size);
  }
  rotateCube(axis, angle) {
    this.rotationQueue.push({
      axis,
      angle,
      isCubeRotation: true,
    });
    this.isCubeMoving = true;

    if (!this.currentRotation) {
      this.startNextRotation();
    }
  }

  // rotateCubeSpace(axis, angle) {
  //   return new Promise(resolve => {
  //     const start = this.cubeGroup.rotation[axis];
  //     const target = start + angle;

  //     const timer = setInterval(() => {
  //       const diff = target - this.cubeGroup.rotation[axis];

  //       const step =
  //         Math.sign(diff) * Math.min(this.rotationSpeed, Math.abs(diff));

  //       this.cubeGroup.rotation[axis] += step;

  //       if (Math.abs(target - this.cubeGroup.rotation[axis]) < 0.0001) {
  //         this.cubeGroup.rotation[axis] = target;

  //         clearInterval(timer);
  //         resolve();
  //       }
  //     }, 16);
  //   });
  // }

  rotateCubeSpace(axis, angle) {
    return new Promise(resolve => {
      const start = this.cubeGroup.rotation[axis];
      const target = start + angle;
      const duration = 500;
      const startTime = performance.now();

      const animate = time => {
        const progress = Math.min((time - startTime) / duration, 1);

        this.cubeGroup.rotation[axis] = start + angle * progress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.cubeGroup.rotation[axis] = target;
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  // rotateCubeSpace(axis, angle) {
  //   return new Promise(resolve => {
  //     this.rotationQueue.push({
  //       axis,
  //       angle,
  //       isCubeRotation: true,
  //       resolve,
  //     });

  //     if (!this.currentRotation) {
  //       this.startNextRotation();
  //     }
  //   });
  // }

  waitForSolution(solution) {
    return new Promise(resolve => {
      const oldOnAnimationEnd = this.onAnimationEnd;

      this.onAnimationEnd = () => {
        oldOnAnimationEnd.call(this);
        this.onAnimationEnd = oldOnAnimationEnd;
        resolve();
      };

      this.execute(solution);
    });
  }

  async onSolve1thSide() {
    this.isMoving = true;
    this.updateResetButtons();
    await this.rotateCubeSpace('y', Math.PI / 2);

    let solution = onSolve1thSideSol(this.cubeState);
    // await this.execute(solution);
    await this.waitForSolution(solution);
    await this.rotateCubeSpace('y', -Math.PI / 2);
    this.updateResetButtons();
  }

  async onSolve2thSide() {
    if (!this.solSide1) {
      await this.onSolve1thSide();
    }
    this.isMoving = true;
    this.updateResetButtons();
    await this.rotateCubeSpace('x', -Math.PI);

    let solution = onSolve2thSideSol(this.cubeState);
    // let solution = ['R'];
    await this.waitForSolution(solution);
    await this.rotateCubeSpace('x', Math.PI);

    this.updateResetButtons();
  }
}
