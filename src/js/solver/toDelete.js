// b = calcState.getRow('D', index).slice(1, -1);
// console.log('af', af);
// console.log('b', b);

// arrayB = [];
// b.map((el, idx) => {
//   console.log(calcState.size - idx - 1);
//   console.log(calcState.size - 2 - index - idx);
//   if (el === 'W') {
//     console.log(el);
//     console.log('af', af[calcState.size - index - idx - 2]);
//     if (
//       af[calcState.size - index - idx - 2] !== 'W' &&
//       calcState.size - index - idx - 2 !== calcState.size - index - 2
//     ) {
//       console.log('I am here');
//       arrayB.push(calcState.size - index - idx);
//     }
//   }
// });

// console.log(arrayB);
// arrayB.reverse();
// console.log(arrayB);

// if (arrayB.length > 0) {
//   apply('F');
//   apply(`R[${arrayB.join(',')}]`);
//   apply("F'");
//   apply(`R'[${arrayB.join(',')}]`);
// }

// if (b[0] === 'W') {
//   console.log('LEFT WWWW WWW');
//   apply('F');
//   apply(`R(${calcState.size - index})`);
//   apply('F');
//   apply(`R'(${calcState.size - index})`);
//   apply('2F');
// }

// // ------------------------C-------------------------

// c = calcState.getCol('F', calcState.size - index - 1).slice(1, -1);
// console.log('af', af);
// console.log('c', c);

// arrayC = [];
// c.map((el, idx) => {
//   console.log(calcState.size - idx - 1);
//   console.log(calcState.size - 2 - index - idx);
//   if (el === 'W') {
//     console.log(el);
//     console.log('af', af[calcState.size - index - idx - 2]);
//     if (af[calcState.size - index - idx - 2] !== 'W') {
//       console.log('I am here');
//       arrayC.push(calcState.size - index - idx);
//     }
//   }
// });
// console.log(arrayC);
// arrayC.reverse();
// console.log(arrayC);

// if (arrayC.length > 0) {
//   apply('F');
//   apply(`U'(${calcState.size - index})`);
//   apply("F'");
//   apply('R');
//   apply(`U[${arrayC.join(',')}]`);
// }

// ----------------------------Down--------------------------------------

// a = calcState.getCol('D', index).slice(1, -1);
// console.log('af', af);
// console.log('a', a);
// // b = calcState.getRow('F', index).slice(1, -1);
// arrayA = [];
// a.map((el, idx) => {
//   console.log(calcState.size - idx - 1);
//   console.log(calcState.size - 2 - index - idx);
//   if (el === 'W') {
//     console.log(el);
//     console.log('a', a[calcState.size - index - idx - 2]);
//     if (af[idx] !== 'W' && calcState.size - index - idx - 2 !== index - 1) {
//       console.log('I am here');
//       arrayA.push(idx + 2);
//     }
//   }
// });
// console.log(arrayA);
// arrayB.reverse();
// console.log(arrayB);

// if (arrayA.length > 0) {
//   apply('F');
//   apply('D');
//   apply(`R[${arrayA.join(',')}]`);
//   apply("F'");
//   apply(`R'[${arrayA.join(',')}]`);
//   apply("D'");
// }
//   // -----------------------------------B--------------------------------------
//   b = calcState.getRow('R', index).slice(1, -1);
//   console.log('af', af);
//   console.log('b', b);
//   // b = calcState.getRow('F', index).slice(1, -1);
//   arrayB = [];
//   b.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[calcState.size - index - idx - 2] !== 'W') {
//         console.log('I am here');
//         arrayB.push(calcState.size - index - idx);
//       }
//     }
//   });
//   console.log(arrayB);
//   arrayB.reverse();
//   console.log(arrayB);

//   if (arrayB.length > 0) {
//     apply("R'");
//     apply(`U[${arrayB.join(',')}]`);
//     apply('R');
//   }

//   // // ------------------------C-------------------------

//   c = calcState.getCol('R', calcState.size - index - 1).slice(1, -1);
//   console.log('af', af);
//   console.log('c', c);

//   arrayC = [];
//   c.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[calcState.size - index - idx - 2] !== 'W') {
//         console.log('I am here');
//         arrayC.push(calcState.size - index - idx);
//       }
//     }
//   });
//   console.log(arrayC);
//   arrayC.reverse();
//   console.log(arrayC);

//   if (arrayC.length > 0) {
//     apply('2R');
//     apply(`U[${arrayC.join(',')}]`);
//     apply('2R');
//   }

//   // // ------------------------D-------------------------
//   d = calcState.getRow('R', calcState.size - index - 1).slice(1, -1);
//   console.log('af', af);
//   console.log('d', d);
//   arrayD = [];
//   d.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[idx] !== 'W') {
//         console.log('I am here');
//         arrayD.push(idx + 2);
//       }
//     }
//   });
//   console.log(arrayD);

//   if (arrayD.length > 0) {
//     apply('R');
//     apply(`U[${arrayD.join(',')}]`);
//     apply("R'");
//   }
// }
// ----------------------Back-------------------------
// arrayA = [1];
// arrayB = [1];
// arrayC = [1];
// arrayD = [1];
// while (
//   arrayA.length > 0 ||
//   arrayB.length > 0 ||
//   arrayC.length > 0 ||
//   arrayD.length > 0
// ) {
//   const af = calcState.getCol('F', index).slice(1, -1);
//   a = calcState.getCol('B', index).slice(1, -1);
//   console.log('af', af);
//   console.log('a', a);
//   // b = calcState.getRow('F', index).slice(1, -1);
//   arrayA = [];
//   a.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[idx] !== 'W') {
//         console.log('I am here');
//         arrayA.push(idx + 2);
//       }
//     }
//   });
//   console.log(arrayA);
//   // arrayB.reverse();
//   // console.log(arrayB);

//   if (arrayA.length > 0) {
//     apply(`2U[${arrayA.join(',')}]`);
//   }
//   // -----------------------------------B--------------------------------------
//   b = calcState.getRow('B', index).slice(1, -1);
//   console.log('af', af);
//   console.log('b', b);
//   // b = calcState.getRow('F', index).slice(1, -1);
//   arrayB = [];
//   b.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[calcState.size - index - idx - 2] !== 'W') {
//         console.log('I am here');
//         arrayB.push(calcState.size - index - idx);
//       }
//     }
//   });
//   console.log(arrayB);
//   arrayB.reverse();
//   console.log(arrayB);

//   if (arrayB.length > 0) {
//     apply("B'");
//     apply(`2U[${arrayB.join(',')}]`);
//     apply('B');
//   }

//   //   // // ------------------------C-------------------------

//   c = calcState.getCol('B', calcState.size - index - 1).slice(1, -1);
//   console.log('af', af);
//   console.log('c', c);

//   arrayC = [];
//   c.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[calcState.size - index - idx - 2] !== 'W') {
//         console.log('I am here');
//         arrayC.push(calcState.size - index - idx);
//       }
//     }
//   });
//   console.log(arrayC);
//   arrayC.reverse();
//   console.log(arrayC);

//   if (arrayC.length > 0) {
//     apply('2B');
//     apply(`2U[${arrayC.join(',')}]`);
//     apply('2B');
//   }

//   // ------------------------D-------------------------
//   d = calcState.getRow('B', calcState.size - index - 1).slice(1, -1);
//   console.log('af', af);
//   console.log('d', d);
//   arrayD = [];
//   d.map((el, idx) => {
//     console.log(calcState.size - idx - 1);
//     console.log(calcState.size - 2 - index - idx);
//     if (el === 'W') {
//       console.log(el);
//       console.log('af', af[calcState.size - index - idx - 2]);
//       if (af[idx] !== 'W') {
//         console.log('I am here');
//         arrayD.push(idx + 2);
//       }
//     }
//   });
//   console.log(arrayD);

//   if (arrayD.length > 0) {
//     apply('B');
//     apply(`2U[${arrayD.join(',')}]`);
//     apply("B'");
//   }
// }

// ------------------------------Left---------------------------------

// const i = 1;
// for (let i = 1; i < calcState.size - 1; i++) {
//   console.log(calcState.getCell('F', i, 1));
//   // if (calcState.getCell('F', i, 1) !== 'W') {
//   //   if (calcState.getCell('R', i, 1) === 'W') {
//   //     apply('U(1)');
//   //   }
//   // }
// }
// while (calcState.getCell('F', 1, 2).includes('W')) {
//   while (calcState.getCell('D', 1, 2).includes('W')) {
//     apply("D'");
//   }
//   apply("R'");
//   apply("D'");
// }
