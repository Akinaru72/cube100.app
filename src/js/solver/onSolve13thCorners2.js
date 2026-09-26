export function onSolve13thCornersSol(state) {
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

  let arrayUColors = [];
  console.log(calcState.getCell('U', 0, 0));
  arrayUColors.push(calcState.getCell('U', 0, 0));
  console.log(calcState.getCell('U', 0, calcState.size - 1));
  arrayUColors.push(calcState.getCell('U', 0, calcState.size - 1));
  console.log(calcState.getCell('U', calcState.size - 1, calcState.size - 1));
  arrayUColors.push(
    calcState.getCell('U', calcState.size - 1, calcState.size - 1)
  );
  console.log(calcState.getCell('U', calcState.size - 1, 0));
  arrayUColors.push(calcState.getCell('U', calcState.size - 1, 0));
  console.log(arrayUColors);
  const countY = arrayUColors.filter(el => el === 'Y').length;
  function changeVerticalCorners() {
    apply('R');
    apply('2U');
    apply("R'");
    apply("U'");
    apply('R');
    apply('2U');
    apply("L'");
    apply('U');
    apply("R'");
    apply("U'");
    apply('L');
  }

  function changeDiagonalCorners() {
    apply('F');
    apply('R');
    apply("U'");
    apply("R'");
    apply("U'");
    apply('R');
    apply('U');
    apply("R'");
    apply("F'");
    apply('R');
    apply('U');
    apply("R'");
    apply("U'");
    apply("R'");
    apply('F');
    apply('R');
    apply("F'");
  }

  function solveCorners() {
    while (calcState.getCell('U', calcState.size - 1, 0) !== 'YBO') {
      apply('U');
    }
    if (
      calcState.getCell('U', 0, 0) === 'YOG' &&
      calcState.getCell('U', 0, calcState.size - 1) === 'YGR' &&
      calcState.getCell('U', calcState.size - 1, 0) === 'YBO' &&
      calcState.getCell('U', calcState.size - 1, calcState.size - 1) === 'YRB'
    ) {
      console.log('Solved');
      return;
    }
    let arrayUColors = [];
    console.log(calcState.getCell('U', 0, 0));
    arrayUColors.push(calcState.getCell('U', 0, 0).slice(1, 3));
    console.log(calcState.getCell('U', 0, calcState.size - 1));
    arrayUColors.push(
      calcState.getCell('U', 0, calcState.size - 1).slice(1, 3)
    );
    console.log(calcState.getCell('U', calcState.size - 1, calcState.size - 1));
    arrayUColors.push(
      calcState.getCell('U', calcState.size - 1, calcState.size - 1).slice(1, 3)
    );
    console.log(calcState.getCell('U', calcState.size - 1, 0));
    arrayUColors.push(
      calcState.getCell('U', calcState.size - 1, 0).slice(1, 3)
    );
    console.log(arrayUColors);
    if (arrayUColors[0].slice(1) === arrayUColors[1].slice(0, 1)) {
      console.log('1&2');
      apply("U'");
      changeVerticalCorners();
    } else if (arrayUColors[1].slice(1) === arrayUColors[2].slice(0, 1)) {
      console.log('2&3');
      apply('2U');
      changeVerticalCorners();
    } else if (arrayUColors[2].slice(1) === arrayUColors[3].slice(0, 1)) {
      console.log('3&4');
      apply('U');
      changeVerticalCorners();
    } else if (arrayUColors[3].slice(1) === arrayUColors[0].slice(0, 1)) {
      console.log('4&1');
      changeVerticalCorners();
    } else {
      console.log('diagonal');
      changeDiagonalCorners();
    }
    while (calcState.getCell('U', calcState.size - 1, 0) !== 'YBO') {
      apply('U');
    }
  }

  apply(`2R[${arrayFullIndex.join(',')}]`);
  solveCorners();
  apply(`2R[${arrayFullIndex.join(',')}]`);
  return {
    solution,
    state: calcState,
  };
}
