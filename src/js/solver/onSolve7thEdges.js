export function onSolve7thEdgeSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }
  const calcState = state.clone();

  function checkRevEdge(face, move) {
    let cFace = calcState.getCol(face, calcState.size - 1).slice(1, -1);
    console.log(cFace);
    console.log('firstElementCF', firstElementCF);
    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log('reverseElCf', reverseElCf);
    let array = [];
    cFace.forEach((el, idx) => {
      console.log(el);
      console.log(idx);
      if (el === reverseElCf) {
        array.push(idx + 2);
      }
    });
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkClearEdge(face, move) {
    let cFace = calcState.getCol(face, calcState.size - 1).slice(1, -1);
    console.log(cFace);

    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log(reverseElCf);
    let array = [];
    cFace.forEach((el, idx) => {
      console.log(el);
      console.log(idx);
      if (el === firstElementCF) {
        array.push(idx + 2);
      }
    });
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }

    console.log(array);
  }

  function checkUpEdge() {
    let dU = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log(dU);
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log('reverseElCf', reverseElCf);
    // if (!dU.includes(`${firstElementCF}`) || !dU.includes(`${reverseElCf}`)) {
    //   console.log('Not includes');
    //   return;
    // }
    // console.log(reverseElCf);
    if (dU.includes(`${firstElementCF}`)) {
      console.log('I am here');
      apply('B');
      apply("U'");
      apply("U'");
      apply("B'");
      // apply('U');
      return;
    }

    if (dU.includes(`${reverseElCf}`)) {
      console.log('I am here Reverse');
      apply("R'");
      apply("U'");
      apply('R');
      apply('U');
      return;
    }

    apply('U');

    // console.log(array);
  }

  function checkSide(face, move) {
    const aFace = calcState.getCol(face, 1).slice(1, -1);
    console.log(aFace);
    let array = [];
    aFace.forEach((el, idx) => {
      console.log(el);
      console.log(idx);
      if (el === 'G') {
        array.push(idx + 2);
      }
    });
    if (array.length > 0) {
      apply(`${move}[${array.join(',')}]`);
    }
  }

  function checkSides() {
    checkSide('R', 'U');
    checkSide('B', '2U');
    checkSide('L', "U'");
  }

  function checkUpEdge() {
    let dU = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log(dU);
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log('reverseElCf', reverseElCf);
    // if (!dU.includes(`${firstElementCF}`) || !dU.includes(`${reverseElCf}`)) {
    //   console.log('Not includes');
    //   return;
    // }
    // console.log(reverseElCf);
    if (dU.includes(`${firstElementCF}`)) {
      console.log('I am here');
      apply('B');
      apply("U'");
      apply("U'");
      apply("B'");
      // apply('U');
      return;
    }

    if (dU.includes(`${reverseElCf}`)) {
      console.log('I am here Reverse');
      apply("R'");
      apply("U'");
      apply('R');
      apply('U');
      return;
    }

    apply('U');

    // console.log(array);
  }

  function createEdge() {
    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }
    checkClearEdge('R', 'U');
    checkClearEdge('L', "U'");
    checkRevEdge('F', "U'");
    apply('R');
    apply("U'");
    apply("R'");
    checkSides();

    apply('R');
    apply('U');
    apply("R'");
    apply("L'");

    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }
    // ==============================While================

    let a = calcState.getCol('U', 0).slice(1, -1);
    let b = calcState.getRow('U', 0).slice(1, -1);
    let c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
    let d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    let reverseElCf = firstElementCF[1] + firstElementCF[0];
    while (
      a.includes(`${firstElementCF}`) ||
      a.includes(`${reverseElCf}`) ||
      b.includes(`${firstElementCF}`) ||
      b.includes(`${reverseElCf}`) ||
      c.includes(`${firstElementCF}`) ||
      c.includes(`${reverseElCf}`) ||
      d.includes(`${firstElementCF}`) ||
      d.includes(`${reverseElCf}`)
    ) {
      console.log('I AM HERE');
      checkUpEdge();
      checkClearEdge('R', 'U');

      let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log('Ud', Ud);
      while (Ud.every(el => el === Ud[0])) {
        apply('U');
        Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      }

      apply('R');
      apply("U'");
      apply("R'");
      checkSides();

      apply('R');
      apply('U');
      apply("R'");
      a = calcState.getCol('U', 0).slice(1, -1);
      b = calcState.getRow('U', 0).slice(1, -1);
      c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
      d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);

      console.log(firstElementCF);
      console.log(reverseElCf);
    }

    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }

    let cR = calcState.getCol('R', calcState.size - 1).slice(1, -1);
    if (cR.includes(reverseElCf)) {
      let Ub = calcState.getRow('U', 0).slice(1, -1);
      console.log('Ub', Ub);

      while (Ub.some(el => el !== Ub[0])) {
        apply('U');
        Ub = calcState.getRow('U', 0).slice(1, -1);
      }
      apply('B');
      apply("R'");
      apply('U');
      apply('R');
      let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log('Ud', Ud);
      while (Ud.every(el => el === Ud[0])) {
        apply('U');
        Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      }
      checkClearEdge('R', 'U');
      apply('R');
      apply("U'");
      apply("R'");
      checkSides();
      apply('R');
      apply('U');
      apply("R'");
    }

    let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log('Ud', Ud);
    while (Ud.every(el => el === Ud[0])) {
      apply('U');
      Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }
    apply('F');
  }

  function createSecondEdge() {
    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }
    checkClearEdge('R', 'U');
    checkRevEdge('F', 'U');
    let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log('Ud', Ud);
    while (Ud.every(el => el === Ud[0])) {
      apply('U');
      Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }
    apply('R');
    apply("U'");
    apply("R'");
    checkSides();
    apply('R');
    apply('U');
    apply("R'");

    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }
    let a = calcState.getCol('U', 0).slice(1, -1);
    let b = calcState.getRow('U', 0).slice(1, -1);
    let c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
    let d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    while (
      a.includes(`${firstElementCF}`) ||
      a.includes(`${reverseElCf}`) ||
      b.includes(`${firstElementCF}`) ||
      b.includes(`${reverseElCf}`) ||
      c.includes(`${firstElementCF}`) ||
      c.includes(`${reverseElCf}`) ||
      d.includes(`${firstElementCF}`) ||
      d.includes(`${reverseElCf}`)
    ) {
      console.log('I AM HERE');
      checkUpEdge();
      checkClearEdge('R', 'U');

      let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log('Ud', Ud);
      while (Ud.every(el => el === Ud[0])) {
        apply('U');
        Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      }

      apply('R');
      apply("U'");
      apply("R'");
      checkSides();

      apply('R');
      apply('U');
      apply("R'");
      a = calcState.getCol('U', 0).slice(1, -1);
      b = calcState.getRow('U', 0).slice(1, -1);
      c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
      d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);

      console.log(firstElementCF);
      console.log(reverseElCf);
    }

    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesB()
    ) {
      console.log('Solved');
      return;
    }

    let cR = calcState.getCol('R', calcState.size - 1).slice(1, -1);
    if (cR.includes(reverseElCf)) {
      let Ub = calcState.getRow('U', 0).slice(1, -1);
      console.log('Ub', Ub);

      while (Ub.some(el => el !== Ub[0])) {
        apply('U');
        Ub = calcState.getRow('U', 0).slice(1, -1);
      }
      apply('B');
      apply("R'");
      apply('U');
      apply('R');
      let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      console.log('Ud', Ud);
      while (Ud.every(el => el === Ud[0])) {
        apply('U');
        Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
      }
      checkClearEdge('R', 'U');
      apply('R');
      apply("U'");
      apply("R'");
      checkSides();
      apply('R');
      apply('U');
      apply("R'");
    }

    Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log('Ud', Ud);
    while (Ud.every(el => el === Ud[0])) {
      apply('U');
      Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }
    apply('F');
  }

  let solution = [];
  let index;
  apply('L');
  apply("U'");
  apply("L'");

  let firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  let reverseElCf = firstElementCF[1] + firstElementCF[0];
  console.log(firstElementCF);
  createEdge();

  // let Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log('Ud', Ud);
  // while (Ud.every(el => el === Ud[0])) {
  //   apply('U');
  //   Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }
  // apply('F');

  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  reverseElCf = firstElementCF[1] + firstElementCF[0];
  console.log(firstElementCF);

  createSecondEdge();
  // Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log('Ud', Ud);
  // while (Ud.every(el => el === Ud[0])) {
  //   apply('U');
  //   Ud = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }
  // apply('F');

  return {
    solution,
    state: calcState,
  };
}
