import * as R from 'ramda';

import { INITIAL_X, INITIAL_Y } from './constants';

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

  const arr = [
    [
      { x: 24, y: 116 },
      { x: 83.7, y: 121 },
      { x: 143.2, y: 127.8 },
    ],
    [
      { x: 143.2, y: 127.8 },
      { x: 152.3, y: 140.9 },
      { x: 167.9, y: 144.1 },
    ],
  ];

  const curvedDots = arr
    .map(dots => dots.map(dot => ({
      x: dot.x + INITIAL_X,
      y: canvasHeight - dot.y - INITIAL_Y,
    })))
    .map(dots => getCurveDots(dots[0], dots[1], dots[2]));

  ctx.beginPath();
  curvedDots.map(build(ctx));
  ctx.stroke();

  // const doorDots = [
  //   {
  //     x: 220,
  //     y: 370,
  //   },
  //   {
  //     x: 270,
  //     y: 370,
  //   },
  //   {
  //     x: 270,
  //     y: 270,
  //   },
  //   {
  //     x: 220,
  //     y: 270,
  //   },
  //   {
  //     x: 220,
  //     y: 220,
  //   },
  // ];
  // const wheelDots1 = [
  //   [
  //     {
  //       x: 470,
  //       y: 320,
  //     },
  //     {
  //       x: 520,
  //       y: 320,
  //     },
  //     {
  //       x: 520,
  //       y: 370,
  //     },
  //   ],
  //   [
  //     {
  //       x: 520,
  //       y: 370,
  //     },
  //     {
  //       x: 520,
  //       y: 420,
  //     },
  //     {
  //       x: 470,
  //       y: 420,
  //     },
  //   ],
  //   [
  //     {
  //       x: 470,
  //       y: 420,
  //     },
  //     {
  //       x: 420,
  //       y: 420,
  //     },
  //     {
  //       x: 420,
  //       y: 370,
  //     },
  //   ],
  //   [
  //     {
  //       x: 420,
  //       y: 370,
  //     },
  //     {
  //       x: 420,
  //       y: 320,
  //     },
  //     {
  //       x: 470,
  //       y: 320,
  //     },
  //   ],
  // ];
  // const wheelDots2 = [
  //   [
  //     {
  //       x: 70,
  //       y: 320,
  //     },
  //     {
  //       x: 120,
  //       y: 320,
  //     },
  //     {
  //       x: 120,
  //       y: 370,
  //     },
  //   ],
  //   [
  //     {
  //       x: 120,
  //       y: 370,
  //     },
  //     {
  //       x: 120,
  //       y: 420,
  //     },
  //     {
  //       x: 70,
  //       y: 420,
  //     },
  //   ],
  //   [
  //     {
  //       x: 70,
  //       y: 420,
  //     },
  //     {
  //       x: 20,
  //       y: 420,
  //     },
  //     {
  //       x: 20,
  //       y: 370,
  //     },
  //   ],
  //   [
  //     {
  //       x: 20,
  //       y: 370,
  //     },
  //     {
  //       x: 20,
  //       y: 320,
  //     },
  //     {
  //       x: 70,
  //       y: 320,
  //     },
  //   ],
  // ];

  // const dots = [
  //   {
  //     x: 420,
  //     y: 370,
  //   },
  //   {
  //     x: 250,
  //     y: 360,
  //   },
  //   {
  //     x: 70,
  //     y: 300,
  //   },
  // ];

  // const curveWheelDots1 = wheelDots1.map(dots => getCurveDots(dots[0], dots[1], dots[2]));
  // const curveWheelDots2 = wheelDots2.map(dots => getCurveDots(dots[0], dots[1], dots[2]));

  // const testDots = getCurveDots(dots[0], dots[1], dots[2]);

  // ctx.beginPath();
  // curveWheelDots1.map(build(ctx));
  // curveWheelDots2.map(build(ctx));

  // build(ctx, dots);
  // build(ctx, testDots);
  // ctx.stroke();
};

window.onload = () => {
  buildPath();
};
