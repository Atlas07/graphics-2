import {
  INITIAL_X,
  INITIAL_Y,
  WIDTH,
  HEIGHT,
} from '../constants';

export const drawXAxis = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(WIDTH, INITIAL_Y);

  // * arrows
  ctx.lineTo(WIDTH - 20, INITIAL_Y - 5);
  ctx.moveTo(WIDTH, INITIAL_Y);
  ctx.lineTo(WIDTH - 20, INITIAL_Y + 5);

  ctx.stroke();
};

export const drawDividerXLines = (ctx: CanvasRenderingContext2D) => {
  const dividerLength = WIDTH / 10;

  ctx.beginPath();

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(i * dividerLength, INITIAL_Y);
    ctx.lineTo(i * dividerLength, WIDTH);
  }

  ctx.stroke();
};

export const drawDividerYLines = (ctx: CanvasRenderingContext2D) => {
  const dividerLength = HEIGHT / 10;

  ctx.beginPath();

  for (let i = 1; i <= 10; i += 1) {
    ctx.moveTo(INITIAL_X, i * dividerLength);
    ctx.lineTo(HEIGHT, i * dividerLength);
  }

  ctx.stroke();
};

export const drawYAxis = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();

  ctx.moveTo(INITIAL_X, INITIAL_Y);
  ctx.lineTo(INITIAL_X, HEIGHT);

  // * arrows
  ctx.lineTo(INITIAL_X - 5, HEIGHT - 20);
  ctx.moveTo(INITIAL_X, HEIGHT);
  ctx.lineTo(INITIAL_X + 5, HEIGHT - 20);

  ctx.stroke();
};
