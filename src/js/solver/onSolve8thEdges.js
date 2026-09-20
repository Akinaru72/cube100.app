export function onSolve8thEdgeSol(state) {
  function apply(move) {
    calcState.execute([move]);
    solution.push(move);
  }

  const calcState = state.clone();
  let solution = ['R'];
  let index;

  return {
    solution,
    state: calcState,
  };
}
