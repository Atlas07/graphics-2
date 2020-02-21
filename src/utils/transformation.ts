import * as M from "mathjs";

import { degToRadian } from "../utils";

interface Dot {
  x: number;
  y: number;
}

interface Transformation {
  matrix?: M.Matrix;
  x: number;
  y: number;
}

export const translate = (startDot: Dot, endDot: Dot): Transformation => {
  const m1 = M.matrix([startDot.x, startDot.y, 1]);
  const m2 = M.matrix([
    [1, 0, endDot.x],
    [0, 1, endDot.y],
    [0, 0, 1],
  ]);
  const matrix = M.multiply(m2, m1);

  return {
    matrix,
    x: matrix.get([0]),
    y: matrix.get([1]),
  };
};

export const rotate = (startDot: Dot, m: number, n: number, angle: number) => {
  const randianAngle = degToRadian(angle);

  return {
    x:
      startDot.x * Math.cos(randianAngle) +
      startDot.y * -Math.sin(randianAngle) -
      m * (Math.cos(randianAngle) - 1) +
      n * Math.sin(randianAngle),
    y:
      startDot.x * Math.sin(randianAngle) +
      startDot.y * Math.cos(randianAngle) -
      n * (Math.cos(randianAngle) - 1) -
      m * Math.sin(randianAngle),
  };
};
