export function onSolve6thEdgeSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  function reverseMove(move) {
    return move.endsWith("'") ? move.slice(0, -1) : `${move}'`;
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

  const calcState = state.clone();
  let solution = [];
  let index;

  function checkEdge(face, move) {
    let cFace = calcState.getCol(face, calcState.size - 1).slice(1, -1);
    console.log(cFace);

    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);
    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    // console.log('reverseElCf', reverseElCf);
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
  function checkEdges() {
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    checkEdge('R', 'U');
    checkEdge('B', '2U');
    checkEdge('L', "U'");
  }

  function checkRevEdge(face, move) {
    let cFace = calcState.getCol(face, calcState.size - 1).slice(1, -1);
    console.log(cFace);
    console.log('I am here_______checkRevEdge');
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);
    const reverseElCf = firstElementCF[1] + firstElementCF[0];
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

    console.log(array);
  }

  function checkRevEdges() {
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    checkRevEdge('F', "U'");
    checkRevEdge('B', 'U');
    checkRevEdge('L', '2U');
  }

  function checkClearEdge() {
    let cR = calcState.getCol('R', calcState.size - 1).slice(1, -1);
    console.log(cR);

    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log(reverseElCf);
    let array = [];
    cR.forEach((el, idx) => {
      console.log(el);
      console.log(idx);
      if (el === firstElementCF) {
        array.push(idx + 2);
      }
    });
    if (array.length > 0) {
      apply(`U[${array.join(',')}]`);
    }

    console.log(array);
  }

  function checkUpEdge() {
    let dU = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log(dU);
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    const reverseElCf = firstElementCF[1] + firstElementCF[0];
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

  function checkDownEdge() {
    let bD = calcState.getRow('D', 0).slice(1, -1);
    console.log(bD);
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    console.log('firstElementCF', firstElementCF);

    const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log('reverseElCf', reverseElCf);
    // if (!dU.includes(`${firstElementCF}`) || !dU.includes(`${reverseElCf}`)) {
    //   console.log('Not includes');
    //   return;
    // }
    // console.log(reverseElCf);
    if (bD.includes(`${firstElementCF}`)) {
      console.log('I am here');
      apply("B'");
      apply('D');
      apply('D');
      apply('B');
      // apply('U');
      return;
    }

    if (bD.includes(`${reverseElCf}`)) {
      console.log('I am here Reverse');
      apply('R');
      apply('D');
      apply("R'");
      apply("D'");
      return;
    }

    apply("D'");

    // console.log(array);
  }

  function checkAllMiddleEdges() {
    checkEdge('F', "U'");
    checkEdge('B', 'U');
    checkEdge('L', '2U');
  }

  function createEdgeForDown() {
    if (calcState.isSolvedEgdesD()) {
      console.log('Solved');
      return;
    }
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    checkRevEdges();

    let a = calcState.getCol('U', 0).slice(1, -1);
    let b = calcState.getRow('U', 0).slice(1, -1);
    let c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
    let d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    const reverseElCf = firstElementCF[1] + firstElementCF[0];
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    // console.log(
    //   a.includes(`${firstElementCF}`) ||
    //     a.includes(`${reverseElCf}`) ||
    //     b.includes(`${firstElementCF}`) ||
    //     b.includes(`${reverseElCf}`) ||
    //     c.includes(`${firstElementCF}`) ||
    //     c.includes(`${reverseElCf}`) ||
    //     d.includes(`${firstElementCF}`) ||
    //     d.includes(`${reverseElCf}`)
    // );
    // console.log(d.includes(`${reverseElCf}`));

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
      checkClearEdge();
      checkUpEdge();
      checkClearEdge();
      a = calcState.getCol('U', 0).slice(1, -1);
      b = calcState.getRow('U', 0).slice(1, -1);
      c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
      d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }

    // let solveEgde = calcState.getCol('F', calcState.size - 1).slice(1, -1);
    // if (solveEgde.every(el => el === solveEgde[0])) {
    //   console.log('Solved');
    //   return;
    // }
    // ----------------------------
    let e = calcState.getCol('D', 0).slice(1, -1);
    let f = calcState.getRow('D', 0).slice(1, -1);
    let g = calcState.getCol('D', calcState.size - 1).slice(1, -1);
    let h = calcState.getRow('D', calcState.size - 1).slice(1, -1);
    // const reverseElCf = firstElementCF[1] + firstElementCF[0];
    while (
      e.includes(`${firstElementCF}`) ||
      e.includes(`${reverseElCf}`) ||
      f.includes(`${firstElementCF}`) ||
      f.includes(`${reverseElCf}`) ||
      g.includes(`${firstElementCF}`) ||
      g.includes(`${reverseElCf}`) ||
      h.includes(`${firstElementCF}`) ||
      h.includes(`${reverseElCf}`)
    ) {
      checkClearEdge();
      checkDownEdge();
      checkClearEdge();
      e = calcState.getCol('D', 0).slice(1, -1);
      f = calcState.getRow('D', 0).slice(1, -1);
      g = calcState.getCol('D', calcState.size - 1).slice(1, -1);
      h = calcState.getRow('D', calcState.size - 1).slice(1, -1);
    }

    let cR = calcState.getCol('R', calcState.size - 1).slice(1, -1);
    if (cR.includes(reverseElCf)) {
      apply('B');
      apply("U'");
      apply("B'");
      apply("R'");
      apply('2U');
      apply('R');
      checkClearEdge();
    }
    checkEdges();

    let edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
    while (edgeForChahgeDown.every(el => el === edgeForChahgeDown[0])) {
      apply('D');
      edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
    }
    apply("R'");
    apply('D');
    apply('R');

    // solveEgde = calcState.getCol('F', calcState.size - 1).slice(1, -1);
    // if (solveEgde.every(el => el === solveEgde[0])) {
    //   console.log('Solved');
    //   return;
    // }
  }

  function createEdgeForUp() {
    // let fC = calcState.getCol('F', calcState.size - 1).slice(1, -1);
    // console.log('fC', fC);

    if (calcState.isSolvedEgdesU() && calcState.isSolvedEgdesD()) {
      console.log('Solved');
      return;
    }
    // const firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
    checkRevEdges();

    checkClearEdge();

    let a = calcState.getCol('U', 0).slice(1, -1);
    let b = calcState.getRow('U', 0).slice(1, -1);
    let c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
    let d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    const reverseElCf = firstElementCF[1] + firstElementCF[0];

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
      checkClearEdge();
      a = calcState.getCol('U', 0).slice(1, -1);
      b = calcState.getRow('U', 0).slice(1, -1);
      c = calcState.getCol('U', calcState.size - 1).slice(1, -1);
      d = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }

    // let solveEgde = calcState.getCol('F', calcState.size - 1).slice(1, -1);
    // if (solveEgde.every(el => el === solveEgde[0])) {
    //   console.log('Solved');
    //   return;
    // }
    // ----------------------------

    let cR = calcState.getCol('R', calcState.size - 1).slice(1, -1);

    if (cR.includes(reverseElCf)) {
      let edgeCForChahgeUp = calcState
        .getRow('U', calcState.size - 1)
        .slice(1, -1);
      console.log(edgeCForChahgeUp);
      while (edgeCForChahgeUp.every(el => el === edgeCForChahgeUp[0])) {
        apply('U');
        edgeCForChahgeUp = calcState
          .getRow('U', calcState.size - 1)
          .slice(1, -1);
      }
      apply('B');
      apply("U'");
      apply("B'");
      apply("R'");
      apply('2U');
      apply('R');
      checkClearEdge();
    }

    checkEdges();
    //  ===========================================
    let edgeForChahgeUp = calcState
      .getRow('U', calcState.size - 1)
      .slice(1, -1);
    console.log(edgeForChahgeUp);
    while (edgeForChahgeUp.every(el => el === edgeForChahgeUp[0])) {
      apply('U');
      edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
    }

    apply('R');
    apply("U'");
    apply("R'");
  }

  // ============================Down====================================
  // -------------------------Edge1----------------------------------------
  let firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  createEdgeForDown();
  // let edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // while (edgeForChahgeDown.every(el => el === edgeForChahgeDown[0])) {
  //   apply('D');
  //   edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // }
  // apply("R'");
  // apply('D');
  // apply('R');
  // -------------------------Edge2----------------------------------------
  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  createEdgeForDown();
  // edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // console.log(edgeForChahgeDown);
  // while (edgeForChahgeDown.every(el => el === edgeForChahgeDown[0])) {
  //   console.log('I am HERE EDGE2');
  //   console.log(edgeForChahgeDown);
  //   apply('D');
  //   edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  //   console.log(edgeForChahgeDown);
  // }
  // apply("R'");
  // apply('D');
  // apply('R');

  // -------------------------Edge3----------------------------------------
  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  createEdgeForDown();
  // edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // while (edgeForChahgeDown.every(el => el === edgeForChahgeDown[0])) {
  //   console.log('#########3333333333333333');
  //   apply('D');
  //   edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // }
  // apply("R'");
  // apply('D');
  // apply('R');

  // // // -------------------------Edge4----------------------------------------
  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  createEdgeForDown();
  // edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // while (edgeForChahgeDown.every(el => el === edgeForChahgeDown[0])) {
  //   apply('D');
  //   edgeForChahgeDown = calcState.getRow('D', 0).slice(1, -1);
  // }
  // apply("R'");
  // apply('D');
  // apply('R');
  // ===========================CheckLines===========================

  // ============================Up======================
  // -----------------------------Edge1------------------------------------

  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  console.log('Global firstElementCF', firstElementCF);
  createEdgeForUp();
  // let edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log(edgeForChahgeUp);
  // while (edgeForChahgeUp.every(el => el === edgeForChahgeUp[0])) {
  //   apply('U');
  //   edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }

  // apply('R');
  // apply("U'");
  // apply("R'");

  // -----------------------------Edge2------------------------------------

  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  console.log('Global firstElementCF', firstElementCF);
  createEdgeForUp();
  // edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log(edgeForChahgeUp);
  // while (edgeForChahgeUp.every(el => el === edgeForChahgeUp[0])) {
  //   apply('U');
  //   edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }

  // apply('R');
  // apply("U'");
  // apply("R'");

  // // -----------------------------Edge3------------------------------------

  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  console.log('Global firstElementCF', firstElementCF);
  createEdgeForUp();
  // edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log(edgeForChahgeUp);
  // while (edgeForChahgeUp.every(el => el === edgeForChahgeUp[0])) {
  //   apply('U');
  //   edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }

  // apply('R');
  // apply("U'");
  // apply("R'");

  // // // -----------------------------Edge4------------------------------------

  firstElementCF = calcState.getCell('F', 1, calcState.size - 1);
  console.log('Global firstElementCF', firstElementCF);
  createEdgeForUp();
  // edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // console.log(edgeForChahgeUp);
  // while (edgeForChahgeUp.every(el => el === edgeForChahgeUp[0])) {
  //   apply('U');
  //   edgeForChahgeUp = calcState.getRow('U', calcState.size - 1).slice(1, -1);
  // }

  // apply('R');
  // apply("U'");
  // apply("R'");
  // ==============================================================
  checkSides();
  return {
    solution,
    state: calcState,
  };
}
