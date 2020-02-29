import {
  INITIAL_X,
  INITIAL_Y,
} from '../constants';

export const drawXAxis = (
  width: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();

  const dots = [
    [
      {
        x: INITIAL_X,
        y: INITIAL_Y,
      },
      {
        x: width + INITIAL_X,
        y: INITIAL_Y,
      },
      {
        x: width,
        y: INITIAL_Y - 5,
      },
    ],
    [
      {
        x: width + INITIAL_X,
        y: INITIAL_Y,
      },
      {
        x: width,
        y: INITIAL_Y + 5,
      },
    ],
  ];

  ctx.stroke();

  ctx.strokeText('0', INITIAL_X - 10, INITIAL_Y - 10);
  ctx.strokeText('X', width, INITIAL_Y - 10);

  return dots;
};

export const drawYAxis = (
  height: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();

  const dots = [
    [
      {
        x: INITIAL_X,
        y: INITIAL_Y,
      },
      {
        x: INITIAL_X,
        y: height + INITIAL_Y,
      },
      {
        x: INITIAL_X - 5,
        y: height,
      },
    ],
    [
      {
        x: INITIAL_X,
        y: height + INITIAL_Y,
      },
      {
        x: INITIAL_X + 5,
        y: height,
      },
    ],
  ];

  ctx.strokeText('Y', INITIAL_X - 20, height);
  ctx.stroke();

  return dots;
};

export const drawDividerXLines = (
  width: number,
) => {
  const dividerLength = width / 10;
  const dots = [];

  for (let i = 1; i <= 10; i += 1) {
    dots.push([
      {
        x: i * dividerLength + INITIAL_X,
        y: INITIAL_Y,
      },
      {
        x: i * dividerLength + INITIAL_X,
        y: width + INITIAL_Y,
      },
    ]);
  }

  return dots;
};

export const drawDividerYLines = (
  height: number,
) => {
  const dividerLength = height / 10;
  const dots = [];

  for (let i = 1; i <= 10; i += 1) {
    dots.push([
      {
        x: INITIAL_X,
        y: i * dividerLength + INITIAL_Y,
      },
      {
        x: height + INITIAL_X,
        y: i * dividerLength + INITIAL_Y,
      },
    ]);
  }

  return dots;
};
