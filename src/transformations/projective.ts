import * as R from 'ramda';
import * as M from 'mathjs';

interface Basis {
  e1: number[];
  e2: number[];
  e3: number[];
}

interface Dot {
  x: number;
  y: number;
}

// eslint-disable-next-line
export const test = R.curry((basis: Basis, dot: Dot) => {
  const [e11, e12, e13] = basis.e1;
  const [e21, e22, e23] = basis.e2;
  const [e31, e32, e33] = basis.e3;

  const affineMatrix = M.matrix([
    [e11 * e31 / 50, e12 * e31 / 50, e31 / 50],
    [e21 * e32 / 50, e22 * e32 / 50, e32 / 50],
    [e13 * e33 / 50, e23 * e33 / 50, e33 / 50],
  ]);
  const dotMatrix = M.matrix([dot.x, dot.y, 1]);
  const matrix = M.multiply(affineMatrix, dotMatrix);

  return {
    x: matrix.get([0]),
    y: matrix.get([1]),
  };
});

export const projectiveTransformation = R.curry((basis: Basis, dot: Dot) => {
  const [e11, e12, e13] = basis.e1;
  const [e21, e22, e23] = basis.e2;
  const [e31, e32, e33] = basis.e3;

  const point0 = {
    x: e13,
    y: e23,
  };
  const w0 = e33;

  const wx = e31;
  const wy = e32;

  const x = (point0.x * w0 + e11 * wx * dot.x + e12 * wy * dot.y) / (w0 + wx * dot.x + wy * dot.y);
  const y = (point0.y * w0 + e21 * wy * dot.x + e22 * wx * dot.y) / (w0 + wx * dot.x + wy * dot.y);

  return {
    x,
    y,
  };
});
