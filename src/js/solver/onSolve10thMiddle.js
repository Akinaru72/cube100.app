export function onSolve10thMiddleSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = [];
  let index;

  const arrayEdgesIndex = Array.from(
    { length: calcState.size - 2 },
    (_, i) => i + 2
  );

  const arrayFullIndex = Array.from(
    { length: calcState.size },
    (_, i) => i + 1
  );

  function findSolveEdge(edge) {
    console.log(calcState.getCell('U', 1, 0));
    console.log(calcState.getCell('U', 0, 1));
    console.log(calcState.getCell('U', 1, calcState.size - 1));
    console.log(calcState.getCell('U', calcState.size - 1, 1));

    if (
      (calcState.getCell('U', 1, 0).includes(edge[0]) &&
        calcState.getCell('U', 1, 0).includes(edge[1])) ||
      (calcState.getCell('U', 0, 1).includes(edge[0]) &&
        calcState.getCell('U', 0, 1).includes(edge[1])) ||
      (calcState.getCell('U', 1, calcState.size - 1).includes(edge[0]) &&
        calcState.getCell('U', 1, calcState.size - 1).includes(edge[1])) ||
      (calcState.getCell('U', calcState.size - 1, 1).includes(edge[0]) &&
        calcState.getCell('U', calcState.size - 1, 1).includes(edge[1]))
    ) {
      console.log('Find');
      //
      if (
        calcState.getCell('U', 1, 0) === edge ||
        calcState.getCell('U', 0, 1) === edge ||
        calcState.getCell('U', 1, calcState.size - 1) === edge ||
        calcState.getCell('U', calcState.size - 1, 1) === edge
      ) {
        console.log('FindU');

        if (calcState.getCell('U', 1, 0) === edge) {
          apply('U');
        }

        if (calcState.getCell('U', 1, calcState.size - 1) === edge) {
          apply("U'");
        }

        if (calcState.getCell('U', calcState.size - 1, 1) === edge) {
          apply('2U');
        }
        apply("F'");
        apply('U');
        apply('F');
        apply('U');
        apply('R');
        apply("U'");
        apply("R'");
      } else if (
        calcState.getCell('U', 1, 0) === `${edge[1] + edge[0]}` ||
        calcState.getCell('U', 0, 1) === `${edge[1] + edge[0]}` ||
        calcState.getCell('U', 1, calcState.size - 1) ===
          `${edge[1] + edge[0]}` ||
        calcState.getCell('U', calcState.size - 1, 1) === `${edge[1] + edge[0]}`
      ) {
        console.log('FindX');
        if (calcState.getCell('U', 0, 1) === `${edge[1] + edge[0]}`) {
          apply("U'");
        }

        if (
          calcState.getCell('U', 1, calcState.size - 1) ===
          `${edge[1] + edge[0]}`
        ) {
          apply('2U');
        }

        if (
          calcState.getCell('U', calcState.size - 1, 1) ===
          `${edge[1] + edge[0]}`
        ) {
          apply('U');
        }

        apply('R');
        apply("U'");
        apply("R'");
        apply("U'");
        apply("F'");
        apply('U');
        apply('F');
      }
    }
  }

  function solveEdge(edge) {
    let solveEdge = calcState.getCell('F', 1, calcState.size - 1);
    console.log('solveEdge', calcState.getCell('F', 1, calcState.size - 1));
    if (calcState.getCell('F', 1, calcState.size - 1) === `${edge}`) {
      console.log('Solve');
      return;
    }

    findSolveEdge(edge);

    if (calcState.getCell('F', 1, calcState.size - 1) === `${edge}`) {
      console.log('Solve');
      return;
    }

    if (!calcState.getCell('F', 1, calcState.size - 1).includes('Y')) {
      console.log('Need to Change');
      while (!calcState.getCell('U', 0, 1).includes('Y')) {
        apply('U');
      }
      apply("F'");
      apply('U');
      apply('F');
      apply('U');
      apply('R');
      apply("U'");
      apply("R'");
    }
    findSolveEdge(edge);
  }

  function createEdges() {
    let edgeFR = calcState.getCell('F', 1, calcState.size - 1);
    console.log('edgeFR', calcState.getCell('F', 1, calcState.size - 1));
    solveEdge('BR');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('RG');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('GO');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('OB');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('BR');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('RG');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('GO');
    apply(`U[${arrayFullIndex.join(',')}]`);
    solveEdge('OB');
    apply(`U[${arrayFullIndex.join(',')}]`);
  }

  apply(`2R[${arrayFullIndex.join(',')}]`);
  createEdges();
  apply(`2R[${arrayFullIndex.join(',')}]`);

  return {
    solution,
    state: calcState,
  };
}
