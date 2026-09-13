export function onSolve4thSideSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  function reverseMove(move) {
    return move.endsWith("'") ? move.slice(0, -1) : `${move}'`;
  }

  function checkSide(face, move, index) {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'R')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    const array = [];
    const arrayIndex = [];
    console.log('a', a);
    console.log('aB', aB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'R' && aB[idx] !== 'R') {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aB', aB[idx]);
        if (idx === index - 1) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
      }
    });
    console.log(face, array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
      apply('B');
      apply(`${reverseMove(move)}[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`${move}[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`${reverseMove(move)}[${arrayIndex.join(',')}]`);
      apply('B');
    }
  }

  function checkSideBl() {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'R')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol('R', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aB', aB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'R' && aB[idx] !== 'R' && idx < calcState.size - index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aB[idx]);
        if (idx === index - 1) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
      apply('B');
      apply(`U[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('B');
    }
  }

  function checkSideBr() {
    const aB = calcState.getCol('B', index).slice(1, -1);

    if (aB.every(el => el === 'R')) {
      console.log('ReturnSide');
      return;
    }
    apply('2R');
    const a = calcState.getCol('R', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aB', aB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'R' && aB[idx] !== 'R' && idx > index - 2) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aB', aB[idx]);
        if (idx === index - 1) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
      apply('B');
      apply(`U[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('B');
    }
    apply('2R');
  }

  function checkSides() {
    checkSide('L', 'U', index);
    let aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    apply('L');
    checkSide('L', 'U', index);
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    apply('L');
    checkSide('L', 'U', index);
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    apply('L');
    checkSide('L', 'U', index);
    aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    checkSideBl();
    // checkSideBr();
  }

  function checkSideBc() {
    const aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    const c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('c', c);
    console.log('aB', aB);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aB', aB[calcState.size - idx - 3]);
      if (el === 'R' && aB[calcState.size - idx - 3] !== 'R') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aB', aB[calcState.size - idx - 3]);
        // array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 3 === index - 1) {
          arrayIndex.push(calcState.size - idx - 1);
        } else {
          array.push(calcState.size - idx - 1);
        }
        // if (calcState.size - idx - 2 >= calcState.size - index - 1) {
        //   arrayR.push(calcState.size - idx - 1);
        // }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply('B');
      apply(`U'(${calcState.size - index})`);
      apply('2L');
      apply(`U(${calcState.size - index})`);
      apply("B'");
      apply("L'");
      apply(`U[${array.join(',')}]`);
      apply('B');
      apply(`U'[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`U[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`U'[${arrayIndex.join(',')}]`);
      apply('B');
    }
  }

  function checkSideBb() {
    const aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    const b = calcState.getRow('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('b', b);
    console.log('aB', aB);
    b.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aB', aB[calcState.size - idx - 3]);
      if (el === 'R' && aB[calcState.size - idx - 3] !== 'R') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aB', aB[calcState.size - idx - 3]);
        // array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 3 === index - 1) {
          arrayIndex.push(calcState.size - idx - 1);
        } else {
          array.push(calcState.size - idx - 1);
        }
        // if (calcState.size - idx - 3 >= calcState.size - index - 1) {
        //   arrayR.push(calcState.size - idx - 1);
        // }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply('B');
      apply(`D[${array.join(',')}]`);
      apply('L');
      apply(`D'[${array.join(',')}]`);
      apply('L');
      apply("B'");
      apply(`U[${array.join(',')}]`);
      apply('B');
      apply(`U'[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`U[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`U'[${arrayIndex.join(',')}]`);
      apply('B');
    }
  }

  function checkSideBd() {
    const aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('ReturnSides');
      return;
    }

    const d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('d', d);
    console.log('aB', aB);
    d.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aB[idx]);
      if (el === 'R' && aB[idx] !== 'R') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aB', aB[idx]);
        // array.push(idx + 2);
        if (idx === index - 1) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
        // if (idx >= calcState.size - index - 1) {
        //   arrayR.push(idx + 2);
        // }
      }
    });

    console.log('array', array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply("B'");
      apply(`D[${array.join(',')}]`);
      apply('L');
      apply(`D'[${array.join(',')}]`);
      apply('L');
      apply('B');
      apply(`U[${array.join(',')}]`);
      apply('B');
      apply(`U'[${array.join(',')}]`);
      apply("B'");
    }

    if (arrayIndex.length > 0) {
      apply(`U[${arrayIndex.join(',')}]`);
      apply("B'");
      apply(`U'[${arrayIndex.join(',')}]`);
      apply('B');
    }
  }

  function createLine() {
    let a = calcState.getCol('B', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'R').length;
    let b = calcState.getRow('B', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'R').length;
    let c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'R').length;
    let d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'R').length;
    console.log(calcState.getCol('B', index).slice(1, -1));
    console.log(calcState.getRow('B', index).slice(1, -1));
    console.log(calcState.getCol('B', calcState.size - index - 1).slice(1, -1));
    console.log(calcState.getRow('B', calcState.size - index - 1).slice(1, -1));
    console.log(countWa, countWb, countWc, countWd);
    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("B'");
      console.log('Bmax');
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('B');
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('B');
    }
    checkSides();
    checkSideBc();
    let aB = calcState.getCol('B', index).slice(1, -1);
    if (aB.every(el => el === 'R')) {
      console.log('CreateLine');
      return;
    }
    apply("B'");
    apply(`U'(${index + 1})`);
    apply(`U'(${index + 1})`);
    apply('2L');
    apply(`U(${index + 1})`);
    apply('2L');
    apply(`U(${index + 1})`);
    apply('B');
    checkSideBc();

    checkSideBb();
    checkSideBd();
  }

  function createCentralLine() {
    let a = calcState.getCol('B', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'R').length;
    let b = calcState.getRow('B', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'R').length;
    console.log(countWa, countWb);
    if (countWb > countWa) {
      apply('B');
      console.log('Bmax');
    }
    checkSides();
    // checkCentralSideRd();
    // checkCentralSideRb();
    // apply(`2U(${calcState.size - index})`);
    // apply('B');
    // checkSides();

    // const aR = calcState.getCol('R', index).slice(1, -1);

    // if (aR.every(el => el === 'G')) {
    //   console.log('ReturnSide');
    //   return;
    // } else {
    //   console.log('Not solved');
    //   createCentralLine();
    // }
  }

  const calcState = state.clone();

  let solution = [];

  let index;

  const count = Math.floor(calcState.size / 2);
  index = count - 1;
  index = 1;
  console.log('count', count);
  // index = 2;
  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createLine();
    apply('B');
    apply(`U'(${calcState.size - index})`);
    apply('2B');
    apply(`U(${calcState.size - index})`);
    index = index + 1;
  }

  if (calcState.size % 2 !== 0) {
    const centralLevel = Math.floor(calcState.size / 2) + 1;
    index = centralLevel - 1;
    createCentralLine();
    // apply("R'");
    // apply(`U(${calcState.size - index})`);
  }

  return {
    solution,
    state: calcState,
  };
}
