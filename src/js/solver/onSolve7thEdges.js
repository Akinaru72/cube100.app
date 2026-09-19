export function onSolve7thEdgeSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }
  const calcState = state.clone();
  let solution = [];
  let index;
  apply('B');
  apply('U');
  apply('2B');
  apply('U');

  return {
    solution,
    state: calcState,
  };
}
