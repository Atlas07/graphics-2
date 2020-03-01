import * as R from 'ramda';
import * as M from 'mathjs';
// eslint-disable-next-line
interface Basis {
  e1: number[];
  e2: number[];
}

interface Dot {
  x: number;
  y: number;
}

// eslint-disable-next-line
export const projectiveTransformation = R.curry((basis: Basis, dot: Dot) => {
  const [e11, e12, e13, w1] = basis.e1;
  const [e21, e22, e23, w2] = basis.e2;
  const affineMatrix = M.matrix([
    [e11, e12, e13],
    [e21, e22, e23],
    [w1, w2, 1],
  ]);
  const dotMatrix = M.matrix([dot.x, dot.y, 1]);
  const matrix = M.multiply(affineMatrix, dotMatrix);

  return {
    x: matrix.get([0]) / matrix.get([2]),
    y: matrix.get([1]) / matrix.get([2]),
  };
});
