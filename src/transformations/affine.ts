import * as M from 'mathjs';
import * as R from 'ramda';

import { degToRadian } from '../utils/degToRadian';

// eslint-disable-next-line
export const test = R.curry(
  (angle: number, dot: { x: number; y: number }) => {
    const angleRadian = degToRadian(angle);

    const affineMatrix = M.matrix([
      [1, Math.tan(angleRadian), 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    const dotMatrix = M.matrix([dot.x, dot.y, 1]);
    const matrix = M.multiply(affineMatrix, dotMatrix);

    return {
      x: matrix.get([0]),
      y: matrix.get([1]),
    };
  },
);

interface Basis {
  e1: number[];
  e2: number[];
}

interface Dot {
  x: number;
  y: number;
}

export const affineTransformation = R.curry((basis: Basis, dot: Dot): Dot => {
  const [e11, e12, e13] = basis.e1;
  const [e21, e22, e23] = basis.e2;

  const affineMatrix = M.matrix([
    [e11, e12, e13],
    [e21, e22, e23],
    [0, 0, 1],
  ]);
  const dotMatrix = M.matrix([dot.x, dot.y, 1]);
  const matrix = M.multiply(affineMatrix, dotMatrix);

  return {
    x: matrix.get([0]),
    y: matrix.get([1]),
  };
});

// export const test = R.curry((basis: Basis, dot: Dot): Dot => {
//   const [e11, e12] = basis.e1;
//   const [e21, e22] = basis.e2;
//   const [e31, e32] = basis.e3;

//   const affineMatrix = M.matrix([
//     [e11, e21, e31],
//     [e12, e22, e32],
//     [0, 0, 1],
//   ]);
//   const dotMatrix = M.matrix([dot.x, dot.y, 1]);
//   const matrix = M.multiply(affineMatrix, dotMatrix);

//   return {
//     x: matrix.get([0]),
//     y: matrix.get([1]),
//   };
// });
