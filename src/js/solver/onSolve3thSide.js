export function onSolve3thSideSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  function checkSide(face, move, index) {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    const array = [];
    const arrayR = [];
    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G') {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aR[idx]);
        array.push(idx + 2);
        if (idx >= calcState.size - index - 1) {
          arrayR.push(idx + 2);
        }
      }
    });
    console.log(face, array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`${reverseMove(move)}[${arrayR.join(',')}]`);
      apply("R'");
    }
  }
  function checkSides() {
    checkSide('B', 'U', index);
    checkSide('L', '2U', index);
    let aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('2B');
    apply('2L');
    checkSide('B', 'U', index);
    checkSide('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('B');
    apply('L');
    checkSide('B', 'U', index);
    checkSide('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('2B');
    apply('2L');
    checkSide('B', 'U', index);
    checkSide('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    checkSideFl();
    checkSideFr();
  }

  function checkSideFl() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol('F', index).slice(1, -1);
    const array = [];

    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G' && idx < calcState.size - index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aR[idx]);
        array.push(idx + 2);
      }
    });
    console.log(array);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
    }
  }

  function checkSideFr() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    apply('2F');
    const a = calcState.getCol('F', index).slice(1, -1);
    const array = [];

    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G' && idx > index - 2) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aR[idx]);
        array.push(idx + 2);
      }
    });
    console.log(array);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
    }
    apply('2F');
  }

  function checkSideRc() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const c = calcState.getCol('R', calcState.size - index - 1).slice(1, -1);
    const array = [];

    console.log('c', c);
    console.log('aR', aR);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[calcState.size - idx - 3]);
      if (el === 'G' && aR[calcState.size - idx - 3] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 2 >= calcState.size - index - 1) {
          arrayR.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply('R');
      apply(`U'(${calcState.size - index})`);
      apply("R'");
      apply('B');
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function checkSideRb() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const b = calcState.getRow('R', index).slice(1, -1);
    const array = [];

    console.log('b', b);
    console.log('aR', aR);
    b.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[calcState.size - idx - 3]);
      if (el === 'G' && aR[calcState.size - idx - 3] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 3 >= calcState.size - index - 1) {
          arrayR.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply('R');
      apply(`D[${array.join(',')}]`);
      apply('B');
      apply(`D'[${array.join(',')}]`);
      apply('B');
      apply("R'");
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function checkSideRd() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const d = calcState.getRow('R', calcState.size - index - 1).slice(1, -1);
    const array = [];

    console.log('d', d);
    console.log('aR', aR);
    d.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[idx]);
      if (el === 'G' && aR[idx] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[idx]);
        array.push(idx + 2);
        if (idx >= calcState.size - index - 1) {
          arrayR.push(idx + 2);
        }
      }
    });

    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply("R'");
      apply(`D[${array.join(',')}]`);
      apply('B');
      apply(`D'[${array.join(',')}]`);
      apply('B');
      apply('R');
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function createLine() {
    let a = calcState.getCol('R', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'G').length;
    let b = calcState.getRow('R', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'G').length;
    let c = calcState.getCol('R', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'G').length;
    let d = calcState.getRow('R', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'G').length;
    // console.log(calcState.getCol('R', index).slice(1, -1));
    // console.log(calcState.getRow('R', index).slice(1, -1));
    // console.log(calcState.getCol('R', calcState.size - index - 1).slice(1, -1));
    // console.log(calcState.getRow('R', calcState.size - index - 1).slice(1, -1));
    console.log(countWa, countWb, countWc, countWd);
    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("R'");
      console.log('Bmax');
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('2R');
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('R');
    }
    checkSides();

    checkSideRc();
    let aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnCreateLine');
      return;
    }
    apply("R'");
    apply(`U'(${index + 1})`);
    apply('R');
    checkSideRc();

    checkSideRb();
    checkSideRd();
    aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnCreateLine');
      return;
    }
  }
  function reverseMove(move) {
    return move.endsWith("'") ? move.slice(0, -1) : `${move}'`;
  }

  function checkCentralSideRd() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayRd = [];
    const d = calcState.getRow('R', index).slice(1, -1);
    const arrayD = [];

    console.log('d', d);

    console.log('aR', aR);
    d.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[idx]);
      if (el === 'G' && aR[idx] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[idx]);
        arrayD.push(idx + 2);
        if (idx >= calcState.size - index - 1) {
          arrayRd.push(idx + 2);
        }
      }
    });
    // console.log('array', array);
    console.log('arrayD', arrayD);
    console.log('arrayRd', arrayRd);
    if (arrayD.length > 0) {
      apply("R'");
      apply(`D[${arrayD.join(',')}]`);
      apply('B');
      apply(`D'[${arrayD.join(',')}]`);
      apply('B');
      apply('R');
      apply(`U[${arrayD.join(',')}]`);
    }

    if (arrayRd.length > 0) {
      apply('R');
      apply(`U'[${arrayRd.join(',')}]`);
      apply("R'");
    }
  }

  function checkCentralSideRb() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const b = calcState.getRow('R', index).slice(1, -1);
    const array = [];

    console.log('b', b);
    console.log('aR', aR);
    b.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[calcState.size - idx - 3]);
      if (el === 'G' && aR[calcState.size - idx - 3] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 3 >= calcState.size - index - 1) {
          arrayR.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply('R');
      apply(`D[${array.join(',')}]`);
      apply('B');
      apply(`D'[${array.join(',')}]`);
      apply('B');
      apply("R'");
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function createCentralLine() {
    let a = calcState.getCol('R', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'G').length;
    let b = calcState.getRow('R', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'G').length;
    console.log(countWa, countWb);
    if (countWb > countWa) {
      apply('R');
      console.log('Bmax');
    }
    checkSides();
    checkCentralSideRd();
    checkCentralSideRb();
    apply(`2U(${calcState.size - index})`);
    apply('B');
    checkSides();

    // const aR = calcState.getCol('R', index).slice(1, -1);

    // if (aR.every(el => el === 'G')) {
    //   console.log('ReturnSide');
    //   return;
    // } else {
    //   console.log('Not solved');
    //   createCentralLine();
    // }
  }

  function checkSideUp(face, move, index) {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol(face, index).slice(1, -1);
    const array = [];
    const arrayR = [];
    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G') {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aR', aR[idx]);
        array.push(idx + 2);
        if (idx >= index) {
          arrayR.push(idx + 2);
        }
      }
    });
    console.log(face, array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`${reverseMove(move)}[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function checkSideUpFl() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    const a = calcState.getCol('F', index).slice(1, -1);
    const array = [];

    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G' && idx < index) {
        // idx < calcState.size - index - 1)
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aR[idx]);
        array.push(idx + 2);
      }
    });
    console.log(array);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
    }
  }

  function checkSideUpFr() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    apply('2F');
    const a = calcState.getCol('F', index).slice(1, -1);
    const array = [];

    console.log('a', a);
    console.log('aR', aR);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'G' && aR[idx] !== 'G' && idx >= calcState.size - index) {
        // calcState.size - index - 1;
        // idx > index - 2;
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aF', aR[idx]);
        array.push(idx + 2);
      }
    });
    console.log(array);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
    }
    apply('2F');
  }

  function checkSidesUp() {
    checkSideUp('B', 'U', index);
    checkSideUp('L', '2U', index);
    let aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('2B');
    apply('2L');
    checkSideUp('B', 'U', index);
    checkSideUp('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('B');
    apply('L');
    checkSideUp('B', 'U', index);
    checkSideUp('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }

    apply('2B');
    apply('2L');
    checkSideUp('B', 'U', index);
    checkSideUp('L', '2U', index);
    aR = calcState.getCol('R', index).slice(1, -1);
    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    checkSideUpFl();
    checkSideUpFr();
  }

  function checkSideUpRc() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const c = calcState.getCol('R', calcState.size - index - 1).slice(1, -1);
    const array = [];

    console.log('c', c);
    console.log('aR', aR);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[calcState.size - idx - 3]);
      if (el === 'G' && aR[calcState.size - idx - 3] !== 'G') {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 2 > index) {
          arrayR.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply("R'");
      apply(`U'(${index + 1})`);
      apply('R');
      apply("B'");
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function checkSideUpRb() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const b = calcState.getRow('R', index).slice(1, -1);
    const array = [];

    console.log('b', b);
    console.log('aR', aR);
    console.log('aR_Reverse', aR.toReversed());
    b.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[calcState.size - idx - 3]);
      if (
        el === 'G' &&
        aR[calcState.size - idx - 3] !== 'G' &&
        // aR[idx+1] !== 'G'
        calcState.size - idx - 3 !== calcState.size - index - 2
      ) {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[calcState.size - idx - 3]);
        array.push(calcState.size - idx - 1);
        if (calcState.size - idx - 3 >= index) {
          // >= calcState.size - index
          arrayR.push(calcState.size - idx - 1);
        }
      }
    });
    // console.log('array', array);
    array.reverse();
    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply('R');
      apply(`D[${array.join(',')}]`);
      apply('B');
      apply(`D'[${array.join(',')}]`);
      apply('B');
      apply("R'");
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function checkSideUpRd() {
    const aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnSide');
      return;
    }
    const arrayR = [];
    const d = calcState.getRow('R', calcState.size - index - 1).slice(1, -1);
    const array = [];
    console.log('INDEX', index);
    console.log('d', d);
    console.log('aR', aR);
    d.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      console.log('el', el);
      console.log('aR', aR[idx]);
      if (
        el === 'G' &&
        aR[idx] !== 'G' &&
        calcState.size - idx - 3 !== calcState.size - index - 2
      ) {
        console.log(el);
        // console.log('index', index);
        console.log('idx', idx);
        console.log('aR', aR[idx]);
        array.push(idx + 2);
        if (idx >= index) {
          arrayR.push(idx + 2);
        }
      }
    });

    console.log('array', array);
    console.log('arrayR', arrayR);

    if (array.length > 0) {
      apply("R'");
      apply(`D[${array.join(',')}]`);
      apply('B');
      apply(`D'[${array.join(',')}]`);
      apply('B');
      apply('R');
      apply(`U[${array.join(',')}]`);
    }

    if (arrayR.length > 0) {
      apply('R');
      apply(`U'[${arrayR.join(',')}]`);
      apply("R'");
    }
  }

  function createLineUp() {
    let a = calcState.getCol('R', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'G').length;
    let b = calcState.getRow('R', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'G').length;
    let c = calcState.getCol('R', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'G').length;
    let d = calcState.getRow('R', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'G').length;
    // console.log(calcState.getCol('R', index).slice(1, -1));
    // console.log(calcState.getRow('R', index).slice(1, -1));
    // console.log(calcState.getCol('R', calcState.size - index - 1).slice(1, -1));
    // console.log(calcState.getRow('R', calcState.size - index - 1).slice(1, -1));
    console.log(countWa, countWb, countWc, countWd);
    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("R'");
      console.log('Bmax');
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('2R');
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('R');
    }
    checkSidesUp();

    checkSideUpRc();
    let aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnCreateLine');
      return;
    }
    apply("R'");
    apply(`U'(${index + 1})`);
    apply('R');
    checkSideUpRc();
    checkSideUpRd();
    checkSideUpRc();
    checkSideUpRb();
    checkSideUpRc();

    // // // // ------Repeat------
    checkSidesUp();
    checkSideUpRc();
    aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnCreateLine');
      return;
    }
    apply("R'");
    apply(`U'(${index + 1})`);
    apply('R');
    checkSideUpRc();
    checkSideUpRd();
    checkSideUpRc();
    checkSideUpRb();
    checkSideUpRc();
    aR = calcState.getCol('R', index).slice(1, -1);

    if (aR.every(el => el === 'G')) {
      console.log('ReturnCreateLine');
      return;
    } else {
      console.log('Not solved');
      createLineUp();
    }
  }
  const calcState = state.clone();

  let solution = [];

  let index = 1;

  const count = Math.floor(calcState.size / 2);
  index = count - 1;
  index = 1;
  console.log('count', count);
  // index = 2;
  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createLine();
    apply("R'");
    apply(`U(${calcState.size - index})`);
    index = index + 1;
  }

  if (calcState.size % 2 !== 0) {
    const centralLevel = Math.floor(calcState.size / 2) + 1;
    index = centralLevel - 1;
    createCentralLine();
    apply("R'");
    apply(`U(${calcState.size - index})`);
  }

  index = count - 1;
  // index = 5;
  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createLineUp();
    apply('R');
    apply(`U(${index + 1})`);
    index = index - 1;
  }

  return {
    solution,
    state: calcState,
  };
}
