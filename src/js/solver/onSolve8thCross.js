export function onSolve8thCrossSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = [];
  let index;

  function checkFLBRSides() {
    // const centralLevel = Math.floor(calcState.size / 2) + 1;
    let centalF = calcState.getCell('F', 1, 1);
    console.log('F =', centalF);
    let centalU = calcState.getCell('U', 1, 1);
    console.log('U =', centalU);
    let centalR = calcState.getCell('R', 1, 1);
    console.log('R =', centalR);
    let centalL = calcState.getCell('L', 1, 1);
    console.log('L =', centalL);
    let centalB = calcState.getCell('B', 1, 1);
    console.log('B =', centalB);
    let centalD = calcState.getCell('D', 1, 1);
    console.log('D =', centalD);
    if (centalB === 'W') {
      apply(`R'[${arrayFullIndex.join(',')}]`);
    } else if (centalF === 'W') {
      apply(`R[${arrayFullIndex.join(',')}]`);
    } else if (centalR === 'W') {
      apply(`F'[${arrayFullIndex.join(',')}]`);
    } else if (centalL === 'W') {
      apply(`F[${arrayFullIndex.join(',')}]`);
    } else if (centalD === 'W') {
      apply(`2R[${arrayFullIndex.join(',')}]`);
    }
    centalF = calcState.getCell('F', 1, 1);
    console.log('F =', centalF);
    centalU = calcState.getCell('U', 1, 1);
    console.log('U =', centalU);
    centalR = calcState.getCell('R', 1, 1);
    console.log('R =', centalR);
    centalL = calcState.getCell('L', 1, 1);
    console.log('L =', centalL);
    centalB = calcState.getCell('B', 1, 1);
    console.log('B =', centalB);
    centalD = calcState.getCell('D', 1, 1);
    console.log('D =', centalD);

    if (centalL === 'G') {
      apply(`U'[${arrayFullIndex.join(',')}]`);
    } else if (centalR === 'G') {
      apply(`U[${arrayFullIndex.join(',')}]`);
    } else if (centalB === 'G') {
      apply(`2U'[${arrayFullIndex.join(',')}]`);
    }
  }

  const arrayEdgesIndex = Array.from(
    { length: calcState.size - 2 },
    (_, i) => i + 2
  );

  const arrayFullIndex = Array.from(
    { length: calcState.size },
    (_, i) => i + 1
  );

  function createCross() {
    while (
      calcState.getCell('F', 1, calcState.size - 1).includes('W') ||
      calcState.getCell('L', 1, calcState.size - 1).includes('W') ||
      calcState.getCell('B', 1, calcState.size - 1).includes('W') ||
      calcState.getCell('R', 1, calcState.size - 1).includes('W')
    ) {
      if (calcState.getCell('F', 1, calcState.size - 1).includes('W')) {
        while (calcState.getCell('D', 1, calcState.size - 1).includes('W')) {
          apply('D');
        }
        apply("R'");
      }
      apply(`U'[${arrayEdgesIndex.join(',')}]`);
    }

    while (
      calcState.getCell('U', 1, 0).includes('W') ||
      calcState.getCell('U', 0, 1).includes('W') ||
      calcState.getCell('U', 1, calcState.size - 1).includes('W') ||
      calcState.getCell('U', calcState.size - 1, 1).includes('W')
    ) {
      if (calcState.getCell('U', 1, calcState.size - 1).includes('W')) {
        while (calcState.getCell('D', 1, calcState.size - 1).includes('W')) {
          apply('D');
        }
        apply("2R'");
      }
      apply('U');
    }

    checkFLBRSides();

    apply(`R[${arrayFullIndex.join(',')}]`);

    let aF = calcState.getCell('F', 1, 0)[0];
    console.log(aF);
    let bF = calcState.getCell('F', 0, 1)[0];
    console.log(bF);
    let cF = calcState.getCell('F', 1, calcState.size - 1)[0];
    console.log(cF);
    let dF = calcState.getCell('F', calcState.size - 1, 1)[0];
    console.log(dF);

    while (
      calcState.getCell('F', 1, 0).slice(0, 1) !== 'W' ||
      calcState.getCell('F', 0, 1).slice(0, 1) !== 'W' ||
      calcState.getCell('F', 1, calcState.size - 1).slice(0, 1) !== 'W' ||
      calcState.getCell('F', calcState.size - 1, 1).slice(0, 1) !== 'W'
    ) {
      while (calcState.getCell('F', 1, calcState.size - 1).slice(1) !== 'W') {
        apply("F'");
      }
      apply('R');
      apply("F'");
      apply('U');
    }

    while (calcState.getCell('F', 0, 1) !== 'WG') {
      apply("F'");
    }
    apply("U'");
    apply("U'");

    apply(`F'[${arrayFullIndex.join(',')}]`);

    while (calcState.getCell('F', 0, 1) !== 'WR') {
      apply("F'");
    }
    apply("U'");
    apply("U'");

    apply(`F'[${arrayFullIndex.join(',')}]`);

    while (calcState.getCell('F', 0, 1) !== 'WB') {
      apply("F'");
    }
    apply("U'");
    apply("U'");

    apply(`F'[${arrayFullIndex.join(',')}]`);

    while (calcState.getCell('F', 0, 1) !== 'WO') {
      apply("F'");
    }
    apply("U'");
    apply("U'");

    apply(`R'[${arrayFullIndex.join(',')}]`);
    apply(`U[${arrayFullIndex.join(',')}]`);
  }

  checkFLBRSides();
  console.log('Iam here');
  createCross();

  return {
    solution,
    state: calcState,
  };
}
