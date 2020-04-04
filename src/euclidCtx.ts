import * as R from 'ramda';

import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,
  build,
  getArcDots,
  getDotCoords,
  degToRadian,
} from './utils';
import { euclidTransformations } from './transformations/euclid';

import {
  Proportions,
  INITIAL_X,
  INITIAL_Y,
} from './constants';

const draw = (
  smallRadius: number,
  centerX: number,
  centerY: number,
  rotation: number,
  rotationX: number,
  rotationY: number,
  ctx: CanvasRenderingContext2D,
) => {
  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;
  const R_BIG = R_SMALL * Proportions.R_BIG;

  ctx.beginPath();
  ctx.lineWidth = 2;

  const arcDots = getArcDots(
    centerX,
    centerY,
    R_BIG,
    0,
    360,
  );
  const euclidArcDots = euclidTransformations(
    arcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidArcDots);

  // centered
  const centeredArcDots = getArcDots(
    centerX,
    centerY,
    R_SMALL,
    0,
    360,
  );
  const euclidCenteredArcDots = euclidTransformations(
    centeredArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidCenteredArcDots);

  // top / bottom
  const topArcDots = getArcDots(
    centerX,
    centerY - 2 * R_SMALL,
    R_SMALL,
    135,
    405,
  );
  const euclidTopArcDots = euclidTransformations(
    topArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidTopArcDots);

  const bottomArcDots = getArcDots(
    centerX,
    centerY + 2 * R_SMALL,
    R_SMALL,
    -45,
    225,
  );
  const euclidBottomArcDots = euclidTransformations(
    bottomArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidBottomArcDots);

  // rigth / left
  const rightArcDots = getArcDots(
    centerX + 2 * R_SMALL,
    centerY,
    R_SMALL,
    -135,
    135,
  );
  const euclidRightArcDots = euclidTransformations(
    rightArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidRightArcDots);

  const leftArcDots = getArcDots(
    centerX - 2 * R_SMALL,
    centerY,
    R_SMALL,
    45,
    315,
  );
  const euclidLefttArcDots = euclidTransformations(
    leftArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidLefttArcDots);

  // square
  const squareDots = [
    {
      x: centerX + R_SMALL * 2,
      y: centerY,
    },
    {
      x: centerX,
      y: centerY + R_SMALL * 2,
    },
    {
      x: centerX - R_SMALL * 2,
      y: centerY,
    },
    {
      x: centerX,
      y: centerY - R_SMALL * 2,
    },
    {
      x: centerX + R_SMALL * 2,
      y: centerY,
    },
  ];
  const euclidSquareDots = euclidTransformations(
    squareDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidSquareDots);

  // medium
  const bigRightCircleCoords = getDotCoords(
    centerX,
    centerY,
    R_BIG,
    -45,
  );
  const bigLeftCircleCoords = getDotCoords(
    centerX,
    centerY,
    R_BIG,
    225,
  );
  const bigRightCircleDots = getArcDots(
    bigRightCircleCoords.x -
      R_MEDIUM * Math.cos(degToRadian(45)),
    bigRightCircleCoords.y +
      R_MEDIUM * Math.sin(degToRadian(45)),
    R_MEDIUM,
    225,
    405,
  );
  const bigLeftCircleDots = getArcDots(
    bigLeftCircleCoords.x +
      R_MEDIUM * Math.cos(degToRadian(45)),
    bigLeftCircleCoords.y +
      R_MEDIUM * Math.cos(degToRadian(45)),
    R_MEDIUM,
    135,
    315,
  );
  const euclidBigRightCircleDots = euclidTransformations(
    bigRightCircleDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  const euclidBigLeftCircleDots = euclidTransformations(
    bigLeftCircleDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidBigRightCircleDots);
  build(ctx, euclidBigLeftCircleDots);

  ctx.stroke();
  ctx.lineWidth = 1;
};

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

const drawPath = (
  centerX: number,
  centerY: number,
  rotation: number,
  rotationX: number,
  rotationY: number,
  ctx: CanvasRenderingContext2D,
) => {
  const arr = [
    [
      { x: 167.7, y: 205.5 },
      { x: 167.5, y: 175.7 },
      { x: 161.4, y: 146.6 },
    ],
    [
      { x: 179.3, y: 210.7 },
      { x: 211.9, y: 210.7 },
      { x: 244.6, y: 211.8 },
    ],
    [
      { x: 244.6, y: 211.8 },
      { x: 296.3, y: 213.7 },
      { x: 347.4, y: 204.9 },
    ],
    [
      { x: 347.4, y: 204.9 },
      { x: 354.4, y: 195.6 },
      { x: 362.4, y: 187 },
    ],
    [
      { x: 362.4, y: 187 },
      { x: 369.5, y: 170.7 },
      { x: 364.3, y: 153.6 },
    ],
    [
      { x: 362.4, y: 187 },
      { x: 363.6, y: 139 },
      { x: 354.9, y: 91.8 },
    ],

    [
      { x: 268.3, y: 39.3 },
      { x: 271.9, y: 98.2 }, // x - 10
      { x: 336.8, y: 91 }, // y 5 5
    ],

    [
      { x: 305, y: 83.7 },
      { x: 352.7, y: 102.5 },
      { x: 392.2, y: 72.2 }, // x + 20
    ],
    [
      { x: 305, y: 83.7 }, // x + 20
      { x: 362.6, y: 90.3 },
      { x: 390.5, y: 39.8 },
    ],
    /* [
      { x: 268.3, y: 39.3 },
      { x: 304.2, y: 98 },
      { x: 356.1, y: 60.6 },
    ],
    [
      { x: 356.1, y: 60.6 },
      { x: 366.4, y: 52.4 },
      { x: 370.5, y: 39.8 },
    ],
    [
      { x: 268.3, y: 39.3 },
      { x: 333.5, y: -50 },
      { x: 356.1, y: 60.6 },
    ], */

    [
      { x: 25.6, y: 106.8 },
      { x: 65.6, y: 107.6 },
      { x: 98.4, y: 84.9 },
    ],
    [
      { x: 98.4, y: 84.9 },
      { x: 128.2, y: 61.4 },
      { x: 160.8, y: 42.1 },
    ],
    [
      { x: 160.8, y: 42.1 },
      { x: 221.1, y: 29.3 },
      { x: 282.7, y: 28.9 },
    ],
    [
      { x: 4.2, y: 83.1 },
      { x: 1.6, y: 93.6 },
      { x: 8.9, y: 101.6 },
    ],
    [
      { x: 8.9, y: 101.6 },
      { x: 28.5, y: 111.7 },
      { x: 48.2, y: 101.6 },
    ],
    [
      { x: 48.2, y: 101.6 },
      { x: 75, y: 86.8 },
      { x: 98.4, y: 67 },
    ],
    [
      { x: 98.4, y: 67 },
      { x: 128.2, y: 48.1 },
      { x: 162.8, y: 41.5 },
    ],
    [
      { x: 25.6, y: 106.8 },
      { x: 17, y: 114.2 },
      { x: 14.1, y: 125.3 },
    ],
    [
      { x: 14.1, y: 125.3 },
      { x: 22.5, y: 131.9 },
      { x: 33.1, y: 131 },
    ],
    [
      { x: 33.1, y: 131 },
      { x: 44, y: 123.5 },
      { x: 45.1, y: 106.3 },
    ],
    [
      { x: 33.1, y: 131 },
      { x: 44, y: 123.5 },
      { x: 45.1, y: 106.3 },
    ],
    /* [ // koleso
      { x: 8.3, y: 74.6 },
      { x: 82.5, y: 36.8 },
      { x: 8.3, y: 74.6 },
    ], */
    [
      { x: 8.1, y: 68.9 },
      { x: 36.5, y: 110.9 },
      { x: 75.4, y: 79.9 },
    ],
    [
      { x: 74.5, y: 80.5 },
      { x: 92.5, y: 55.9 },
      { x: 82.5, y: 35.3 },
    ],
    [
      { x: 8.1, y: 68.9 },
      { x: -3, y: 38.3 },
      { x: 18.9, y: 18.9 },
    ],
    [
      { x: 18.9, y: 18.9 },
      { x: 58.5, y: -7.3 },
      { x: 83.5, y: 36.3 },
    ],
    [
      { x: 18.1, y: 49.1 },
      { x: 31.3, y: 28.5 },
      { x: 55.7, y: 30 },
    ],
    [
      { x: 55.7, y: 30 },
      { x: 59.5, y: 44.2 },
      { x: 58, y: 58.9 },
    ],
    [
      { x: 55.1, y: 113.7 },
      { x: 53.5, y: 128.6 },
      { x: 62, y: 140.8 },
    ],
    [
      { x: 62, y: 140.8 },
      { x: 108.8, y: 143.2 },
      { x: 155.6, y: 139.7 },
    ],
    [
      { x: 70.7, y: 113.7 },
      { x: 72.2, y: 120.4 },
      { x: 77, y: 125.3 },
    ],
    [
      { x: 77, y: 125.3 },
      { x: 106.4, y: 127.6 },
      { x: 135.4, y: 122.4 },
    ],
    [
      { x: 135.4, y: 122.4 },
      { x: 141.2, y: 98.4 },
      { x: 139.4, y: 73.9 },
    ],
    [
      { x: 177, y: 194.5 },
      { x: 176.4, y: 170.5 },
      { x: 178.7, y: 146.6 },
    ],
    [
      { x: 178.7, y: 146.6 },
      { x: 234.5, y: 139 },
      { x: 290.8, y: 137.4 },
    ],
    [
      { x: 290.8, y: 137.4 },
      { x: 296.9, y: 154.4 },
      { x: 300.6, y: 172 },
    ],
    [
      { x: 300.6, y: 172 },
      { x: 294.6, y: 188.7 },
      { x: 280.4, y: 199.1 },
    ],
    [
      { x: 280.4, y: 199.1 },
      { x: 230, y: 204.4 },
      { x: 179.3, y: 204.3 },
    ],
    [
      { x: 233.6, y: 204.2 },
      { x: 240.6, y: 172.1 },
      { x: 239.4, y: 139.3 },
    ],
    [
      { x: 253.8, y: 144.9 },
      { x: 246.9, y: 168.6 },
      { x: 252.1, y: 192.8 },
    ],
    [
      { x: 252.1, y: 192.8 },
      { x: 268.1, y: 190.9 },
      { x: 283.9, y: 187.6 },
    ],
    [
      { x: 210.5, y: 141.6 },
      { x: 193.9, y: 146.5 },
      { x: 184.5, y: 161.1 },
    ],
    [
      { x: 184.5, y: 161.1 },
      { x: 201.7, y: 156.9 },
      { x: 210.5, y: 141.6 },
    ],
    [
      { x: 248.9, y: 138 },
      { x: 252.7, y: 90.6 },
      { x: 246.9, y: 43.3 },
    ],
    [
      { x: 246.9, y: 43.3 },
      { x: 207.5, y: 43.6 },
      { x: 168.9, y: 51.4 },
    ],
    [
      { x: 230.7, y: 113.7 },
      { x: 240.8, y: 114.2 },
      { x: 245.2, y: 105.1 },
    ],
    [
      { x: 245.2, y: 105.1 },
      { x: 236.1, y: 106.3 },
      { x: 230.7, y: 113.7 },
    ],
    [
      { x: 268.3, y: 39.3 },
      { x: 285, y: 80.7 },
      { x: 325, y: 75.4 },
    ],
    [
      { x: 323, y: 76 },
      { x: 368, y: 70.7 },
      { x: 390.5, y: 39.8 },
    ],
    [
      { x: 268.3, y: 39.3 },
      { x: 275, y: 0 },
      { x: 320, y: 0 },
    ],
    [
      { x: 319, y: 0 },
      { x: 365, y: 10 },
      { x: 351, y: 70 },
    ],
  ].map(dots =>
    dots.map(dot => ({
      x: dot.x + INITIAL_X + centerX,
      y: 500 - dot.y - INITIAL_Y + centerY,
    })),
  );

  const curvedDots = arr.map(dots =>
    getCurveDots(dots[0], dots[1], dots[2]),
  );

  const rotationConfig = {
    x: rotationX,
    y: rotationY,
    angle: rotation,
  };
  const curvedEuclidDots = curvedDots.map(dots =>
    euclidTransformations(dots, rotationConfig, null),
  );

  ctx.beginPath();
  ctx.lineWidth = 2;

  curvedEuclidDots.map(build(ctx));

  ctx.stroke();
  ctx.lineWidth = 1;
};

const buildEuclid = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById('euclid')
  );

  const centerX = <HTMLInputElement>(
    document.getElementById('euclidCenterX')
  );
  const centerY = <HTMLInputElement>(
    document.getElementById('euclidCenterY')
  );
  const deltaX = <HTMLInputElement>(
    document.getElementById('deltaX')
  );
  const deltaY = <HTMLInputElement>(
    document.getElementById('deltaY')
  );

  const rotateInput = <HTMLInputElement>(
    document.getElementById('rotate')
  );
  const rotation = <HTMLInputElement>(
    document.getElementById('euclidRotation')
  );
  const rotationX = <HTMLInputElement>(
    document.getElementById('rotationX')
  );
  const rotationY = <HTMLInputElement>(
    document.getElementById('rotationY')
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

  drawPath(
    +centerX.value,
    +centerY.value,
    +rotation.value,
    +rotationX.value,
    +rotationY.value,
    ctx,
  );

  let rotationState = 0;

  rotateInput.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // eslint-disable-next-line
    const axesDots = [
      ...drawXAxis(canvasWidth, ctx),
      ...drawYAxis(canvasHeight, ctx),
    ];
    // eslint-disable-next-line
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

    drawPath(
      +centerX.value,
      +centerY.value,
      +rotation.value + rotationState,
      +rotationX.value,
      +rotationY.value,
      ctx,
    );

    rotationState += +rotation.value;
    rotation.value = '0';
  };

  window.onkeydown = (event: any) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown'
    ) {
      return;
    }

    const inputX = <HTMLInputElement>(
      document.getElementById('euclidCenterX')
    );
    const inputY = <HTMLInputElement>(
      document.getElementById('euclidCenterY')
    );

    let x = 0;
    let y = 0;

    if (event.key === 'ArrowRight') {
      x += 10;
    }
    if (event.key === 'ArrowLeft') {
      x -= 10;
    }
    if (event.key === 'ArrowDown') {
      y += 10;
    }
    if (event.key === 'ArrowUp') {
      y -= 10;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // eslint-disable-next-line
    const axesDots = [
      ...drawXAxis(canvasWidth, ctx),
      ...drawYAxis(canvasHeight, ctx),
    ];
    // eslint-disable-next-line
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

    drawPath(
      +inputX.value + x,
      +inputY.value + y,
      +rotation.value,
      +rotationX.value,
      +rotationY.value,
      ctx,
    );
    inputX.value = `${+centerX.value + x}`;
    inputY.value = `${+centerY.value + y}`;

    deltaX.value = +deltaX.value + +x;
    deltaY.value = +deltaY.value + +y;
  };
};

window.onload = () => {
  buildEuclid();
};
