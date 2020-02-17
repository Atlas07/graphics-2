import * as M from "mathjs";

import {
  degToRadian,
} from '../utils';

interface Dot {
  x: number;
  y: number;
};

interface Transformation {
  matrix?: M.Matrix;
  x: number;
  y: number;
};

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

export const rotateX = (startDot: Dot, angle: number): Transformation => {
  const randianAngle = degToRadian(angle);
  const m1 = M.matrix([startDot.x, startDot.y, 1]);
  const m2 = M.matrix([
    [Math.cos(randianAngle), Math.sin(randianAngle), 0],
    [-Math.sin(randianAngle), Math.cos(randianAngle), 0],
    [0, 0, 1],
  ]);
  const matrix = M.multiply(m1, m2);

  return {
    matrix,
    x: matrix.get([0]),
    y: matrix.get([1]),
  };
};

export const rotateY = (startDot: Dot, angle: number): Transformation => {
  const randianAngle = degToRadian(angle);
  const m1 = M.matrix([startDot.x, startDot.y, 1]);
  const m2 = M.matrix([
    [Math.cos(randianAngle), -Math.sin(randianAngle), 0],
    [Math.sin(randianAngle), Math.cos(randianAngle), 0],
    [0, 0, 1],
  ]);
  const matrix = M.multiply(m1, m2);

  return {
    matrix,
    x: matrix.get([0]),
    y: matrix.get([1]),
  };
};
