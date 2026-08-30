export class CubeState {
  constructor(size) {
    console.log('CREATE CubeState', this);
    this.size = size;

    // ====================
    // UP — W
    // ====================
    this.U = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'WOB';
        if (row === 0 && col === size - 1) return 'WBR';
        if (row === size - 1 && col === 0) return 'WGO';
        if (row === size - 1 && col === size - 1) return 'WRG';

        if (row === 0) return 'WB';
        if (row === size - 1) return 'WG';
        if (col === 0) return 'WO';
        if (col === size - 1) return 'WR';

        return 'W';
      })
    );

    // ====================
    // FRONT — G
    // ====================
    this.F = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'GOW';
        if (row === 0 && col === size - 1) return 'GWR';
        if (row === size - 1 && col === 0) return 'GYO';
        if (row === size - 1 && col === size - 1) return 'GRY';

        if (row === 0) return 'GW';
        if (row === size - 1) return 'GY';
        if (col === 0) return 'GO';
        if (col === size - 1) return 'GR';

        return 'G';
      })
    );

    // ====================
    // RIGHT — R
    // ====================
    this.R = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'RGW';
        if (row === 0 && col === size - 1) return 'RWB';
        if (row === size - 1 && col === 0) return 'RYG';
        if (row === size - 1 && col === size - 1) return 'RBY';

        if (row === 0) return 'RW';
        if (row === size - 1) return 'RY';
        if (col === 0) return 'RG';
        if (col === size - 1) return 'RB';

        return 'R';
      })
    );

    // ====================
    // BACK — B
    // ====================
    this.B = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'BRW';
        if (row === 0 && col === size - 1) return 'BWO';
        if (row === size - 1 && col === 0) return 'BYR';
        if (row === size - 1 && col === size - 1) return 'BOY';

        if (row === 0) return 'BW';
        if (row === size - 1) return 'BY';
        if (col === 0) return 'BR';
        if (col === size - 1) return 'BO';

        return 'B';
      })
    );

    // ====================
    // LEFT — O
    // ====================
    this.L = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'OBW';
        if (row === 0 && col === size - 1) return 'OWG';
        if (row === size - 1 && col === 0) return 'OYB';
        if (row === size - 1 && col === size - 1) return 'OGY';

        if (row === 0) return 'OW';
        if (row === size - 1) return 'OY';
        if (col === 0) return 'OB';
        if (col === size - 1) return 'OG';

        return 'O';
      })
    );

    // ====================
    // DOWN — Y
    // ====================
    this.D = Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, col) => {
        if (row === 0 && col === 0) return 'YOG';
        if (row === 0 && col === size - 1) return 'YGR';
        if (row === size - 1 && col === 0) return 'YBO';
        if (row === size - 1 && col === size - 1) return 'YRB';

        if (row === 0) return 'YG';
        if (row === size - 1) return 'YB';
        if (col === 0) return 'YO';
        if (col === size - 1) return 'YR';

        return 'Y';
      })
    );
  }
  // move({ axis, layers, angle }) {}
  rotateFace(face, direction = 1) {
    const m = this[face];
    const size = this.size;

    const rotated = Array.from({ length: size }, () => Array(size));

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (direction === 1) {
          rotated[col][size - 1 - row] = m[row][col];
        } else {
          rotated[size - 1 - col][row] = m[row][col];
        }
      }
    }

    this[face] = rotated;
  }

  moveStrips(strips) {
    const values = strips.map(({ face, cells }) =>
      cells.map(([row, col]) => this[face][row][col])
    );

    strips.forEach(({ face, cells }, i) => {
      const source = values[(i + 3) % 4];

      cells.forEach(([row, col], j) => {
        this[face][row][col] = source[j];
      });
    });
  }

  getRow(face, row) {
    return Array.from({ length: this.size }, (_, col) => [row, col]);
  }

  getCol(face, col) {
    return Array.from({ length: this.size }, (_, row) => [row, col]);
  }

  // moveRightStrip(col, direction = 1) {
  //   const size = this.size;

  //   const U = Array.from({ length: size }, (_, row) => this.U[row][col]);

  //   const B = Array.from(
  //     { length: size },
  //     (_, row) => this.B[size - 1 - row][0]
  //   );

  //   const D = Array.from({ length: size }, (_, row) => this.D[row][col]);

  //   const F = Array.from({ length: size }, (_, row) => this.F[row][col]);

  //   if (direction === 1) {
  //     for (let row = 0; row < size; row++) {
  //       this.B[size - 1 - row][col] = U[row];
  //       this.D[row][col] = B[row];
  //       this.F[row][col] = D[row];
  //       this.U[row][col] = F[row];
  //     }
  //   } else {
  //     for (let row = 0; row < size; row++) {
  //       this.F[row][col] = U[row];
  //       this.D[row][col] = F[row]; // здесь потом проверим направление
  //       this.B[size - 1 - row][col] = D[row];
  //       this.U[row][col] = B[row];
  //     }
  //   }
  // }
  moveRightStrip(col) {
    const size = this.size;
    const backCol = size - 1 - col;

    const U = Array.from({ length: size }, (_, row) => this.U[row][col]);

    const B = Array.from(
      { length: size },
      (_, row) => this.B[size - 1 - row][backCol]
    );

    const D = Array.from({ length: size }, (_, row) => this.D[row][col]);

    const F = Array.from({ length: size }, (_, row) => this.F[row][col]);

    for (let row = 0; row < size; row++) {
      this.B[size - 1 - row][backCol] = U[row];
      this.D[row][col] = B[row];
      this.F[row][col] = D[row];
      this.U[row][col] = F[row];
    }
  }
  // move({ axis, layers, angle }) {
  //   console.log('MOVE:', axis, layers, angle);

  //   if (axis === 'x') {
  //     layers.forEach(group => {
  //       const [from, to] = group.length === 1 ? [group[0], group[0]] : group;

  //       for (let layer = from; layer <= to; layer++) {
  //         console.log('Right layer:', layer);

  //         this.moveRightStrip(layer);
  //       }
  //     });
  //   }
  // }
  // move({ axis, layers, angle }) {
  //   console.log('MOVE:', axis, layers, angle);
  //   if (axis === 'x') {
  //     layers.forEach(({ value }) => {
  //       this.moveRightStrip(value);
  //     });
  //   }
  //   console.log('U', this.U);
  //   console.log('B', this.B);
  //   console.log('D', this.D);
  //   console.log('F', this.F);
  // }
  move({ axis, layers, angle }) {
    let turns = 1;

    if (Math.abs(angle) === Math.PI) {
      turns = 2;
    } else if (angle > 0) {
      turns = 3;
    }

    for (let i = 0; i < turns; i++) {
      if (axis === 'x') {
        layers.forEach(({ value }) => {
          const col = value - 1;

          console.log(`=== слой ${value}, col ${col} ===`);

          this.moveRightStrip(col);

          if (value === this.size) {
            this.rotateFace('R');
          }

          // крайняя L-грань
          if (value === 1) {
            this.rotateFace('L', -1);
          }

          console.log('U:', structuredClone(this.U));
          console.log('B:', structuredClone(this.B));
          console.log('D:', structuredClone(this.D));
          console.log('F:', structuredClone(this.F));
          console.log('R:', structuredClone(this.R));
          console.log('L:', structuredClone(this.L));
        });
      }
      if (axis === 'y') {
        layers.forEach(({ value }) => {
          const row = this.size - value;

          console.log(`Y: слой ${value}, row ${row}`);

          this.moveUpStrip(row);

          if (value === this.size) {
            this.rotateFace('U');
          }

          // крайняя D-грань
          if (value === 1) {
            this.rotateFace('D', -1);
          }
          console.log('F:', structuredClone(this.F));
          console.log('L:', structuredClone(this.L));
          console.log('B:', structuredClone(this.B));
          console.log('R:', structuredClone(this.R));
          console.log('U:', structuredClone(this.U));
          console.log('D:', structuredClone(this.D));
        });
      }

      if (axis === 'z') {
        layers.forEach(({ value }) => {
          const row = value - 1;
          console.log(`Z: слой ${value}, row ${row}`);
          this.moveFrontStrip(row);
          if (value === this.size) {
            this.rotateFace('F');
          }
          if (value === 1) {
            this.rotateFace('B', -1);
          }

          console.log('U:', structuredClone(this.U));
          console.log('R:', structuredClone(this.R));
          console.log('D:', structuredClone(this.D));
          console.log('L:', structuredClone(this.L));
          console.log('F:', structuredClone(this.F));
          console.log('B:', structuredClone(this.B));
        });
      }
    }
  }

  moveUpStrip(row) {
    const size = this.size;

    const F = Array.from({ length: size }, (_, col) => this.F[row][col]);

    const L = Array.from({ length: size }, (_, col) => this.L[row][col]);

    const B = Array.from({ length: size }, (_, col) => this.B[row][col]);

    const R = Array.from({ length: size }, (_, col) => this.R[row][col]);

    for (let col = 0; col < size; col++) {
      this.L[row][col] = F[col];
      this.B[row][col] = L[col];
      this.R[row][col] = B[col];
      this.F[row][col] = R[col];
    }
  }
  moveFrontStrip(row) {
    const size = this.size;
    // const edge = size - 1;

    const U = Array.from({ length: size }, (_, col) => this.U[row][col]);

    console.log('Urow', U);

    const R = Array.from({ length: size }, (_, i) => this.R[i][size - 1 - row]);

    console.log('Rcol', R);

    const D = Array.from(
      { length: size },
      (_, col) => this.D[size - 1 - row][size - 1 - col]
    );
    console.log('Draw', D);

    const L = Array.from({ length: size }, (_, i) => this.L[size - 1 - i][row]);

    for (let i = 0; i < size; i++) {
      this.R[i][size - 1 - row] = U[i];
      this.D[size - 1 - row][size - 1 - i] = R[i];
      this.L[size - 1 - i][row] = D[i];
      this.U[row][i] = L[i];
    }
  }
}
