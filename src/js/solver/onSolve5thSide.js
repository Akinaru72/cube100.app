export function onSolve5thSideSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  function reverseMove(move) {
    return move.endsWith("'") ? move.slice(0, -1) : `${move}'`;
  }

  function checkSideLl() {
    const aL = calcState.getCol('L', index).slice(1, -1);

    if (aL.every(el => el === 'B')) {
      console.log('checkSideLl');
      return;
    }

    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx < calcState.size - index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
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
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
    }
  }

  function checkSideLr() {
    const aL = calcState.getCol('L', index).slice(1, -1);

    if (aL.every(el => el === 'B')) {
      console.log('checkSideLr');
      return;
    }
    apply('2B');
    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx > index - 2) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
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
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
    }
    apply('2B');
  }

  function checkBeginCreateLine() {
    let a = calcState.getCol('L', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'B').length;
    let b = calcState.getRow('L', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'B').length;
    let c = calcState.getCol('L', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'B').length;
    let d = calcState.getRow('L', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'B').length;
    console.log(calcState.getCol('L', index).slice(1, -1));
    console.log(calcState.getRow('L', index).slice(1, -1));
    console.log(calcState.getCol('L', calcState.size - index - 1).slice(1, -1));
    console.log(calcState.getRow('L', calcState.size - index - 1).slice(1, -1));
    console.log(countWa, countWb, countWc, countWd);
    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("L'");
      console.log('Bmax');
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('L');
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('L');
    }
    checkSideLl();
    checkSideLr();
    // ------------------test-------------------
    // apply("L'");
    // ------------------end test-------------------
    apply('L');
    apply(`U'(${calcState.size - index})`);
    apply('2L');
    apply(`U(${calcState.size - index})`);
  }

  function checkSideLa() {
    const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    const a = calcState.getCol('L', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('dB', dB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      console.log('idx', idx);
      console.log(dB[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx < calcState.size - index - 1) {
        console.log(el);
        console.log('index', index);
        console.log('idx', idx);
        console.log('dB', dB[idx]);
        if (idx === calcState.size - index - 2) {
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
      apply(`U'(${calcState.size - index})`);
      apply('L');
      apply(`U[${array.join(',')}]`);
    }
    if (arrayIndex.length > 0 && array.length === 0) {
      apply(`U'(${calcState.size - index})`);
      apply('L');
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
    } else if (arrayIndex.length > 0) {
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
    }
    if (array.length > 0 || arrayIndex.length > 0) {
      apply("L'");
      apply(`U(${calcState.size - index})`);
    }
  }

  function checkSideLc() {
    const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    console.log('i am here');
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLc');
      return;
    }

    const c = calcState.getCol('L', calcState.size - index - 1).slice(1, -1);
    const array = [];
    const arrayIndex = [];
    c.reverse();
    console.log('c', c);
    console.log('dB', dB);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx > index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', dB[idx]);
        if (idx === calcState.size - index - 2) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`D[${array.join(',')}]`);
      apply(`U'(${calcState.size - index})`);
      apply("L'");
      apply(`D'[${array.join(',')}]`);
    }

    if (arrayIndex.length > 0) {
      apply(`D'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`D[${arrayIndex.join(',')}]`);
      apply('L');
    }
    if (array.length > 0 || arrayIndex.length > 0) {
      apply('L');
      apply(`U(${calcState.size - index})`);
    }
  }

  function checkSides() {
    // -------------------------------------------------------------
    checkSideLa();
    checkSideLc();
    let dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkSideLa();
    checkSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkSideLa();
    checkSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkSideLa();
    checkSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
    // // // --------------------------Bb---------------------------------

    apply(`U'(${index + 1})`);
    apply('2L');
    apply(`U(${index + 1})`);
    apply('L');
    checkSideLa();
    checkSideLc();

    // ------------------------------End---------------
    // dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    // if (dB.every(el => el === 'B')) {
    //   console.log('checkSideLa');
    //   return;
    // } else {
    //   console.log('Not Solved');
    //   checkSides();
    // }
  }

  function createLine() {
    checkBeginCreateLine();

    checkSides();
    const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
  }

  function checkCentralSideLl() {
    const aL = calcState.getCol('L', index).slice(1, -1);
    if (aL.every((el, i) => i === index - 1 || el === 'B')) {
      console.log('checkCentralSideLl');
      return;
    }

    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('index', index);
    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx < index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
        // if (idx === index - 1) {
        //   arrayIndex.push(idx + 2);
        // } else {
        array.push(idx + 2);
        // }
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }
  }

  function checkCentralSideLr() {
    const aL = calcState.getCol('L', index).slice(1, -1);
    if (aL.every((el, i) => i === index - 1 || el === 'B')) {
      console.log('checkCentralSideLr');
      return;
    }

    apply('2B');
    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('index', index);
    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx > index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
        array.push(idx + 2);
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }

    apply('2B');
  }

  function initCentralSides() {
    let a = calcState.getCol('L', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'B').length;
    let b = calcState.getRow('L', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'B').length;
    console.log(countWa, countWb);
    if (countWb > countWa) {
      apply('L');
      console.log('Bmax');
    }
    checkCentralSideLl();
    checkCentralSideLr();
    apply(`U'(${calcState.size - index})`);
    apply('L');
    apply(`U(${calcState.size - index})`);
  }

  function checkCentralSideLa() {
    const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    const a = calcState.getCol('L', index).slice(1, -1);
    const array = [];
    // const arrayIndex = [];

    console.log('a', a);
    console.log('dB', dB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      console.log('idx', idx);
      console.log(dB[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx < index - 1) {
        console.log(el);
        console.log('index', index);
        console.log('idx', idx);
        console.log('dB', dB[idx]);
        // if (idx === calcState.size - index - 2) {
        //   arrayIndex.push(idx + 2);
        // } else {
        array.push(idx + 2);
        // }
      }
    });
    console.log(array);
    // console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`U'[${array.join(',')}]`);
      apply(`U'(${calcState.size - index})`);
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
      apply(`U(${calcState.size - index})`);
    }
  }

  function checkCentralSideLc() {
    const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    console.log('i am here');
    if (dB.every(el => el === 'B')) {
      console.log('checkCentralSideLc');
      return;
    }

    const c = calcState.getCol('L', calcState.size - index - 1).slice(1, -1);
    const array = [];

    c.reverse();
    console.log('c', c);
    console.log('dB', dB);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx > index - 1) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', dB[idx]);

        array.push(idx + 2);
      }
    });
    console.log(array);

    if (array.length > 0) {
      apply(`D[${array.join(',')}]`);
      apply(`U'(${calcState.size - index})`);
      apply("L'");
      apply(`D'[${array.join(',')}]`);
      apply('L');
      apply(`U(${calcState.size - index})`);
    }
  }

  function checkCentralSides() {
    checkCentralSideLa();
    checkCentralSideLc();
    let dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkCentralSideLa();
    checkCentralSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkCentralSideLa();
    checkCentralSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkCentralSideLa();
    checkCentralSideLc();
    dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
  }

  function createCentralLine() {
    initCentralSides();
    checkCentralSides();
    let dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('createCentralLine');
      return;
    }
  }

  function checkUpSideLl() {
    const aL = calcState.getCol('L', index).slice(1, -1);

    if (aL.every(el => el === 'B')) {
      console.log('checkSideLl');
      return;
    }

    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx < index) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
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
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
    }
  }

  function checkUpSideLr() {
    const aL = calcState.getCol('L', index).slice(1, -1);

    if (aL.every(el => el === 'B')) {
      console.log('checkSideLr');
      return;
    }
    apply('2B');
    const a = calcState.getCol('B', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];

    console.log('a', a);
    console.log('aL', aL);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && aL[idx] !== 'B' && idx > calcState.size - index - 3) {
        console.log(el);
        // console.log('index', index);
        // console.log('idx', idx);
        console.log('aL', aL[idx]);
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
      apply('L');
      apply(`U[${array.join(',')}]`);
      apply("L'");
    }

    if (arrayIndex.length > 0) {
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
    }
    apply('2B');
  }

  function checkBeginCreateUpLine() {
    let a = calcState.getCol('L', index).slice(1, -1);
    const countWa = a.filter(cell => cell === 'B').length;
    let b = calcState.getRow('L', index).slice(1, -1);
    const countWb = b.filter(cell => cell === 'B').length;
    let c = calcState.getCol('L', calcState.size - index - 1).slice(1, -1);
    const countWc = c.filter(cell => cell === 'B').length;
    let d = calcState.getRow('L', calcState.size - index - 1).slice(1, -1);
    const countWd = d.filter(cell => cell === 'B').length;
    console.log(calcState.getCol('L', index).slice(1, -1));
    console.log(calcState.getRow('L', index).slice(1, -1));
    console.log(calcState.getCol('L', calcState.size - index - 1).slice(1, -1));
    console.log(calcState.getRow('L', calcState.size - index - 1).slice(1, -1));
    console.log(countWa, countWb, countWc, countWd);
    if (countWb > countWa && countWb >= countWc && countWb >= countWd) {
      apply("L'");
      console.log('Bmax');
    } else if (countWc > countWa && countWc >= countWb && countWc >= countWd) {
      console.log('Cmax');
      apply('L');
    } else if (countWd > countWa && countWd >= countWb && countWd >= countWc) {
      console.log('Dmax');
      apply('L');
    }
    checkUpSideLl();
    checkUpSideLr();
    // ------------------test-------------------
    // apply("L'");
    // ------------------end test-------------------
    apply("L'");
    apply(`U'(${index + 1})`);
    apply('2L');
    apply(`U(${index + 1})`);
  }

  function checkUpSideLa() {
    const dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    const a = calcState.getCol('L', index).slice(1, -1);
    const array = [];
    const arrayIndex = [];
    a.reverse();
    console.log('a', a);

    console.log('dB', dB);
    a.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      console.log('idx', idx);
      console.log(dB[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx > calcState.size - index - 3) {
        console.log(el);
        console.log('index', index);
        console.log('idx', idx);
        console.log('dB', dB[idx]);
        if (idx === calcState.size - index - 2) {
          arrayIndex.push(idx + 2);
        } else {
          array.push(idx + 2);
        }
      }
    });
    console.log(array);
    console.log('arrayIndex', arrayIndex);

    if (array.length > 0) {
      apply(`D[${array.join(',')}]`);
      apply(`U'(${index + 1})`);
      apply("L'");
      apply(`D'[${array.join(',')}]`);
    }
    if (arrayIndex.length > 0 && array.length === 0) {
      apply(`U'(${index + 1})`);
      apply("L'");
      apply(`D'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`D[${arrayIndex.join(',')}]`);
      apply('L');
    } else if (arrayIndex.length > 0) {
      apply(`D'[${arrayIndex.join(',')}]`);
      apply("L'");
      apply(`D[${arrayIndex.join(',')}]`);
      apply('L');
    }
    if (array.length > 0 || arrayIndex.length > 0) {
      apply('L');
      apply(`U(${index + 1})`);
    }
  }

  function checkUpSideLc() {
    const dB = calcState.getRow('B', index).slice(1, -1);
    console.log('i am here');
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLc');
      return;
    }

    const c = calcState.getCol('L', calcState.size - index - 1).slice(1, -1);
    const array = [];
    const arrayIndex = [];
    // c.reverse();
    console.log('c', c);
    console.log('dB', dB);
    c.forEach((el, idx) => {
      // console.log(calcState.size - idx - 1);
      // console.log(calcState.size - index - 1);
      // console.log('idx', idx);
      // console.log(aF[idx]);
      if (el === 'B' && dB[idx] !== 'B' && idx < index) {
        console.log(el);
        console.log('index', index);
        console.log('idx', idx);
        console.log('aL', dB[idx]);
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
      apply(`U'(${index + 1})`);
      apply('L');
      apply(`U[${array.join(',')}]`);
    }

    if (arrayIndex.length > 0 && array.length === 0) {
      apply(`U'(${index + 1})`);
      apply('L');
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
    } else if (arrayIndex.length > 0) {
      apply(`U[${arrayIndex.join(',')}]`);
      apply('L');
      apply(`U'[${arrayIndex.join(',')}]`);
      apply("L'");
    }
    if (array.length > 0 || arrayIndex.length > 0) {
      apply("L'");
      apply(`U(${index + 1})`);
    }
  }

  function checkUpSides() {
    // -------------------------------------------------------------
    checkUpSideLa();
    checkUpSideLc();
    let dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
    apply('L');
    checkUpSideLa();
    checkUpSideLc();
    dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
    apply('L');
    checkUpSideLa();
    checkUpSideLc();
    dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
    apply('L');
    checkUpSideLa();
    checkUpSideLc();
    dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }

    apply('L');
    checkUpSideLa();
    checkUpSideLc();
    dB = calcState.getRow('B', index).slice(1, -1);
    console.log('dB', dB);
    if (dB.every(el => el === 'B')) {
      console.log('checkSideLa');
      return;
    }
    // apply('L');
    // checkUpSideLa();
    // checkUpSideLc();
    // dB = calcState.getRow('B', index).slice(1, -1);
    // console.log('dB', dB);
    // if (dB.every(el => el === 'B')) {
    //   console.log('checkSideLa');
    //   return;
    // }
    // apply('L');
    // checkUpSideLa();
    // checkUpSideLc();
    // dB = calcState.getRow('B', index).slice(1, -1);
    // console.log('dB', dB);
    // if (dB.every(el => el === 'B')) {
    //   console.log('checkSideLa');
    //   return;
    // }
    // apply('L');
    // checkUpSideLa();
    // checkUpSideLc();
    // dB = calcState.getRow('B', index).slice(1, -1);
    // console.log('dB', dB);
    // if (dB.every(el => el === 'B')) {
    //   console.log('checkSideLa');
    //   return;
    // }
    // // // --------------------------CheckFromInnerArray----------------------------

    // checkUpSide

    // // ------------------------------End---------------
    // // dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    // // if (dB.every(el => el === 'B')) {
    // //   console.log('checkSideLa');
    // //   return;
    // // } else {
    // //   console.log('Not Solved');
    // //   checkSides();
    // // }
  }

  function checkInnerArray() {
    const dB = calcState.getRow('B', index).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkInnerArray');
      return;
    }
    const b = calcState.getRow('L', index).slice(1, -1);
    console.log('dB', dB);
    console.log('b', b);
    const innerArray = [];
    b.forEach((el, idx) => {
      console.log(el);
      console.log(dB[idx]);
      console.log(idx);
      if (dB[idx] !== 'B' && el == 'B') {
        innerArray.push(idx + 2);
      }
    });
    console.log('innerArray', innerArray);
    if (innerArray.length > 0) {
      console.log('Go');
      apply(`U'(${index + 1})`);
      apply("L'");
      apply(`D[${innerArray.join(',')}]`);
      apply('L');
      apply(`U(${index + 1})`);
      apply("L'");
      apply(`D'[${innerArray.join(',')}]`);
      // apply(`D'[${innerArray.join(',')}]`);
    } else {
      console.log('No elements');
      apply("L'");
    }
  }

  function createUpLine() {
    checkBeginCreateUpLine();
    checkUpSides();
    checkInnerArray();
    let dB = calcState.getRow('B', index).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkInnerArray');
      return;
    }

    checkInnerArray();
    dB = calcState.getRow('B', index).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkInnerArray');
      return;
    }

    checkInnerArray();
    dB = calcState.getRow('B', index).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkInnerArray');
      return;
    }

    checkInnerArray();
    dB = calcState.getRow('B', index).slice(1, -1);
    if (dB.every(el => el === 'B')) {
      console.log('checkInnerArray');
      return;
    }

    // const dB = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
    // if (dB.every(el => el === 'B')) {
    //   console.log('checkSideLa');
    //   return;
    // }
  }

  const calcState = state.clone();
  let solution = [];
  let index;

  const count = Math.floor(calcState.size / 2);
  index = count - 1;
  index = 1;
  console.log('count', count);

  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createLine();

    index = index + 1;
  }

  if (calcState.size % 2 !== 0) {
    const centralLevel = Math.floor(calcState.size / 2) + 1;
    index = centralLevel - 1;
    createCentralLine();
  }

  index = count - 1;
  // index = 1;

  for (let i = 1; i < count; i++) {
    console.log('index', index);
    createUpLine();
    // apply("B'");
    // apply(`U'(${index + 1})`);
    // apply('2B');
    // apply(`U(${index + 1})`);

    index = index - 1;
  }

  return {
    solution,
    state: calcState,
  };
}
