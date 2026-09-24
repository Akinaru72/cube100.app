import * as THREE from 'three';
import { CubeState } from './CubeState';
import { onSolve1thSideSol } from './solver/onSolve1thSide.js';
import { onSolve2thSideSol } from './solver/onSolve2thSide.js';
import { onSolve3thSideSol } from './solver/onSolve3thSide.js';
import { onSolve4thSideSol } from './solver/onSolve4thSide.js';
import { onSolve5thSideSol } from './solver/onSolve5thSide.js';
import { onSolve6thEdgeSol } from './solver/onSolve6thEdges.js';
import { onSolve7thEdgeSol } from './solver/onSolve7thEdges.js';
import { onSolve8thCrossSol } from './solver/onSolve8thCross.js';
import { onSolve9thCornersSol } from './solver/onSolve9thCorners.js';
import { onSolve10thMiddleSol } from './solver/onSolve10thMiddle.js';
import { onSolve11thCrossSol } from './solver/onSolve11thCross1.js';

import { createRubikLoader } from './solver/loader.js';

const scrambleBtn = document.querySelector('#scramble-btn');
const solveFisrtSide = document.querySelector('#solve-first-side');
const solveSecondSide = document.querySelector('#solve-second-side');
const solveThirdSide = document.querySelector('#solve-third-side');
const solveFourthSide = document.querySelector('#solve-fourth-side');
const solveFifthSixSide = document.querySelector('#solve-fifth-sixth-side');
const solveEdges1 = document.querySelector('#solve-edges-part-1');
const solveEdges2 = document.querySelector('#solve-edges-part-2');
const solveUpCross = document.querySelector('#solve-first-cross');
const solveUpCorners = document.querySelector('#solve-first-corners');
const solveMiddleLayer = document.querySelector('#solve-middle');
const solveLastCollectCross = document.querySelector('#solve-third-cross-1');

const settingsBackdropEl = document.querySelector('.settings-backdrop');
const loaderEl = document.querySelector('#cube-loader-vis');

function restoreCubeState(data) {
  const state = new CubeState(data.size);

  state.U = data.U;
  state.D = data.D;
  state.F = data.F;
  state.B = data.B;
  state.L = data.L;
  state.R = data.R;

  return state;
}

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
    this.isSolving = false;
    this.isMoving = false;

    this.onAnimationEnd = onAnimationEnd;
    this.instantFinish = false;
    this.finalStates = [];
    this.finalScrambleState = null;
    this.solutions = [];

    this.solSide1 = false;
    this.solSide2 = false;
    this.solSide3 = false;
    this.solSide4 = false;
    this.solSide5 = false;
    this.solEdge1 = false;
    this.solEdge2 = false;
    this.solUpCross = false;
    this.solUpCorners = false;
    this.solMiddleLayer = false;
    this.solLastCross1 = false;

    // this.worker = new Worker(
    //   new URL('./solver/solver.wolker.js', import.meta.url),
    //   {
    //     type: 'module',
    //   }
    // );
    // this.worker.onmessage = this.onSolveFinished.bind(this);
  }

  // onSolveFinished(e) {
  //   console.log('Worker result:', e.data);
  // }

  updateResetButtons() {
    // console.log('cubeState.R', this.cubeState.U);
    if (this.cubeState.isSolved()) {
      // console.log('ON', this.isSolved);
      scrambleBtn.disabled = false;
    } else {
      // console.log('OFF', this.isSolved);
      scrambleBtn.disabled = true;
    }

    if (this.isSolving) {
      // console.log('Solving');
      // console.log('MOV___ABLE___OFF');
      solveFisrtSide.disabled = true;
      solveSecondSide.disabled = true;
      solveThirdSide.disabled = true;
      solveFourthSide.disabled = true;
      solveFifthSixSide.disabled = true;
      solveEdges1.disabled = true;
      solveEdges2.disabled = true;
      solveUpCross.disabled = true;
      solveUpCorners.disabled = true;
      solveMiddleLayer.disabled = true;
      return;
    }

    if (this.cubeState.isSolvedU()) {
      this.solSide1 = true;
      solveFisrtSide.disabled = true;
      // console.log('IF___ABLE___OFF');
    } else {
      this.solSide1 = false;
      solveFisrtSide.disabled = false;
      solveFisrtSide.disabled = this.cubeState.size < 4;
      // console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedD() && this.solSide1) {
      this.solSide2 = true;
      solveSecondSide.disabled = true;
      // console.log('IF___ABLE___OFF');
    } else {
      this.solSide2 = false;
      solveSecondSide.disabled = false;
      solveSecondSide.disabled = this.cubeState.size < 4;
      // console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedF() && this.solSide2) {
      this.solSide3 = true;
      solveThirdSide.disabled = true;
      // console.log('IF___ABLE___OFF');
    } else {
      this.solSide3 = false;
      solveThirdSide.disabled = false;
      solveThirdSide.disabled = this.cubeState.size < 4;
      // console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedR() && this.solSide3) {
      this.solSide4 = true;
      solveFourthSide.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solSide4 = false;
      solveFourthSide.disabled = false;
      solveFourthSide.disabled = this.cubeState.size < 4;
      //  console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedB() && this.solSide4) {
      this.solSide5 = true;
      solveFifthSixSide.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solSide5 = false;
      solveFifthSixSide.disabled = false;
      solveFifthSixSide.disabled = this.cubeState.size < 4;
      //  console.log('ABLE___ON');
    }

    if (
      this.cubeState.isSolvedEgdesU() &&
      this.cubeState.isSolvedEgdesD() &&
      this.cubeState.isSolvedEgdesL() &&
      this.solSide5
    ) {
      this.solEdge1 = true;
      solveEdges1.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solEdge1 = false;
      solveEdges1.disabled = false;
      solveEdges1.disabled = this.cubeState.size < 4;
      //  console.log('ABLE___ON');
    }

    if (this.cubeState.isSolvedEgdesR() && this.solEdge1) {
      this.solEdge2 = true;
      solveEdges2.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solEdge2 = false;
      solveEdges2.disabled = false;
      solveEdges2.disabled = this.cubeState.size < 4;
      //  console.log('ABLE___ON');
    }

    if (
      this.cubeState
        .getCol('U', 0)
        .slice(1, -1)
        .every(el => el === 'WO') &&
      this.cubeState
        .getRow('U', 0)
        .slice(1, -1)
        .every(el => el === 'WB') &&
      this.cubeState
        .getCol('U', this.cubeState.size - 1)
        .slice(1, -1)
        .every(el => el === 'WR') &&
      this.cubeState
        .getRow('U', this.cubeState.size - 1)
        .slice(1, -1)
        .every(el => el === 'WG') &&
      this.solEdge2
    ) {
      this.solUpCross = true;
      solveUpCross.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solUpCross = false;
      solveUpCross.disabled = false;
      solveUpCross.disabled = this.cubeState.size < 3;

      //  console.log('ABLE___ON');
    }

    if (
      this.cubeState.getCell('U', 0, 0) === 'WOB' &&
      this.cubeState.getCell('U', 0, this.cubeState.size - 1) === 'WBR' &&
      this.cubeState.getCell('U', this.cubeState.size - 1, 0) === 'WGO' &&
      this.cubeState.getCell(
        'U',
        this.cubeState.size - 1,
        this.cubeState.size - 1
      ) === 'WRG' &&
      this.solUpCross
    ) {
      this.solUpCorners = true;
      solveUpCorners.disabled = true;
    } else {
      this.solUpCorners = false;
      solveUpCorners.disabled = false;
    }

    if (
      this.cubeState
        .getCol('F', 0)
        .slice(1, -1)
        .every(el => el === 'GO') &&
      this.cubeState
        .getCol('R', 0)
        .slice(1, -1)
        .every(el => el === 'RG') &&
      this.cubeState
        .getCol('B', 0)
        .slice(1, -1)
        .every(el => el === 'BR') &&
      this.cubeState
        .getCol('L', 0)
        .slice(1, -1)
        .every(el => el === 'OB') &&
      this.solUpCorners
    ) {
      this.solMiddleLayer = true;
      solveMiddleLayer.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solMiddleLayer = false;
      solveMiddleLayer.disabled = false;
      solveMiddleLayer.disabled = this.cubeState.size < 3;

      //  console.log('ABLE___ON');
    }

    if (
      this.cubeState
        .getCol('D', 0)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      this.cubeState
        .getRow('D', 0)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      this.cubeState
        .getCol('D', this.cubeState.size - 1)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      this.cubeState
        .getRow('D', this.cubeState.size - 1)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      this.solMiddleLayer
    ) {
      this.solLastCross1 = true;
      solveLastCollectCross.disabled = true;
      //    console.log('IF___ABLE___OFF');
    } else {
      this.solLastCross1 = false;
      solveLastCollectCross.disabled = false;
      solveLastCollectCross.disabled = this.cubeState.size < 3;

      //  console.log('ABLE___ON');
    }

    // if (this.isMoving) {
    //   console.log('Moving');
    //   console.log('MOV___ABLE___OFF');
    //   solveFisrtSide.disabled = true;
    //   solveSecondSide.disabled = true;
    // }

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

    const finalState = this.cubeState.clone();
    finalState.execute(sequence);

    this.finalScrambleState = finalState;

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

  // waitForSolution(solution) {
  //   return new Promise(resolve => {
  //     const oldOnAnimationEnd = this.onAnimationEnd;

  //     this.onAnimationEnd = () => {
  //       oldOnAnimationEnd.call(this);
  //       this.onAnimationEnd = oldOnAnimationEnd;
  //       resolve();
  //     };

  //     this.execute(solution);
  //   });
  // }

  waitForSolution(solution, callOnAnimationEnd = true) {
    return new Promise(resolve => {
      const oldOnAnimationEnd = this.onAnimationEnd;

      this.onAnimationEnd = () => {
        if (callOnAnimationEnd) {
          oldOnAnimationEnd.call(this);
        }

        this.onAnimationEnd = oldOnAnimationEnd;
        resolve();
      };

      this.execute(solution);
    });
  }
  async onSolve1thSide() {
    this.isSolving = true;
    this.updateResetButtons();

    // settingsBackdropEl.classList.add('is-open', 'is-loading');
    // loaderEl.classList.remove('is-hidden');
    // this.destroyLoader = createRubikLoader(loaderEl);

    // this.worker.postMessage({
    //   type: 'solve1',
    //   state: this.cubeState,
    // });
    await this.rotateCubeSpace('y', Math.PI / 2);

    let result = onSolve1thSideSol(this.cubeState);
    this.solutions[0] = result.solution;
    this.finalStates[0] = result.state;

    await this.waitForSolution(this.solutions[0]);
    await this.rotateCubeSpace('y', -Math.PI / 2);
    this.isSolving = false;
    this.updateResetButtons();
  }

  // async onSolveFinished(e) {
  //   const result = e.data;

  //   if (result.type === 'solve2Finished') {
  //     this.solutions[0] = result.solution1;
  //     this.finalStates[0] = restoreCubeState(result.state1);

  //     this.solutions[1] = result.solution2;
  //     this.finalStates[1] = restoreCubeState(result.state2);

  //     // this.destroyLoader?.();
  //     // settingsBackdropEl.classList.remove('is-open', 'is-loading');
  //     // loaderEl.classList.add('is-hidden');

  //     if (!this.solSide1) {
  //       await this.rotateCubeSpace('y', Math.PI / 2);
  //       await this.waitForSolution(this.solutions[0]);
  //       await this.rotateCubeSpace('y', -Math.PI / 2);

  //       startAnimationMode();
  //     }

  //     await this.rotateCubeSpace('x', -Math.PI);
  //     await this.waitForSolution(this.solutions[1]);
  //     await this.rotateCubeSpace('x', Math.PI);

  //     this.isSolving = false;
  //     this.updateResetButtons();

  //     return;
  //   }

  //   this.solutions[0] = result.solution;
  //   this.finalStates[0] = restoreCubeState(result.state);

  //   // this.destroyLoader?.();
  //   // settingsBackdropEl.classList.remove('is-open', 'is-loading');
  //   // loaderEl.classList.add('is-hidden');

  //   await this.rotateCubeSpace('y', Math.PI / 2);
  //   await this.waitForSolution(this.solutions[0]);
  //   await this.rotateCubeSpace('y', -Math.PI / 2);

  //   this.isSolving = false;
  //   this.updateResetButtons();
  // }

  async onSolve2thSide(startAnimationMode) {
    this.isSolving = true;
    this.updateResetButtons();

    // settingsBackdropEl.classList.add('is-open', 'is-loading');
    // loaderEl.classList.remove('is-hidden');
    // this.destroyLoader = createRubikLoader(loaderEl);

    // this.worker.postMessage({
    //   type: 'solve2',
    //   state: this.cubeState,
    //   solution1: this.solutions[0],
    //   finalState1: this.finalStates[0],
    // });

    let result;
    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      result = onSolve2thSideSol(firstResult.state);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    } else {
      result = onSolve2thSideSol(this.cubeState);
    }
    this.finalStates[1] = result.state;
    this.solutions[1] = result.solution;

    this.isSolving = true;
    this.updateResetButtons();
    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0]);
      await this.rotateCubeSpace('y', -Math.PI / 2);

      startAnimationMode();
    }
    await this.rotateCubeSpace('x', -Math.PI);

    await this.waitForSolution(this.solutions[1]);

    await this.rotateCubeSpace('x', Math.PI);
    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve3thSide(startAnimationMode) {
    console.log(this.finalStates[0]);

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
      console.log(this.finalStates[0]);
    }

    console.log(this.finalStates[0]);

    if (!this.solSide2) {
      console.log('I am here');
      console.log(this.finalStates[0]);
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
      console.log(this.finalStates[1]);
    }

    const thirdResult = onSolve3thSideSol(this.finalStates[1]);
    this.solutions[2] = thirdResult.solution;
    this.finalStates[2] = thirdResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);

      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[2]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve4thSide(startAnimationMode) {
    let result;

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    const fourthResult = onSolve4thSideSol(this.finalStates[2]);
    this.solutions[3] = fourthResult.solution;
    this.finalStates[3] = fourthResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
      startAnimationMode();
    }

    await this.rotateCubeSpace('y', -Math.PI / 2);
    await this.waitForSolution(this.solutions[3]);
    await this.rotateCubeSpace('y', Math.PI / 2);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve5thSide(startAnimationMode) {
    let result;

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    const fifthResult = onSolve5thSideSol(this.finalStates[3]);
    this.solutions[4] = fifthResult.solution;
    this.finalStates[4] = fifthResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      startAnimationMode();
    }

    await this.rotateCubeSpace('y', -Math.PI / 2);
    await this.rotateCubeSpace('y', -Math.PI / 2);
    await this.waitForSolution(this.solutions[4]);
    await this.rotateCubeSpace('y', Math.PI / 2);
    await this.rotateCubeSpace('y', Math.PI / 2);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve6thEdges(startAnimationMode) {
    let result;

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }
    // console.log(
    //   'cubeState',
    //   this.cubeState.getCell('F', 1, this.cubeState.size - 1)
    // );
    // console.log(
    //   'finalStates[4]',
    //   this.finalStates[4].getCell('F', 1, this.finalStates[4].size - 1)
    // );

    const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
    // const sixthResult = onSolve6thEdgeSol(this.cubeState);
    this.solutions[5] = sixthResult.solution;
    this.finalStates[5] = sixthResult.state;

    // if (this.finalStates[5].isSolvedEgdesR() && this.solEdge2) {
    //   this.solutions[6] = [];
    //   this.finalStates[6] = this.finalStates[5].clone();
    // }

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[5]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve7thEdges(startAnimationMode) {
    let result;

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }

    if (!this.solEdge1) {
      const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
      this.solutions[5] = sixthResult.solution;
      this.finalStates[5] = sixthResult.state;
    }

    const seventhResult = onSolve7thEdgeSol(this.finalStates[5]);
    // const seventhResult = onSolve7thEdgeSol(this.cubeState);
    this.solutions[6] = seventhResult.solution;
    this.finalStates[6] = seventhResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solEdge1) {
      await this.waitForSolution(this.solutions[5], false);
      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[6]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve8thCrossSol(startAnimationMode) {
    let result;
    const solved = [
      this.solSide1,
      this.solSide2,
      this.solSide3,
      this.solSide4,
      this.solSide5,
      this.solEdge1,
      this.solEdge2,
    ];

    solved.forEach((isSolved, i) => {
      if (isSolved && !this.solutions[i]) {
        this.solutions[i] = [];
        this.finalStates[i] = this.cubeState.clone();
      }
    });

    if (this.cubeState.size === 3) {
      const eighthResult = onSolve8thCrossSol(this.cubeState);

      this.solutions[7] = eighthResult.solution;
      this.finalStates[7] = eighthResult.state;

      this.isSolving = true;
      this.updateResetButtons();

      await this.waitForSolution(this.solutions[7]);

      this.isSolving = false;
      this.updateResetButtons();

      return;
    }

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }

    if (!this.solEdge1) {
      const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
      this.solutions[5] = sixthResult.solution;
      this.finalStates[5] = sixthResult.state;
    }

    if (!this.solEdge2) {
      const seventhResult = onSolve7thEdgeSol(this.finalStates[5]);
      this.solutions[6] = seventhResult.solution;
      this.finalStates[6] = seventhResult.state;
    }

    const eighthResult = onSolve8thCrossSol(this.finalStates[6]);
    // const seventhResult = onSolve7thEdgeSol(this.cubeState);
    this.solutions[7] = eighthResult.solution;
    this.finalStates[7] = eighthResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solEdge1) {
      await this.waitForSolution(this.solutions[5], false);
    }

    if (!this.solEdge2) {
      await this.waitForSolution(this.solutions[6], false);
      startAnimationMode();
    }
    console.log('current', this.cubeState.getCell('U', 0, 0));

    console.log('finalStates[6]', this.finalStates[6].getCell('U', 0, 0));
    await this.waitForSolution(this.solutions[7]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve9thCornersSol(startAnimationMode) {
    let result;
    const solved = [
      this.solSide1,
      this.solSide2,
      this.solSide3,
      this.solSide4,
      this.solSide5,
      this.solEdge1,
      this.solEdge2,
      this.solUpCross,
    ];

    solved.forEach((isSolved, i) => {
      if (isSolved && !this.solutions[i]) {
        this.solutions[i] = [];
        this.finalStates[i] = this.cubeState.clone();
      }
    });
    // if (this.cubeState.size === 2) {
    //   const ninthResult = onSolve9thCornersSol(this.cubeState);

    //   this.solutions[8] = ninthResult.solution;
    //   this.finalStates[8] = ninthResult.state;

    //   this.isSolving = true;
    //   this.updateResetButtons();

    //   await this.waitForSolution(this.solutions[8]);

    //   this.isSolving = false;
    //   this.updateResetButtons();

    //   return;
    // }

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }

    if (!this.solEdge1) {
      const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
      this.solutions[5] = sixthResult.solution;
      this.finalStates[5] = sixthResult.state;
    }

    if (!this.solEdge2) {
      const seventhResult = onSolve7thEdgeSol(this.finalStates[5]);
      this.solutions[6] = seventhResult.solution;
      this.finalStates[6] = seventhResult.state;
    }

    if (!this.solUpCross) {
      const eighthResult = onSolve8thCrossSol(this.finalStates[6]);
      this.solutions[7] = eighthResult.solution;
      this.finalStates[7] = eighthResult.state;
    }

    const ninthResult = onSolve9thCornersSol(this.finalStates[7]);
    this.solutions[8] = ninthResult.solution;
    this.finalStates[8] = ninthResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solEdge1) {
      await this.waitForSolution(this.solutions[5], false);
    }

    if (!this.solEdge2) {
      await this.waitForSolution(this.solutions[6], false);
    }

    if (!this.solUpCross) {
      await this.waitForSolution(this.solutions[7], false);
      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[8]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve10thMiddleSol(startAnimationMode) {
    let result;

    const solved = [
      this.solSide1,
      this.solSide2,
      this.solSide3,
      this.solSide4,
      this.solSide5,
      this.solEdge1,
      this.solEdge2,
      this.solUpCross,
      this.solUpCorners,
    ];

    solved.forEach((isSolved, i) => {
      if (isSolved && !this.solutions[i]) {
        this.solutions[i] = [];
        this.finalStates[i] = this.cubeState.clone();
      }
    });

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }

    if (!this.solEdge1) {
      const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
      this.solutions[5] = sixthResult.solution;
      this.finalStates[5] = sixthResult.state;
    }

    if (!this.solEdge2) {
      const seventhResult = onSolve7thEdgeSol(this.finalStates[5]);
      this.solutions[6] = seventhResult.solution;
      this.finalStates[6] = seventhResult.state;
    }

    if (!this.solUpCross) {
      const eighthResult = onSolve8thCrossSol(this.finalStates[6]);
      this.solutions[7] = eighthResult.solution;
      this.finalStates[7] = eighthResult.state;
    }

    if (!this.solUpCorners) {
      const ninthResult = onSolve9thCornersSol(this.finalStates[7]);
      this.solutions[8] = ninthResult.solution;
      this.finalStates[8] = ninthResult.state;
    }

    const tenthResult = onSolve10thMiddleSol(this.finalStates[8]);

    this.solutions[9] = tenthResult.solution;
    this.finalStates[9] = tenthResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solEdge1) {
      await this.waitForSolution(this.solutions[5], false);
    }

    if (!this.solEdge2) {
      await this.waitForSolution(this.solutions[6], false);
    }

    if (!this.solUpCross) {
      await this.waitForSolution(this.solutions[7], false);
    }

    if (!this.solUpCorners) {
      await this.waitForSolution(this.solutions[8], false);
      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[9]);

    this.isSolving = false;
    this.updateResetButtons();
  }

  async onSolve11thCrossSol(startAnimationMode) {
    let result;

    const solved = [
      this.solSide1,
      this.solSide2,
      this.solSide3,
      this.solSide4,
      this.solSide5,
      this.solEdge1,
      this.solEdge2,
      this.solUpCross,
      this.solUpCorners,
      this.solMiddleLayer,
    ];

    solved.forEach((isSolved, i) => {
      if (isSolved && !this.solutions[i]) {
        this.solutions[i] = [];
        this.finalStates[i] = this.cubeState.clone();
      }
    });

    if (!this.solSide1) {
      const firstResult = onSolve1thSideSol(this.cubeState);
      this.solutions[0] = firstResult.solution;
      this.finalStates[0] = firstResult.state;
    }

    if (!this.solSide2) {
      const secondResult = onSolve2thSideSol(this.finalStates[0]);
      this.solutions[1] = secondResult.solution;
      this.finalStates[1] = secondResult.state;
    }

    if (!this.solSide3) {
      const thirdResult = onSolve3thSideSol(this.finalStates[1]);
      this.solutions[2] = thirdResult.solution;
      this.finalStates[2] = thirdResult.state;
    }

    if (!this.solSide4) {
      const fourthResult = onSolve4thSideSol(this.finalStates[2]);
      this.solutions[3] = fourthResult.solution;
      this.finalStates[3] = fourthResult.state;
    }

    if (!this.solSide5) {
      const fifthResult = onSolve5thSideSol(this.finalStates[3]);
      this.solutions[4] = fifthResult.solution;
      this.finalStates[4] = fifthResult.state;
    }

    if (!this.solEdge1) {
      const sixthResult = onSolve6thEdgeSol(this.finalStates[4]);
      this.solutions[5] = sixthResult.solution;
      this.finalStates[5] = sixthResult.state;
    }

    if (!this.solEdge2) {
      const seventhResult = onSolve7thEdgeSol(this.finalStates[5]);
      this.solutions[6] = seventhResult.solution;
      this.finalStates[6] = seventhResult.state;
    }

    if (!this.solUpCross) {
      const eighthResult = onSolve8thCrossSol(this.finalStates[6]);
      this.solutions[7] = eighthResult.solution;
      this.finalStates[7] = eighthResult.state;
    }

    if (!this.solUpCorners) {
      const ninthResult = onSolve9thCornersSol(this.finalStates[7]);
      this.solutions[8] = ninthResult.solution;
      this.finalStates[8] = ninthResult.state;
    }

    if (!this.solMiddleLayer) {
      const tenthResult = onSolve10thMiddleSol(this.finalStates[8]);
      this.solutions[9] = tenthResult.solution;
      this.finalStates[9] = tenthResult.state;
    }

    const eleventhResult = onSolve11thCrossSol(this.finalStates[9]);

    this.solutions[10] = eleventhResult.solution;
    this.finalStates[10] = eleventhResult.state;

    this.isSolving = true;
    this.updateResetButtons();

    if (!this.solSide1) {
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.waitForSolution(this.solutions[0], false);
      await this.rotateCubeSpace('y', -Math.PI / 2);
    }

    if (!this.solSide2) {
      await this.rotateCubeSpace('x', -Math.PI);
      await this.waitForSolution(this.solutions[1], false);
      await this.rotateCubeSpace('x', Math.PI);
    }

    if (!this.solSide3) {
      await this.waitForSolution(this.solutions[2], false);
    }

    if (!this.solSide4) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[3], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solSide5) {
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.rotateCubeSpace('y', -Math.PI / 2);
      await this.waitForSolution(this.solutions[4], false);
      await this.rotateCubeSpace('y', Math.PI / 2);
      await this.rotateCubeSpace('y', Math.PI / 2);
    }

    if (!this.solEdge1) {
      await this.waitForSolution(this.solutions[5], false);
    }

    if (!this.solEdge2) {
      await this.waitForSolution(this.solutions[6], false);
    }

    if (!this.solUpCross) {
      await this.waitForSolution(this.solutions[7], false);
    }

    if (!this.solUpCorners) {
      await this.waitForSolution(this.solutions[8], false);
    }

    if (!this.solMiddleLayer) {
      await this.waitForSolution(this.solutions[9], false);
      startAnimationMode();
    }

    await this.waitForSolution(this.solutions[10]);

    this.isSolving = false;
    this.updateResetButtons();
  }
}
