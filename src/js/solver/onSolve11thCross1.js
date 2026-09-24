export function onSolve11thCrossSol(state) {
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

  const arrayHalfIndex = Array.from({ length: half }, (_, i) => i + 1);

  console.log(calcState.getCell('U', 1, 0));
  console.log(calcState.getCell('U', 0, 1));
  console.log(calcState.getCell('U', 1, calcState.size - 1));
  console.log(calcState.getCell('U', calcState.size - 1, 1));

  function createCross() {
    let arrayUColors = [];
    let a = calcState.getCell('U', 1, 0)[0];
    arrayUColors.push(a);
    let b = calcState.getCell('U', 0, 1)[0];
    arrayUColors.push(b);
    let c = calcState.getCell('U', 1, calcState.size - 1)[0];
    arrayUColors.push(c);
    let d = calcState.getCell('U', calcState.size - 1, 1)[0];
    arrayUColors.push(d);
    console.log(arrayUColors);

    const countY = arrayUColors.filter(el => el === 'Y').length;
    console.log('countY', countY);
    if (countY === 1 || countY === 3) {
      if (countY === 1) {
        while (calcState.getCell('U', 0, 1)[0] !== 'Y') {
          console.log('One Y');
          apply('U');
        }
      } else {
        while (calcState.getCell('U', calcState.size - 1, 1)[0] === 'Y') {
          console.log('Three Y');
          apply('U');
        }
      }
      apply(`2R[${arrayHalfIndex.join(',')}]`);
      apply('2B');
      apply('2U');
      apply(`L[${arrayHalfIndex.join(',')}]`);
      apply('2U');
      apply(`R'[${arrayHalfIndex.join(',')}]`);
      apply('2U');
      apply(`R[${arrayHalfIndex.join(',')}]`);
      apply('2U');
      apply('2F');
      apply(`R[${arrayHalfIndex.join(',')}]`);
      apply('2F');
      apply(`L'[${arrayHalfIndex.join(',')}]`);
      apply('2B');
      apply(`2R[${arrayHalfIndex.join(',')}]`);
      apply('U');
      console.log('Solving...');
      if (
        calcState
          .getCol('U', 0)
          .slice(1, -1)
          .every(el => el[0] === 'Y') &&
        calcState
          .getRow('U', 0)
          .slice(1, -1)
          .every(el => el[0] === 'Y') &&
        calcState
          .getCol('U', calcState.size - 1)
          .slice(1, -1)
          .every(el => el[0] === 'Y') &&
        calcState
          .getRow('U', calcState.size - 1)
          .slice(1, -1)
          .every(el => el[0] === 'Y')
      ) {
        console.log('Solve');
        return;
      }
    } else if (countY === 0) {
      apply('F');
      apply('U');
      apply('R');
      apply("U'");
      apply("R'");
      apply("F'");
      apply('U');
    } else if (countY === 2) {
      console.log(calcState.getCell('U', 1, 0)[0]);
      console.log(calcState.getCell('U', 1, calcState.size - 1)[0]);

      if (
        calcState.getCell('U', 1, 0)[0] ===
          calcState.getCell('U', 1, calcState.size - 1)[0] ||
        calcState.getCell('U', 0, 1)[0] ===
          calcState.getCell('U', calcState.size - 1, 1)[0]
      ) {
        while (calcState.getCell('U', calcState.size - 1, 1)[0] === 'Y') {
          console.log('Two Y - ||');
          apply('U');
        }
      } else {
        while (
          calcState.getCell('U', 1, calcState.size - 1)[0] === 'Y' ||
          calcState.getCell('U', calcState.size - 1, 1)[0] === 'Y'
        ) {
          console.log('Two Y - Г');
          apply('U');
        }
        apply('F');
        apply('U');
        apply('R');
        apply("U'");
        apply("R'");
        apply("F'");
        return;
      }
    }

    apply('F');
    apply('R');
    apply('U');
    apply("R'");
    apply("U'");
    apply("F'");

    console.log('Iam here');
    if (
      calcState
        .getCol('U', 0)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      calcState
        .getRow('U', 0)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      calcState
        .getCol('U', calcState.size - 1)
        .slice(1, -1)
        .every(el => el[0] === 'Y') &&
      calcState
        .getRow('U', calcState.size - 1)
        .slice(1, -1)
        .every(el => el[0] === 'Y')
    ) {
      console.log('Solve');
      return;
    }
  }
  apply(`2R[${arrayFullIndex.join(',')}]`);
  createCross();
  apply(`2R[${arrayFullIndex.join(',')}]`);
  return {
    solution,
    state: calcState,
  };
}
