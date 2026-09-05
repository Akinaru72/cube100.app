export function onSolve1thSide1(state) {
  function apply(move) {
    // console.log(
    //   'ДО:',
    //   calcState.D.map(row => [...row])
    // );

    calcState.execute([move]);
    // console.log(
    //   'ПОСЛЕ:',
    //   calcState.D.map(row => [...row])
    // );

    solution.push(move);
  }

  function checkSide(face, move, index) {
    const af = calcState.getCol('F', index).slice(1, -1);

    if (af.every(el => el === 'W')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    const array = [];
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (el === 'W' && af[idx] !== 'W') {
        // console.log(el);
        // console.log('af', af[calcState.size - idx - 3]);
        array.push(idx + 2);
      }
    });
    // console.log(face, array);
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkSides() {
    const af = calcState.getCol('F', index).slice(1, -1);

    if (af.every(el => el === 'W')) {
      console.log('ReturnSides');
      return;
    }
    checkSide('R', 'U', index);
    checkSide('B', '2U', index);
    checkSide('L', "U'", index);
  }

  function checkSideFc() {
    const af = calcState.getCol('F', index).slice(1, -1);

    if (af.every(el => el === 'W')) {
      console.log('ReturnFc');
      return;
    }
    const c = calcState.getCol('F', calcState.size - index - 1).slice(1, -1);
    // console.log('af', af);
    // console.log('b', c);
    const array = [];
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (el === 'W' && af[calcState.size - idx - 3] !== 'W') {
        // console.log(el);
        // console.log('af', af[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
      }
    });
    // console.log(array);
    array.reverse();
    // console.log(array);

    if (array.length > 0) {
      apply('F');
      apply(`U'(${calcState.size - index})`);
      apply("F'");
      apply('R');
      apply(`U[${array.join(',')}]`);
    }
  }

  function checkSideDf() {
    const af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnDf');

      return;
    }
    let b = calcState.getRow('D', index).slice(1, -1);
    // console.log('af', af);
    // console.log('b', b);
    const array = [];
    b.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (
        el === 'W' &&
        af[calcState.size - idx - 3] !== 'W' &&
        calcState.size - idx - 3 !== calcState.size - index - 2
      ) {
        // console.log(el);
        // console.log('af', af[calcState.size - idx - 3]);
        array.push(calcState.size - 1 - idx);
      }
    });
    // console.log(array);
    array.reverse();
    // console.log(array);

    if (array.length > 0) {
      apply('F');
      apply(`R[${array.join(',')}]`);
      apply("F'");
      apply(`R'[${array.join(',')}]`);
    }

    if (b[index - 1] === 'W') {
      console.log('LEFT WWWW WWW');
      apply('F');
      apply(`R(${calcState.size - index})`);
      apply('F');
      apply(`R'(${calcState.size - index})`);
      apply('2F');
    }
  }

  function checkSideFb() {
    const af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnDf');

      return;
    }
    let b = calcState.getRow('F', index).slice(1, -1);
    // console.log('af', af);
    // console.log('b', b);

    let arrayB = [];
    b.map((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (el === 'W') {
        // console.log(el);
        // console.log('af', af[calcState.size - index - idx - 2]);
        if (af[calcState.size - idx - 3] !== 'W' && idx !== index - 1) {
          // console.log('I am here');
          arrayB.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log(arrayB);
    arrayB.reverse();
    // console.log(arrayB);

    if (arrayB.length > 0) {
      apply("F'");
      apply(`U[${arrayB.join(',')}]`);
      apply('F');
      apply(`U'[${arrayB.join(',')}]`);
    }
  }

  function checkSideFd() {
    const af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnDf');

      return;
    }
    let d = calcState.getRow('F', calcState.size - index - 1).slice(1, -1);
    // console.log('af', af);
    // console.log('d', d);
    // b = calcState.getRow('F', index).slice(1, -1);
    let arrayD = [];
    d.map((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (el === 'W') {
        // console.log(el);
        // console.log('af', af[calcState.size - idx - 3]);
        if (af[idx] !== 'W' && idx !== index - 1) {
          // console.log('I am here');
          arrayD.push(idx + 2);
        }
      }
    });
    // console.log(arrayD);

    if (arrayD.length > 0) {
      apply('F');
      apply(`U[${arrayD.join(',')}]`);
      apply("F'");
      apply(`U'[${arrayD.join(',')}]`);
    }
  }

  // ---------------------------EmptyCheck---------------------------------------

  function checkEmptySide(face, move, index) {
    const af = calcState.getCol('F', index).slice(1, -1);

    if (af.every(el => el !== 'W')) {
      // console.log('ReturnEmptySide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    const array = [];
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - idx - 3);
      if (el !== 'W' && af[idx] === 'W') {
        // console.log(el);
        // console.log('af', af[calcState.size - index - idx - 2]);
        array.push(idx + 2);
      }
    });
    // console.log(face, array);
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkEmptySides() {
    const af = calcState.getCol('F', index).slice(1, -1);

    if (af.every(el => el === 'W')) {
      console.log('ReturnSides');
      return;
    }
    checkEmptySide('R', 'U', index);
    checkEmptySide('B', '2U', index);
    checkEmptySide('L', "U'", index);
  }

  function createEmpty() {
    let a = calcState.getCol('F', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'W').length;
    let b = calcState.getRow('F', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'W').length;
    let c = calcState.getCol('F', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'W').length;
    let d = calcState.getRow('F', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'W').length;

    // console.log(calcState.getCol('F', index).slice(1, -1));
    // console.log(calcState.getRow('F', index).slice(1, -1));
    // console.log(calcState.getCol('F', calcState.size - index - 1).slice(1, -1));
    // console.log(calcState.getRow('F', calcState.size - index - 1).slice(1, -1));

    // console.log(countWa, countWb, countWc, countWd);

    if (countWb < countWa && countWb <= countWc && countWb <= countWd) {
      apply("F'");
      console.log('Bmax');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWc < countWa && countWc <= countWb && countWc <= countWd) {
      console.log('Cmax');
      apply('2F');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWd < countWa && countWd <= countWb && countWd <= countWc) {
      console.log('Dmax');
      apply('F');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    }

    checkEmptySides();
    let af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el !== 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('2R');
    apply('2B');
    apply('2L');
    checkEmptySides();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el !== 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('R');
    apply('B');
    apply('L');
    checkEmptySides();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el !== 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('2R');
    apply('2B');
    apply('2L');
    checkEmptySides();
  }

  // ------------------------------------------------------------------------

  function createLine() {
    let a = calcState.getCol('F', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'W').length;
    let b = calcState.getRow('F', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'W').length;
    let c = calcState.getCol('F', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'W').length;
    let d = calcState.getRow('F', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'W').length;

    // console.log(calcState.getCol('F', index).slice(1, -1));
    // console.log(calcState.getRow('F', index).slice(1, -1));
    // console.log(calcState.getCol('F', calcState.size - index - 1).slice(1, -1));
    // console.log(calcState.getRow('F', calcState.size - index - 1).slice(1, -1));

    // console.log(countWa, countWb, countWc, countWd);

    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("F'");
      console.log('Bmax');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('2F');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('F');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    }
    let arrayA = [];
    let arrayB = [];
    let arrayC = [];
    let arrayD = [];
    // ------------------------Right A-------------------------

    checkSides();
    let af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('2R');
    apply('2B');
    apply('2L');
    checkSides();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('R');
    apply('B');
    apply('L');
    checkSides();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('2R');
    apply('2B');
    apply('2L');
    checkSides();

    // let notSolve = true;
    // while (notSolve) {

    // ---------------------Clear D----------------------------
    // checkSideFd();
    // checkSideFc();
    // // // -----------------------------B------------------------------
    // checkSideFb();

    // // ------------------------C-------------------------
    // checkSideFc();
    // // ------------------------D-------------------------
    // checkSideFd();

    // // ------------------------C-------------------------
    checkSideFc();
    // // -----------------------Down---------------------
    checkSideDf();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('D');
    checkSideDf();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('D');
    checkSideDf();
    af = calcState.getCol('F', index).slice(1, -1);
    if (af.every(el => el === 'W')) {
      console.log('ReturnLine');
      return;
    }
    apply('D');
    checkSideDf();
    // // -------------------------------Front---------------------------
    // // -------------------------------C---------------------------
    checkSideFc();
    // // -----------------------------B------------------------------
    checkSideFb();

    // ------------------------C-------------------------
    checkSideFc();
    // ------------------------D-------------------------
    checkSideFd();

    // ------------------------C-------------------------
    checkSideFc();

    af = calcState.getCol('F', index).slice(1, -1);
    console.log('AFincheckSidesFD', af);
    if (af.every(el => el === 'W')) {
      return;
    } else {
      console.log('NotSolved');
      createLine();
    }

    // ---------------------------End--------------------------
  }

  const calcState = state.clone();
  // console.log(calcState.size);
  // let solution = ['U(' + (calcState.size - 2) + ')'];

  // let solution = ['U'];
  // let solution = ["U'[1,3,5,7]"];
  let solution = [];
  // let arrayA = [3, 7, 9];
  // apply('F');
  // apply('D');
  // apply(`R[${arrayA.join(',')}]`);
  // apply("F'");
  // apply(`R'[${arrayA.join(',')}]`);
  // apply("D'");

  // let array = [1, 6];
  // apply(`U'[${array.join(',')}]`);
  let index = 1;
  if (calcState.size % 2 !== 0) {
    const centralLevel = Math.floor(calcState.size / 2) + 1;
    // console.log(centralLevel);
    index = centralLevel - 1;
    console.log(index);
    createEmpty();
    apply(`R(${calcState.size - index})`);

    const centalF = calcState.getCell('F', centralLevel - 1, centralLevel - 1);
    console.log('F =', centalF);
    const centalU = calcState.getCell('U', centralLevel - 1, centralLevel - 1);
    console.log('U =', centalU);
    const centalR = calcState.getCell('R', centralLevel - 1, centralLevel - 1);
    console.log('R =', centalR);
    const centalL = calcState.getCell('L', centralLevel - 1, centralLevel - 1);
    console.log('L =', centalL);
    const centalB = calcState.getCell('B', centralLevel - 1, centralLevel - 1);
    console.log('B =', centalB);
    const centalD = calcState.getCell('D', centralLevel - 1, centralLevel - 1);
    console.log('D =', centalD);
    if (centalU === 'W') {
      apply(`R'(${centralLevel})`);
    } else if (centalB === 'W') {
      apply(`2R(${centralLevel})`);
    } else if (centalD === 'W') {
      apply(`R(${centralLevel})`);
    } else if (centalL === 'W') {
      apply(`U'(${centralLevel})`);
    } else if (centalR === 'W') {
      apply(`U(${centralLevel})`);
    }

    createLine();
    apply(`R(${calcState.size - index})`);
  }
  const count = Math.floor(calcState.size / 2);
  index = count - 1;

  console.log('count', count);
  for (let i = 1; i < count; i++) {
    console.log(index);
    createEmpty();
    apply(`R(${calcState.size - index})`);
    apply('2U');
    createLine();
    apply(`R(${calcState.size - index})`);
    apply('2U');
    createLine();
    apply(`R(${calcState.size - index})`);
    index = index - 1;
  }

  return solution;
}
