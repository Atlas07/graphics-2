import {
  INITIAL_X,
  INITIAL_Y,
} from '../constants';

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
