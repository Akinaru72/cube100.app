export function onSolve9thCornersSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = [];
  let index;

  // let aU = calcState.getCell('U', 1, 0);
  // console.log(aU);
  // let bU = calcState.getCell('U', 0, 1);
  // console.log(bU);
  // let cU = calcState.getCell('U', 1, calcState.size - 1);
  // console.log(cU);
  // let dU = calcState.getCell('U', calcState.size - 1, 1);
  // console.log(dU);

  // let cD = calcState.getCell('D', 1, calcState.size - 1);
  // console.log(cD);

  // let cF = calcState.getCell('F', 1, calcState.size - 1);
  // console.log(cF);

  // let cL = calcState.getCell('L', 1, calcState.size - 1);
  // console.log(cL);

  // let cB = calcState.getCell('B', 1, calcState.size - 1);
  // console.log(cB);

  // let cR = calcState.getCell('R', 1, calcState.size - 1);
  // console.log(cR);

  const arrayEdgesIndex = Array.from(
    { length: calcState.size - 2 },
    (_, i) => i + 2
  );

  const arrayFullIndex = Array.from(
    { length: calcState.size },
    (_, i) => i + 1
  );
  function findSolveCorner(corner) {
    if (
      (calcState.getCell('D', 0, 0).includes(corner[0]) &&
        calcState.getCell('D', 0, 0).includes(corner[1]) &&
        calcState.getCell('D', 0, 0).includes(corner[2])) ||
      (calcState.getCell('D', 0, calcState.size - 1).includes(corner[0]) &&
        calcState.getCell('D', 0, calcState.size - 1).includes(corner[1]) &&
        calcState.getCell('D', 0, calcState.size - 1).includes(corner[2])) ||
      (calcState.getCell('D', calcState.size - 1, 0).includes(corner[0]) &&
        calcState.getCell('D', calcState.size - 1, 0).includes(corner[1]) &&
        calcState.getCell('D', calcState.size - 1, 0).includes(corner[2])) ||
      (calcState
        .getCell('D', calcState.size - 1, calcState.size - 1)
        .includes(corner[0]) &&
        calcState
          .getCell('D', calcState.size - 1, calcState.size - 1)
          .includes(corner[1]) &&
        calcState
          .getCell('D', calcState.size - 1, calcState.size - 1)
          .includes(corner[2]))
    ) {
      console.log('Find');
      console.log(calcState.getCell('D', 0, 0));
      console.log(calcState.getCell('D', 0, calcState.size - 1));
      console.log(calcState.getCell('D', calcState.size - 1, 0));
      console.log(
        calcState.getCell('D', calcState.size - 1, calcState.size - 1)
      );
      if (
        calcState.getCell('D', 0, 0) ===
          `${corner[2] + corner[0] + corner[1]}` ||
        calcState.getCell('D', 0, calcState.size - 1) ===
          `${corner[2] + corner[0] + corner[1]}` ||
        calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[2] + corner[0] + corner[1]}` ||
        calcState.getCell('D', calcState.size - 1, calcState.size - 1) ===
          `${corner[2] + corner[0] + corner[1]}`
      ) {
        console.log('FindL');

        if (
          calcState.getCell('D', 0, calcState.size - 1) ===
          `${corner[2] + corner[0] + corner[1]}`
        ) {
          console.log('CoRnER', calcState.getCell('D', 0, calcState.size - 1));
          console.log(corner);
          apply("D'");
        }

        if (
          calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[2] + corner[0] + corner[1]}`
        ) {
          console.log('CoRnER', calcState.getCell('D', calcState.size - 1, 0));
          console.log(corner);
          apply('D');
        }

        if (
          calcState.getCell('D', calcState.size - 1, calcState.size - 1) ===
          `${corner[2] + corner[0] + corner[1]}`
        ) {
          console.log(
            calcState.getCell('D', calcState.size - 1, calcState.size - 1)
          );
          console.log('i am here');
          apply("D'");
          apply("D'");
        }

        apply("R'");
        apply('D');
        apply('R');
      } else if (
        calcState.getCell('D', 0, 0) ===
          `${corner[1] + corner[2] + corner[0]}` ||
        calcState.getCell('D', 0, calcState.size - 1) ===
          `${corner[1] + corner[2] + corner[0]}` ||
        calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[1] + corner[2] + corner[0]}` ||
        calcState.getCell('D', calcState.size - 1, calcState.size - 1) ===
          `${corner[1] + corner[2] + corner[0]}`
      ) {
        console.log('FindR');
        if (
          calcState.getCell('D', 0, 0) ===
          `${corner[1] + corner[2] + corner[0]}`
        ) {
          apply('2D');
        }
        if (
          calcState.getCell('D', 0, calcState.size - 1) ===
          `${corner[1] + corner[2] + corner[0]}`
        ) {
          apply('D');
        }
        if (
          calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[1] + corner[2] + corner[0]}`
        ) {
          apply("D'");
        }

        apply('F');
        apply("D'");
        apply("F'");
      } else if (
        calcState.getCell('D', 0, 0) ===
          `${corner[0] + corner[1] + corner[2]}` ||
        calcState.getCell('D', 0, calcState.size - 1) ===
          `${corner[0] + corner[1] + corner[2]}` ||
        calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[0] + corner[1] + corner[2]}` ||
        calcState.getCell('D', calcState.size - 1, calcState.size - 1) ===
          `${corner[0] + corner[1] + corner[2]}`
      ) {
        console.log('FindD');
        console.log(corner);
        if (
          calcState.getCell('D', 0, 0) ===
          `${corner[0] + corner[1] + corner[2]}`
        ) {
          apply('D');
        }

        if (
          calcState.getCell('D', calcState.size - 1, 0) ===
          `${corner[0] + corner[1] + corner[2]}`
        ) {
          apply('2D');
        }

        if (
          calcState.getCell('D', calcState.size - 1, calcState.size - 1) ===
          `${corner[0] + corner[1] + corner[2]}`
        ) {
          apply("D'");
        }

        apply("R'");
        apply('D');
        apply('R');
        apply('F');
        apply("D'");
        apply("D'");
        apply("F'");
      }
    }
  }
  function solveCorner(corner) {
    console.log(
      'solveCorner',
      calcState.getCell('U', calcState.size - 1, calcState.size - 1)
    );
    if (
      calcState.getCell('U', calcState.size - 1, calcState.size - 1) ===
      `${corner}`
    ) {
      console.log('Solve');
      return;
    }
    findSolveCorner(corner);
    if (
      calcState.getCell('U', calcState.size - 1, calcState.size - 1) ===
      `${corner}`
    ) {
      console.log('Solve');
      return;
    }

    if (
      calcState
        .getCell('U', calcState.size - 1, calcState.size - 1)
        .includes('W')
    ) {
      while (calcState.getCell('F', calcState.size - 1, 0).includes('W')) {
        apply('D');
      }
      apply("R'");
      apply('D');
      apply('R');
    }
    findSolveCorner(corner);
  }

  function createCorners() {
    let cornerUcd = calcState.getCell(
      'U',
      calcState.size - 1,
      calcState.size - 1
    );
    console.log(
      'createCorners',
      calcState.getCell('U', calcState.size - 1, calcState.size - 1)
    );

    solveCorner('WRG');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WBR');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WOB');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WGO');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WRG');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WBR');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WOB');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveCorner('WGO');
    apply(`U[${arrayFullIndex.join(',')}]`);
  }

  // console.log(calcState.getCell('D', 0, 0));
  // console.log(calcState.getCell('D', 0, calcState.size - 1));
  // console.log(calcState.getCell('D', calcState.size - 1, 0));
  // console.log(calcState.getCell('D', calcState.size - 1, calcState.size - 1));

  createCorners();

  return {
    solution,
    state: calcState,
  };
}
