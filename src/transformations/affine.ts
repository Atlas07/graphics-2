import * as M from 'mathjs';
import * as R from 'ramda';

import { degToRadian } from '../utils/degToRadian';

// eslint-disable-next-line
export const affineTransformation = R.curry(
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
