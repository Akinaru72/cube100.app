export function onSolve14thCrossSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = [];
  let index;

  const arrayFullIndex = Array.from(
    { length: calcState.size },
    (_, i) => i + 1
  );

  const half = Math.floor(calcState.size / 2);

  const arrayHalfWithoutFirst = Array.from(
    { length: half - 1 },
    (_, i) => i + 2
  );

  const arrayHalfIndex = Array.from({ length: half }, (_, i) => i + 1);

  function moveRightEdges() {
    //  RU’-RU-RU-RU’-R’U’-R2
    apply('R');
    apply("U'");
    apply('R');
    apply('U');
    apply('R');
    apply('U');
    apply('R');
    apply("U'");
    apply("R'");
    apply("U'");
    apply('2R');
  }

  function moveLeftEdges() {
    //  L’U-L’U’-L’U’-L’U-LU-L2
    apply("L'");
    apply('U');
    apply("L'");
    apply("U'");
    apply("L'");
    apply("U'");
    apply("L'");
    apply('U');
    apply('L');
    apply('U');
    apply('2L');
  }

  function paritet() {
    apply(`2R[${arrayHalfWithoutFirst.join(',')}]`);
    apply('2U');
    apply(`2R[${arrayHalfWithoutFirst.join(',')}]`);
    apply(`2U[${arrayHalfIndex.join(',')}]`);
    apply(`2R[${arrayHalfWithoutFirst.join(',')}]`);
    apply(`2U[${arrayHalfIndex.join(',')}]`);
    apply('2U');
  }

  function solveEdges() {
    let arrayUColors = [];
    let a = calcState.getCell('U', 1, 0)[1];
    arrayUColors.push(a);
    let b = calcState.getCell('U', 0, 1)[1];
    arrayUColors.push(b);
    let c = calcState.getCell('U', 1, calcState.size - 1)[1];
    arrayUColors.push(c);
    let d = calcState.getCell('U', calcState.size - 1, 1)[1];
    arrayUColors.push(d);
    console.log('arrayUColors', arrayUColors);

    if (
      calcState.getCell('U', 1, 0)[1] === 'O' &&
      calcState.getCell('U', 0, 1)[1] === 'G' &&
      calcState.getCell('U', 1, calcState.size - 1)[1] === 'R' &&
      calcState.getCell('U', calcState.size - 1, 1)[1] === 'B'
    ) {
      console.log('Solve');
      return;
    }
    if (
      calcState.getCell('U', 1, 0)[1] !== 'O' &&
      calcState.getCell('U', 0, 1)[1] !== 'G' &&
      calcState.getCell('U', 1, calcState.size - 1)[1] !== 'R' &&
      calcState.getCell('U', calcState.size - 1, 1)[1] !== 'B'
    ) {
      console.log('0-Edges');
      if (calcState.getCell('U', 1, 0)[1] === 'G') {
        console.log('G-Left');
        if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'R') {
          console.log('MoveRIght');
          moveRightEdges();
        } else {
          console.log('MoveLeft');
          moveLeftEdges();
        }
      } else if (calcState.getCell('U', 1, calcState.size - 1)[1] === 'G') {
        console.log('G-Right');
        if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'O') {
          console.log('MoveLeft');
          moveLeftEdges();
        } else {
          console.log('MoveRight');
          moveRightEdges();
        }
      } else if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'G') {
        console.log('G-Front');
        if (calcState.getCell('U', 1, 0)[1] === 'B') {
          console.log('MoveRight');
          moveRightEdges();
        } else {
          console.log('MoveLeft');
          moveLeftEdges();
        }
      }
    }

    if (
      (calcState.getCell('U', 1, 0)[1] === 'O' &&
        calcState.getCell('U', 0, 1)[1] === 'G' &&
        calcState.getCell('U', 1, calcState.size - 1)[1] !== 'R' &&
        calcState.getCell('U', calcState.size - 1, 1)[1] !== 'B') ||
      (calcState.getCell('U', 1, 0)[1] === 'O' &&
        calcState.getCell('U', 0, 1)[1] !== 'G' &&
        calcState.getCell('U', 1, calcState.size - 1)[1] === 'R' &&
        calcState.getCell('U', calcState.size - 1, 1)[1] !== 'B') ||
      (calcState.getCell('U', 1, 0)[1] === 'O' &&
        calcState.getCell('U', 0, 1)[1] !== 'G' &&
        calcState.getCell('U', 1, calcState.size - 1)[1] !== 'R' &&
        calcState.getCell('U', calcState.size - 1, 1)[1] === 'B') ||
      (calcState.getCell('U', 1, 0)[1] !== 'O' &&
        calcState.getCell('U', 0, 1)[1] === 'G' &&
        calcState.getCell('U', 1, calcState.size - 1)[1] === 'R' &&
        calcState.getCell('U', calcState.size - 1, 1)[1] !== 'B') ||
      (calcState.getCell('U', 1, 0)[1] !== 'O' &&
        calcState.getCell('U', 0, 1)[1] !== 'G' &&
        calcState.getCell('U', 1, calcState.size - 1)[1] === 'R' &&
        calcState.getCell('U', calcState.size - 1, 1)[1] === 'B')
    ) {
      console.log('ParitetMove');
      paritet();
    } else if (
      calcState.getCell('U', 1, 0)[1] !== 'O' &&
      calcState.getCell('U', 0, 1)[1] === 'G' &&
      calcState.getCell('U', 1, calcState.size - 1)[1] !== 'R' &&
      calcState.getCell('U', calcState.size - 1, 1)[1] === 'B'
    ) {
      console.log('MoveU&ParitetMove');
      apply('U');
      paritet();
      apply("U'");
    }
    if (
      calcState.getCell('U', 1, 0)[1] === 'O' &&
      calcState.getCell('U', 0, 1)[1] === 'G' &&
      calcState.getCell('U', 1, calcState.size - 1)[1] === 'R' &&
      calcState.getCell('U', calcState.size - 1, 1)[1] === 'B'
    ) {
      console.log('Solve');
      return;
    }
    if (calcState.getCell('U', 1, 0)[1] === 'O') {
      apply('U');
      if (calcState.getCell('U', 1, calcState.size - 1)[1] === 'B') {
        console.log('i am here');
        console.log('MoveRight');
        moveRightEdges();
      } else {
        console.log('MoveLeft');
        moveLeftEdges();
      }
      apply("U'");
    } else if (calcState.getCell('U', 1, calcState.size - 1)[1] === 'R') {
      apply("U'");
      if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'B') {
        console.log('MoveRight');
        moveRightEdges();
      } else {
        console.log('MoveLeft');
        moveLeftEdges();
      }
      apply('U');
    } else if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'B') {
      apply('2U');
      if (calcState.getCell('U', 1, calcState.size - 1)[1] === 'R') {
        console.log('MoveRight');
        moveRightEdges();
      } else {
        console.log('MoveLeft');
        moveLeftEdges();
      }
      apply('2U');
    } else {
      console.log('NotMove');
      if (calcState.getCell('U', calcState.size - 1, 1)[1] === 'R') {
        console.log('MoveRight');
        moveRightEdges();
      } else {
        console.log('MoveLeft');
        moveLeftEdges();
      }
    }
  }
  apply(`2R[${arrayFullIndex.join(',')}]`);

  solveEdges();
  apply(`2R[${arrayFullIndex.join(',')}]`);
  return {
    solution,
    state: calcState,
  };
}
