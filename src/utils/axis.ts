import * as M from 'mathjs';
import * as R from 'ramda';

import {
  build
} from './build';
import {
  INITIAL_X,
  INITIAL_Y,
} from '../constants';
import { affineTransformation } from '../transformations/affine';

const getAxisDot = (xCoef: number, yCoef: number, delta: number) => {
  return {
    x: INITIAL_X + delta * xCoef,
    y: INITIAL_Y + delta * yCoef,
  };
};

export const drawXAxis = (width: number, ctx: CanvasRenderingContext2D) => {
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

export const drawYAxis = (height: number, ctx: CanvasRenderingContext2D) => {
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

export const drawDividerXLines = (width: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = width / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(i * dividerLength + INITIAL_X, INITIAL_Y);
    ctx.lineTo(i * dividerLength + INITIAL_X, width + INITIAL_Y);
  }

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawDividerYLines = (height: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = height / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(INITIAL_X, i * dividerLength + INITIAL_Y);
    ctx.lineTo(height + INITIAL_X, i * dividerLength + INITIAL_Y);
  }

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawDividerXAffineLines = (width: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = width / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  const dots1 = Array(4).fill(null).map((_, i) => getAxisDot(i, 0, dividerLength));
  const dots2 = Array(4).fill(null).map((_, i) => getAxisDot(i, 1, dividerLength));
  const dots3 = Array(4).fill(null).map((_, i) => getAxisDot(i, 2, dividerLength));
  const dots4 = Array(4).fill(null).map((_, i) => getAxisDot(i, 3, dividerLength));

  const affineAngleTransformation = affineTransformation(20);
  
  const affineDots1 = dots1.map(affineAngleTransformation);
  const affineDots2 = dots2.map(affineAngleTransformation);
  const affineDots3 = dots3.map(affineAngleTransformation);
  const affineDots4 = dots4.map(affineAngleTransformation);

  build(affineDots1, ctx);
  build(affineDots2, ctx);
  build(affineDots3, ctx);
  build(affineDots4, ctx);

  ctx.stroke();
  ctx.strokeStyle = 'black';
};

export const drawDividerYAffineLines = (width: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = width / 10;

  ctx.beginPath();
  ctx.strokeStyle = '#808080';

  const dots1 = Array(4).fill(null).map((_, i) => getAxisDot(0, i, dividerLength));
  const dots2 = Array(4).fill(null).map((_, i) => getAxisDot(1, i, dividerLength));
  const dots3 = Array(4).fill(null).map((_, i) => getAxisDot(2, i, dividerLength));
  const dots4 = Array(4).fill(null).map((_, i) => getAxisDot(3, i, dividerLength));

  const affineAngleTransformation = affineTransformation(20);
  
  const affineDots1 = dots1.map(affineAngleTransformation);
  const affineDots2 = dots2.map(affineAngleTransformation);
  const affineDots3 = dots3.map(affineAngleTransformation);
  const affineDots4 = dots4.map(affineAngleTransformation);

  build(affineDots1, ctx);
  build(affineDots2, ctx);
  build(affineDots3, ctx);
  build(affineDots4, ctx);

  ctx.stroke();
  ctx.strokeStyle = 'black';
};
