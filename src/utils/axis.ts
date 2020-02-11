import {
  INITIAL_X,
  INITIAL_Y,
} from '../constants';

export const drawXAxis = (width: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(width, INITIAL_Y);

  // * arrows
  ctx.lineTo(width - 20, INITIAL_Y - 5);
  ctx.moveTo(width, INITIAL_Y);
  ctx.lineTo(width - 20, INITIAL_Y + 5);

  ctx.strokeText('0', INITIAL_X - 10, INITIAL_Y - 10);
  ctx.strokeText('X', width, INITIAL_Y - 10);
  ctx.stroke();
};

export const drawDividerXLines = (width: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = width / 10;

  ctx.beginPath();

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(i * dividerLength, INITIAL_Y);
    ctx.lineTo(i * dividerLength, width);
  }

  ctx.stroke();
};

export const drawDividerYLines = (height: number, ctx: CanvasRenderingContext2D) => {
  const dividerLength = height / 10;

  ctx.beginPath();

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(INITIAL_X, i * dividerLength);
    ctx.lineTo(height, i * dividerLength);
  }

  ctx.stroke();
};

export const drawYAxis = (height: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(INITIAL_X, height);

  // * arrows
  ctx.lineTo(INITIAL_X - 5, height - 20);
  ctx.moveTo(INITIAL_X, height);
  ctx.lineTo(INITIAL_X + 5, height - 20);

  ctx.strokeText('Y', INITIAL_X - 20, height);
  ctx.stroke();
};
