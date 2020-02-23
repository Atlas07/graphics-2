import * as R from 'ramda';

import {
  INITIAL_X,
  INITIAL_Y,
  AXIS_LENGTH_DELTA,
  AFFINE_COUNT,
} from '../constants';
import { build } from './build';
import { affineTransformation } from '../transformations/affine';


const getAxisDot = (
  xCoef: number,
  yCoef: number,
  delta: number,
) => {
  return {
    x: INITIAL_X + delta * xCoef,
    y: INITIAL_Y + delta * yCoef,
  };
};

export const drawXAxis = (
  width: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(width + INITIAL_X, INITIAL_Y);

  // * arrows
  ctx.lineTo(width, INITIAL_Y - 5);
  ctx.moveTo(width + INITIAL_X, INITIAL_Y);
  ctx.lineTo(width, INITIAL_Y + 5);

  ctx.stroke();

  ctx.strokeText('0', INITIAL_X - 10, INITIAL_Y - 10);
  ctx.strokeText('X', width, INITIAL_Y - 10);
};

export const drawYAxis = (
  height: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(INITIAL_X, height + INITIAL_Y);

  // * arrows
  ctx.lineTo(INITIAL_X - 5, height);
  ctx.moveTo(INITIAL_X, height + INITIAL_Y);
  ctx.lineTo(INITIAL_X + 5, height);

  ctx.strokeText('Y', INITIAL_X - 20, height);
  ctx.stroke();
};

export const drawDividerXLines = (
  width: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = width / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(i * dividerLength + INITIAL_X, INITIAL_Y);
    ctx.lineTo(
      i * dividerLength + INITIAL_X,
      width + INITIAL_Y,
    );
  }

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawDividerYLines = (
  height: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = height / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(INITIAL_X, i * dividerLength + INITIAL_Y);
    ctx.lineTo(
      height + INITIAL_X,
      i * dividerLength + INITIAL_Y,
    );
  }

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawAffineXAxis = (
  width: number,
  angle: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = width / AXIS_LENGTH_DELTA;
  const dots = R.times(time => {
    return Array(AFFINE_COUNT)
      .fill(null)
      .map((_, i) => getAxisDot(i, time, dividerLength));
  }, AFFINE_COUNT);

  const [firstLine] = dots;
  const affineDots = firstLine.map(affineTransformation(angle));

  const firstDot = affineDots[0];
  const lastDot = affineDots[affineDots.length - 1];

  ctx.beginPath();

  ctx.moveTo(firstDot.x, firstDot.y);
  ctx.lineTo(lastDot.x, lastDot.y);

  // * arrows
  ctx.lineTo(lastDot.x - 20, lastDot.y - 5);
  ctx.moveTo(lastDot.x, lastDot.y);
  ctx.lineTo(lastDot.x - 20, lastDot.y + 5);

  ctx.stroke();

  ctx.strokeText('0', firstDot.x - 10, firstDot.y - 10);
  ctx.strokeText('X', lastDot.x, firstDot.y - 10);
};

export const drawAffineYAxis = (
  width: number,
  angle: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = width / AXIS_LENGTH_DELTA;
  const dots = R.times(time => {
    return Array(AFFINE_COUNT)
      .fill(null)
      .map((_, i) => getAxisDot(time, i, dividerLength));
  }, AFFINE_COUNT);

  const [firstLine] = dots;
  const affineDots = firstLine.map(affineTransformation(angle));

  const firstDot = affineDots[0];
  const lastDot = affineDots[affineDots.length - 1];

  ctx.beginPath();

  ctx.moveTo(firstDot.x, firstDot.y);
  ctx.lineTo(lastDot.x, lastDot.y);

  // * arrows
  ctx.lineTo(lastDot.x - 15, lastDot.y - 20);
  ctx.moveTo(lastDot.x, lastDot.y);
  ctx.lineTo(lastDot.x, lastDot.y - 25);

  ctx.stroke();

  ctx.strokeText('Y', lastDot.x - 20, lastDot.y);
};

export const drawDividerXAffineLines = (
  width: number,
  angle: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = width / AXIS_LENGTH_DELTA;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  const dots = R.times(time => {
    return Array(AFFINE_COUNT)
      .fill(null)
      .map((_, i) => getAxisDot(i, time, dividerLength));
  }, AFFINE_COUNT);

  const affineDots = dots.map(lineDots =>
    lineDots.map(affineTransformation(angle)),
  );
  affineDots.forEach(build(ctx));

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawDividerYAffineLines = (
  width: number,
  angle: number,
  ctx: CanvasRenderingContext2D,
) => {
  const dividerLength = width / AXIS_LENGTH_DELTA;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  const dots = R.times(time => {
    return Array(AFFINE_COUNT)
      .fill(null)
      .map((_, i) => getAxisDot(time, i, dividerLength));
  }, AFFINE_COUNT);

  const affineDots = dots.map(lineDots =>
    lineDots.map(affineTransformation(angle)),
  );
  affineDots.forEach(build(ctx));

  ctx.stroke();
  ctx.strokeStyle = 'black';
};
