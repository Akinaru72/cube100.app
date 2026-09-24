export function onSolve7thEdgeSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = [];
  let index;
  function collectEdge() {
    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesL() &&
      calcState.isSolvedEgdesR()
    ) {
      console.log('Solved__________________');
      return;
    }
    let a = calcState.getCol('R', 0).slice(1, -1);
    let aEl = a[0];
    let aRev = aEl[1] + aEl[0];

    if (a.every(el => el === aEl || el === aRev)) {
      console.log('return_collectEdge');
      return;
    }

    if (a.every(el => el === a[0])) {
      console.log(collectEdge);
      return;
    }

    let Ra = calcState.getCol('R', 0).slice(1, -1);
    let indexMiddleEl = Math.floor(Ra.length / 2);
    console.log(indexMiddleEl);
    let elementRa = Ra[indexMiddleEl];

    let reverseRa = elementRa[1] + elementRa[0];
    console.log(elementRa);
    console.log(reverseRa);
    let arrayRa = [];
    Ra.forEach((el, idx) => {
      if (el === Ra[indexMiddleEl] || el === reverseRa) {
        arrayRa.push(idx);
      }
    });
    console.log(arrayRa);

    let Rc = calcState.getCol('R', calcState.size - 1).slice(1, -1);
    console.log(indexMiddleEl);
    let elementRc = Rc[indexMiddleEl];
    let reverseRc = elementRc[1] + elementRc[0];
    console.log(elementRc);
    console.log(reverseRc);

    let arrayRc = [];
    Rc.forEach((el, idx) => {
      if (el === Rc[indexMiddleEl] || el === reverseRc) {
        arrayRc.push(idx);
      }
    });
    console.log(arrayRc);
    console.log(JSON.stringify(arrayRa) === JSON.stringify(arrayRc));

    if (JSON.stringify(arrayRa) === JSON.stringify(arrayRc)) {
      apply('B');
      apply("U'");
      apply("L'");
      apply('2B');
    }

    let arrayChange = [];
    console.log(Ra[indexMiddleEl]);
    console.log(reverseRa);
    Ra.forEach((el, idx) => {
      if (el !== Ra[indexMiddleEl] && el !== reverseRa) {
        arrayChange.push(idx + 2);
      }
    });
    console.log(arrayChange);

    apply(`U'[${arrayChange.join(',')}]`);
    apply('B');
    apply('U');
    apply("B'");
    apply('R');
    apply("B'");
    apply("R'");
    apply('B');
    apply(`U[${arrayChange.join(',')}]`);

    Ra = calcState.getCol('R', 0).slice(1, -1);
    indexMiddleEl = Math.floor(Ra.length / 2);
    elementRa = Ra[indexMiddleEl];
    while (!Ra.every(el => el === Ra[indexMiddleEl] || el === reverseRa)) {
      Ra = calcState.getCol('R', 0).slice(1, -1);
      console.log(Ra);
      elementRa = Ra[indexMiddleEl];
      reverseRa = elementRa[1] + elementRa[0];
      arrayRa = [];
      Ra.forEach((el, idx) => {
        if (el === Ra[indexMiddleEl] || el === reverseRa) {
          arrayRa.push(idx);
        }
      });
      console.log(arrayRa);

      Rc = calcState.getCol('R', calcState.size - 1).slice(1, -1);
      console.log(Rc);
      elementRc = Rc[indexMiddleEl];
      reverseRc = elementRc[1] + elementRc[0];
      arrayRc = [];
      Rc.forEach((el, idx) => {
        if (el === Rc[indexMiddleEl] || el === reverseRc) {
          arrayRc.push(idx);
        }
      });
      console.log(arrayRc);

      console.log(JSON.stringify(arrayRa) === JSON.stringify(arrayRc));

      if (JSON.stringify(arrayRa) === JSON.stringify(arrayRc)) {
        apply('B');
        apply("U'");
        apply("L'");
        apply('2B');
      }

      Ra = calcState.getCol('R', 0).slice(1, -1);
      arrayChange = [];
      console.log(Ra[indexMiddleEl]);
      console.log(reverseRa);
      Ra.forEach((el, idx) => {
        if (el !== Ra[indexMiddleEl] && el !== reverseRa) {
          arrayChange.push(idx + 2);
        }
      });
      console.log(arrayChange);
      const mid = Math.floor(Ra.length / 2);
      console.log('mid', mid);

      const firstHarfArray = arrayChange.filter(index => index < mid + 2);
      const secondHarfArray = arrayChange.filter(
        index => index > Ra.length - mid + 1
      );
      console.log(firstHarfArray);
      console.log(secondHarfArray);
      if (firstHarfArray.length > secondHarfArray.length) {
        if (firstHarfArray.length > 0) {
          apply(`U'[${firstHarfArray.join(',')}]`);
          apply('B');
          apply('U');
          apply("B'");
          apply('R');
          apply("B'");
          apply("R'");
          apply('B');
          apply(`U[${firstHarfArray.join(',')}]`);
        }

        Ra = calcState.getCol('R', 0).slice(1, -1);
        console.log(Ra);
        elementRa = Ra[indexMiddleEl];
        reverseRa = elementRa[1] + elementRa[0];
        arrayRa = [];
        Ra.forEach((el, idx) => {
          if (el === Ra[indexMiddleEl] || el === reverseRa) {
            arrayRa.push(idx);
          }
        });
        console.log(arrayRa);

        Rc = calcState.getCol('R', calcState.size - 1).slice(1, -1);
        console.log(Rc);
        elementRc = Rc[indexMiddleEl];
        reverseRc = elementRc[1] + elementRc[0];
        arrayRc = [];
        Rc.forEach((el, idx) => {
          if (el === Rc[indexMiddleEl] || el === reverseRc) {
            arrayRc.push(idx);
          }
        });
        console.log(arrayRc);

        console.log(JSON.stringify(arrayRa) === JSON.stringify(arrayRc));

        if (JSON.stringify(arrayRa) === JSON.stringify(arrayRc)) {
          apply('B');
          apply("U'");
          apply("L'");
          apply('2B');
        }

        // console.log(arrayChange);
        if (secondHarfArray.length > 0) {
          apply(`U'[${secondHarfArray.join(',')}]`);
          apply('B');
          apply('U');
          apply("B'");
          apply('R');
          apply("B'");
          apply("R'");
          apply('B');
          apply(`U[${secondHarfArray.join(',')}]`);
        }
      } else {
        if (secondHarfArray.length > 0) {
          apply(`U'[${secondHarfArray.join(',')}]`);
          apply('B');
          apply('U');
          apply("B'");
          apply('R');
          apply("B'");
          apply("R'");
          apply('B');
          apply(`U[${secondHarfArray.join(',')}]`);
        }

        Ra = calcState.getCol('R', 0).slice(1, -1);
        console.log(Ra);
        elementRa = Ra[indexMiddleEl];
        reverseRa = elementRa[1] + elementRa[0];
        arrayRa = [];
        Ra.forEach((el, idx) => {
          if (el === Ra[indexMiddleEl] || el === reverseRa) {
            arrayRa.push(idx);
          }
        });
        console.log(arrayRa);

        Rc = calcState.getCol('R', calcState.size - 1).slice(1, -1);
        console.log(Rc);
        elementRc = Rc[indexMiddleEl];
        reverseRc = elementRc[1] + elementRc[0];
        arrayRc = [];
        Rc.forEach((el, idx) => {
          if (el === Rc[indexMiddleEl] || el === reverseRc) {
            arrayRc.push(idx);
          }
        });
        console.log(arrayRc);

        console.log(JSON.stringify(arrayRa) === JSON.stringify(arrayRc));

        if (JSON.stringify(arrayRa) === JSON.stringify(arrayRc)) {
          apply('B');
          apply("U'");
          apply("L'");
          apply('2B');
        }

        if (firstHarfArray.length > 0) {
          apply(`U'[${firstHarfArray.join(',')}]`);
          apply('B');
          apply('U');
          apply("B'");
          apply('R');
          apply("B'");
          apply("R'");
          apply('B');
          apply(`U[${firstHarfArray.join(',')}]`);
        }
      }
      Ra = calcState.getCol('R', 0).slice(1, -1);
      indexMiddleEl = Math.floor(Ra.length / 2);
      elementRa = Ra[indexMiddleEl];
    }
  }

  function solveEdge() {
    if (
      calcState.isSolvedEgdesD() &&
      calcState.isSolvedEgdesU() &&
      calcState.isSolvedEgdesL() &&
      calcState.isSolvedEgdesR()
    ) {
      console.log('Solved__________________');
      return;
    }
    let Ra = calcState.getCol('R', 0).slice(1, -1);
    if (Ra.every(el => el === Ra[0])) {
      console.log('solveEdge');
      return;
    }
    let indexMiddleEl = Math.floor(Ra.length / 2);
    let arrayChange = [];
    console.log(Ra[indexMiddleEl]);
    // console.log(reverseRa);
    Ra.forEach((el, idx) => {
      if (el !== Ra[indexMiddleEl]) {
        arrayChange.push(idx + 2);
      }
    });
    console.log(arrayChange);
    const mid = Math.floor(Ra.length / 2);
    console.log('mid', mid);

    const firstHarfArray = arrayChange.filter(index => index < mid + 2);
    const secondHarfArray = arrayChange.filter(
      index => index > Ra.length - mid + 1
    );
    console.log('secondHarfArray', secondHarfArray);

    apply(`2U'[${secondHarfArray.join(',')}]`);
    apply('2B');
    apply('2R');
    apply(`D'[${secondHarfArray.join(',')}]`);
    apply('2R');
    apply(`U[${secondHarfArray.join(',')}]`);
    apply('2R');
    apply(`U'[${secondHarfArray.join(',')}]`);
    apply('2R');
    apply('2F');
    apply(`U'[${secondHarfArray.join(',')}]`);
    apply('2F');
    apply(`D[${secondHarfArray.join(',')}]`);
    apply('2B');
    apply(`2U[${secondHarfArray.join(',')}]`);
  }
  collectEdge();

  solveEdge();
  apply('2R');
  solveEdge();

  let a = calcState.getCol('U', 0);
  // console.log(a);
  let b = calcState.getRow('U', 0);
  // console.log(b);
  let c = calcState.getCol('U', calcState.size - 1);
  // console.log(c);
  let d = calcState.getRow('U', calcState.size - 1);
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);

  return {
    solution,
    state: calcState,
  };
}
