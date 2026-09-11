export function onSolve2thSideSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  function createEmpty() {
    let a = calcState.getCol('B', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'Y').length;
    let b = calcState.getRow('B', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'Y').length;
    let c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'Y').length;
    let d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'Y').length;

    console.log(calcState.getCol('B', index).slice(1, -1));
    console.log(calcState.getRow('B', index).slice(1, -1));
    console.log(calcState.getCol('B', calcState.size - index - 1).slice(1, -1));
    console.log(calcState.getRow('B', calcState.size - index - 1).slice(1, -1));

    console.log(countWa, countWb, countWc, countWd);

    if (countWb < countWa && countWb <= countWc && countWb <= countWd) {
      apply("B'");
      console.log('Bmin');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWc < countWa && countWc <= countWb && countWc <= countWd) {
      console.log('Cmin');
      apply('2B');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWd < countWa && countWd <= countWb && countWd <= countWc) {
      console.log('Dmin');
      apply('B');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    }
    checkEmptySides();
  }

  function checkEmptySides() {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el !== 'Y')) {
      console.log('ReturnEmptySides');
      return;
    }
    checkEmptySide('R', 'D', index);
    checkEmptySide('F', '2D', index);
    checkEmptySide('L', "D'", index);
  }

  function checkEmptySide(face, move, index) {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el !== 'Y')) {
      console.log('ReturnEmptySide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    console.log('aB', aB);
    console.log(a);
    const array = [];
    a.forEach((el, idx) => {
      console.log(calcState.size - idx - 1);
      console.log(calcState.size - idx - 3);
      if (el !== 'Y' && aB[idx] === 'Y') {
        console.log(el);
        console.log('aB', aB[idx]);
        array.push(calcState.size - idx - 1);
      }
    });
    console.log(face, array);
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkCentralSides() {
    let aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSides');
      return;
    }
    checkCentralSide('R', 'D', index);
    // aB = calcState.getCol('B', index).slice(1, -1);
    // if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
    //   console.log('ReturnSides');
    //   return;
    // }
    checkCentralSide('F', '2D', index);
    // aB = calcState.getCol('B', index).slice(1, -1);
    // if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
    //   console.log('ReturnSides');
    //   return;
    // }
    checkCentralSide('L', "D'", index);
    // aB = calcState.getCol('B', index).slice(1, -1);
    // if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
    //   console.log('ReturnSides');
    //   return;
    // }
  }

  function checkCentralSide(face, move, index) {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    console.log('aB', aB);
    console.log(a);
    const array = [];
    a.forEach((el, idx) => {
      console.log(calcState.size - idx - 1);
      console.log(calcState.size - idx - 3);
      if (el === 'Y' && aB[idx] !== 'Y') {
        console.log(el);
        console.log('aB', aB[idx]);
        array.push(calcState.size - idx - 1);
      }
    });
    console.log(face, array);
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function createCentralLine() {
    let a = calcState.getCol('B', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'Y').length;
    let b = calcState.getRow('B', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'Y').length;

    console.log(calcState.getCol('B', index).slice(1, -1));
    console.log(calcState.getRow('B', index).slice(1, -1));

    console.log(countWa, countWb);

    if (countWb > countWa) {
      apply("B'");
      console.log('Bmax');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    }

    checkCentralSides();
    let aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    apply('2F');
    apply('2L');
    checkCentralSides();
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('R');
    apply('F');
    apply('L');
    checkCentralSides();
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    apply('2F');
    apply('2L');
    checkCentralSides();
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }

    apply(`D'(${index + 1})`);
    apply('R');
    checkCentralSide('R', 'D', index);
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    checkCentralSide('R', 'D', index);

    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
      console.log('ReturnSides');
      return;
    }
    // apply('2R');

    // checkCentralSide('R', 'D', index);
    // aB = calcState.getCol('B', index).slice(1, -1);
    // if (aB.every((el, i) => i === index - 1 || el === 'Y')) {
    //   console.log('ReturnSides');
    //   return;
    // } else {
    //   console.log('NotSolved');
    //   createCentralLine();
    // }
  }

  function checkSides() {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'Y')) {
      console.log('ReturnSides');
      return;
    }
    checkSide('R', 'D', index);
    checkSide('F', '2D', index);
    checkSide('L', "D'", index);
  }

  function checkSide(face, move, index) {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'Y')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    console.log('aB', aB);
    console.log(a);
    const array = [];
    a.forEach((el, idx) => {
      console.log(calcState.size - idx - 1);
      console.log(calcState.size - idx - 3);
      if (el === 'Y' && aB[idx] !== 'Y') {
        console.log(el);
        console.log('aB', aB[idx]);
        array.push(calcState.size - idx - 1);
      }
    });
    console.log(face, array);
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkSideBc() {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'Y')) {
      console.log('ReturnBc');
      return;
    }
    const c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
    console.log('aB', aB);
    console.log('c', c);
    const array = [];
    c.forEach((el, idx) => {
      console.log(calcState.size - idx - 1);
      console.log(calcState.size - idx - 3);
      if (el === 'Y' && aB[calcState.size - idx - 3] !== 'Y') {
        console.log(el);
        console.log('af', aB[calcState.size - idx - 3]);
        array.push(idx + 2);
      }
    });
    console.log(array);
    // array.reverse();
    // console.log(array);

    if (array.length > 0) {
      apply("B'");
      apply(`D'(${calcState.size - index})`);
      apply('B');
      apply("R'");
      apply(`D[${array.join(',')}]`);
    }
  }

  function checkSideBb() {
    let aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'Y')) {
      console.log('ReturnDf');
      return;
    }
    let b = calcState.getRow('B', index).slice(1, -1);
    console.log('aB', aB);
    console.log('b', b);
    console.log('index', index);
    const arrayN = [];
    b.map((el, idx) => {
      console.log(idx + 1);

      if (el === 'Y') {
        console.log(el);
        console.log('aB', aB[idx + 1]);
        if (
          aB[calcState.size - idx - 3] !== 'Y' &&
          calcState.size - idx - 3 !== calcState.size - index - 2
          // idx !== calcState.size - index - 2
        ) {
          console.log('I am here');
          arrayN.push(idx + 2);
        }
      }
    });
    console.log('arrayN', arrayN);

    if (arrayN.length > 0) {
      apply("B'");
      apply(`D'[${arrayN.join(',')}]`);
      apply('B');
      apply(`D[${arrayN.join(',')}]`);
    }
  }

  function checkSideBd() {
    const aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'Y')) {
      console.log('ReturnDf');

      return;
    }
    let d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    console.log('aB', aB);
    console.log('d', d);

    let arrayD = [];
    d.map((el, idx) => {
      console.log(calcState.size - idx - 1);
      console.log(calcState.size - idx - 3);
      if (el === 'Y') {
        console.log(el);
        console.log('aB', aB[idx]);
        if (
          aB[idx] !== 'Y' &&
          calcState.size - idx - 3 !== calcState.size - index - 2
          // && idx + 1 !== calcState.size - index - 2
        ) {
          console.log('I am here');
          arrayD.push(calcState.size - idx - 1);
        }
      }
    });
    console.log(arrayD);
    arrayD.reverse();
    console.log(arrayD);

    if (arrayD.length > 0) {
      apply('B');
      apply(`D'[${arrayD.join(',')}]`);
      apply("B'");
      apply(`D[${arrayD.join(',')}]`);
    }
  }

  function createLine() {
    let a = calcState.getCol('B', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'Y').length;
    let b = calcState.getRow('B', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'Y').length;
    let c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'Y').length;
    let d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'Y').length;

    console.log(calcState.getCol('B', index).slice(1, -1));
    console.log(calcState.getRow('B', index).slice(1, -1));
    console.log(calcState.getCol('B', calcState.size - index - 1).slice(1, -1));
    console.log(calcState.getRow('B', calcState.size - index - 1).slice(1, -1));

    console.log(countWa, countWb, countWc, countWd);

    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("B'");
      console.log('Bmax');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('2B');
      // console.log('ПОСЛЕ ХОДА:');
      // console.log(calcState.getRow('F', index).slice(1, -1));
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('B');
      console.log('ПОСЛЕ ХОДА:');
      console.log(calcState.getRow('F', index).slice(1, -1));
    }
    // // ------------------------Right A-------------------------

    checkSideBd();
    checkSideBb();
    checkSideBc();

    checkSides();
    let aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    apply('2F');
    apply('2L');

    checkSides();
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('R');
    apply('F');
    apply('L');

    checkSides();
    aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'Y')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    apply('2F');
    apply('2L');
    checkSides();

    // checkSideBb();
    // checkSideBd();
    // checkSideBc();

    // checkSides();
    // aB = calcState.getCol('B', index).slice(1, -1);

    // if (aB.every(el => el === 'Y')) {
    //   console.log('ReturnSide');
    //   return;
    // }
    // apply('2R');
    // apply('2F');
    // apply('2L');

    // checkSides();
    // aB = calcState.getCol('B', index).slice(1, -1);
    // if (aB.every(el => el === 'Y')) {
    //   console.log('ReturnSide');
    //   return;
    // }
    // apply('R');
    // apply('F');
    // apply('L');

    // checkSides();
    // aB = calcState.getCol('B', index).slice(1, -1);

    // if (aB.every(el => el === 'Y')) {
    //   console.log('ReturnSide');
    //   return;
    // }
    // apply('2R');
    // apply('2F');
    // apply('2L');
    // checkSides();

    aB = calcState.getCol('B', index).slice(1, -1);
    console.log('aB', aB);
    if (aB.every(el => el === 'Y')) {
      return;
    } else {
      console.log('NotSolved');
      createLine();
    }
  }

  const calcState = state.clone();

  console.log(calcState.B);

  let solution = [];

  let index = 1;
  if (calcState.size % 2 !== 0) {
    const centralLevel = Math.floor(calcState.size / 2) + 1;
    // console.log(centralLevel);
    index = centralLevel - 1;
    console.log(index);
    createEmpty();
    apply('B');
    apply(`R'(${calcState.size - index})`);
    apply('B');
    apply(`R(${calcState.size - index})`);

    createCentralLine();
    apply('B');
    apply(`R'(${calcState.size - index})`);
    apply('B');
    apply(`R(${calcState.size - index})`);
  }

  const count = Math.floor(calcState.size / 2);
  index = count - 1;

  console.log('count', count);
  // index = 1;
  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createEmpty();
    apply(`R'(${calcState.size - index})`);
    apply('2B');
    apply(`R(${calcState.size - index})`);
    apply('2D');
    createLine();
    apply(`R'(${calcState.size - index})`);
    apply('2B');
    apply(`R(${calcState.size - index})`);
    apply('2D');
    createLine();
    apply(`R'(${calcState.size - index})`);
    apply('2B');
    apply(`R(${calcState.size - index})`);

    index = index - 1;
  }
  return {
    solution,
    state: calcState,
  };
  // return solution;
}
