import * as R from 'ramda';

import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,
  build,
} from './utils';

interface Dot {
  x: number;
  y: number;
}

const getCurveDot = (
  u: number,
  a: number,
  b: number,
  c: number,
) => a * (1 - u) ** 2 + 2 * b * (1 - u) * u + c * u ** 2;

const getCurveDots = (aDot: Dot, bDot: Dot, cDot: Dot) => {
  const dots = [];
  for (let u = 0; u <= 1; u += 0.01) {
    dots.push({
      x: getCurveDot(u, aDot.x, bDot.x, cDot.x),
      y: getCurveDot(u, aDot.y, bDot.y, cDot.y),
    });
  }

  return dots;
};

const buildPath = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById('path')
  );

  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const info = document.getElementById('info-division');
  info.innerHTML = `Division: ${canvasWidth / 10}`;

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d',
  );

  const buildGrid = R.pipe(R.map(build(ctx)));

  //* initial draw
  const axesDots = [
    ...drawXAxis(canvasWidth, ctx),
    ...drawYAxis(canvasHeight, ctx),
  ];
  const dividerDots = [
    ...drawDividerXLines(canvasWidth),
    ...drawDividerYLines(canvasHeight),
  ];

  ctx.beginPath();
  buildGrid(axesDots);
  ctx.strokeStyle = '#808080';
  buildGrid(dividerDots);
  ctx.stroke();
  ctx.strokeStyle = 'black';

  const doorDots = [
    {
      x: 220,
      y: 370,
    },
    {
      x: 270,
      y: 370,
    },
    {
      x: 270,
      y: 270,
    },
    {
      x: 220,
      y: 270,
    },
    {
      x: 220,
      y: 220,
    },
  ];
  const wheelDots = [
    [
      {
        x: 270,
        y: 320,
      },
      {
        x: 320,
        y: 320,
      },
      {
        x: 320,
        y: 370,
      },
    ],
    [
      {
        x: 320,
        y: 370,
      },
      {
        x: 320,
        y: 420,
      },
      {
        x: 270,
        y: 420,
      },
    ],
    [
      {
        x: 270,
        y: 420,
      },
      {
        x: 220,
        y: 420,
      },
      {
        x: 220,
        y: 370,
      },
    ],
    [
      {
        x: 220,
        y: 370,
      },
      {
        x: 220,
        y: 320,
      },
      {
        x: 270,
        y: 320,
      },
    ],
  ];

  const curveWheelDots = wheelDots.map(dots => getCurveDots(dots[0], dots[1], dots[2]));

  ctx.beginPath();
  wheelDots.map(build(ctx));
  curveWheelDots.map(build(ctx));
  ctx.stroke();
};

window.onload = () => {
  buildPath();
};
