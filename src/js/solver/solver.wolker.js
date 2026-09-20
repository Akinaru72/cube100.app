// solver.woler.js

import { CubeState } from '../CubeState.js';
import { onSolve1thSideSol } from './onSolve1thSide.js';
import { onSolve2thSideSol } from './onSolve2thSide.js';
import { onSolve3thSideSol } from './onSolve3thSide.js';
import { onSolve4thSideSol } from './onSolve4thSide.js';
import { onSolve5thSideSol } from './onSolve5thSide.js';
import { onSolve6thEdgeSol } from './onSolve6thEdges.js';
import { onSolve7thEdgeSol } from './onSolve7thEdges.js';

function restoreCubeState(data) {
  const state = new CubeState(data.size);

  state.U = data.U;
  state.D = data.D;
  state.F = data.F;
  state.B = data.B;
  state.L = data.L;
  state.R = data.R;

  return state;
}

self.onmessage = async e => {
  const data = e.data;
  console.log(data);
  if (data.type === 'solve1') {
    const cube = restoreCubeState(data.state);
    const result = onSolve1thSideSol(cube);

    self.postMessage({
      solution: result.solution,
      state: result.state,
    });
  }

  if (data.type === 'solve2') {
    let solution1 = data.solution1;
    let state1;

    if (solution1) {
      state1 = restoreCubeState(data.finalState1);
    } else {
      const state = restoreCubeState(data.state);
      const result1 = onSolve1thSideSol(state);
      solution1 = result1.solution;
      state1 = result1.state;
    }

    const result2 = onSolve2thSideSol(state1);

    self.postMessage({
      type: 'solve2Finished',
      solution1,
      state1,
      solution2: result2.solution,
      state2: result2.state,
    });
  }

  // if (data.type === 'solve2') {
  //   let state = new CubeState(data.state.size);

  //   state.U = data.state.U;
  //   state.D = data.state.D;
  //   state.F = data.state.F;
  //   state.B = data.state.B;
  //   state.L = data.state.L;
  //   state.R = data.state.R;

  //   let solution1 = data.solution1;
  //   let state1 = data.finalState1;

  //   if (!solution1) {
  //     const result1 = onSolve1thSideSol(state);

  //     solution1 = result1.solution;
  //     state1 = result1.state;
  //   }

  //   const result2 = onSolve2thSideSol(state1);

  //   self.postMessage({
  //     type: 'solve2Finished',
  //     solution1,
  //     state1,
  //     solution2: result2.solution,
  //     state2: result2.state,
  //   });
  // }
};
