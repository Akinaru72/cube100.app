export function onSolve12thCornersSol(state) {
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
  function collectCorners() {
    let arrayUColors = [];
    console.log(calcState.getCell('U', 0, 0));
    arrayUColors.push(calcState.getCell('U', 0, 0)[0]);
    console.log(calcState.getCell('U', 0, calcState.size - 1));
    arrayUColors.push(calcState.getCell('U', 0, calcState.size - 1)[0]);
    console.log(calcState.getCell('U', calcState.size - 1, calcState.size - 1));
    arrayUColors.push(
      calcState.getCell('U', calcState.size - 1, calcState.size - 1)[0]
    );
    console.log(calcState.getCell('U', calcState.size - 1, 0));
    arrayUColors.push(calcState.getCell('U', calcState.size - 1, 0)[0]);
    console.log(arrayUColors);
    const countY = arrayUColors.filter(el => el === 'Y').length;

    if (
      countY === 0
      // calcState.getCell('U', 0, 0)[0] !== 'Y' &&
      // calcState.getCell('U', 0, calcState.size - 1)[0] !== 'Y' &&
      // calcState.getCell('U', calcState.size - 1, 0)[0] !== 'Y' &&
      // calcState.getCell('U', calcState.size - 1, calcState.size - 1)[0] !== 'Y'
    ) {
      console.log('Y-0');
      while (
        calcState.getCell('U', 0, 0)[1] !== 'Y' ||
        calcState.getCell('U', calcState.size - 1, 0)[2] !== 'Y'
      ) {
        apply('U');
      }

      apply('R');
      apply('U');
      apply("R'");
      apply('U');
      apply('R');
      apply('2U');
      apply("R'");
    } else if (countY === 2) {
      console.log('Y-2');
      while (calcState.getCell('U', calcState.size - 1, 0)[1] !== 'Y') {
        apply('U');
      }
      apply('R');
      apply('U');
      apply("R'");
      apply('U');
      apply('R');
      apply('2U');
      apply("R'");
    } else if (countY === 4) {
      console.log('Y-4');
      return;
    }

    if (
      calcState.getCell('U', calcState.size - 1, 0)[1] === 'Y' ||
      calcState.getCell('U', calcState.size - 1, calcState.size - 1)[1] === 'Y'
    ) {
      console.log('Y-Left');
      while (
        calcState.getCell('U', calcState.size - 1, calcState.size - 1)[0] !==
        'Y'
      ) {
        apply('U');
      }
      apply("L'");
      apply("U'");
      apply('L');
      apply("U'");
      apply("L'");
      apply('2U');
      apply('L');
    } else {
      console.log('Y-Right');
      while (calcState.getCell('U', calcState.size - 1, 0)[0] !== 'Y') {
        apply('U');
      }
      apply('R');
      apply('U');
      apply("R'");
      apply('U');
      apply('R');
      apply('2U');
      apply("R'");
    }
  }
  apply(`2R[${arrayFullIndex.join(',')}]`);

  collectCorners();
  apply(`2R[${arrayFullIndex.join(',')}]`);
  return {
    solution,
    state: calcState,
  };
}
