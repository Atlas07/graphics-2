import * as R from 'ramda';

import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,
  build,
} from './utils';
import { euclidTransformations } from './transformations/euclid';

import {
  INITIAL_X,
  INITIAL_Y,
} from './constants';

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

const animate = (intitial: Dot, end: Dot) => {
  const dots = [];

  // eslint-disable-next-line
  for (let t = 0; t <= 1; t += 0.01) {
    dots.push({
      x: intitial.x * (1 - t) + end.x * t,
      y: intitial.y * (1 - t) + end.y * t,
    });
  }

  return dots;
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
  const animateInput = <HTMLInputElement>(
    document.getElementById('animate')
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

  const arrA = [
    [
      { x: 24, y: 116 },
      { x: 83.7, y: 121 },
      { x: 143.2, y: 127.8 },
    ],
    [
      { x: 142.2, y: 127.8 },
      { x: 152.3, y: 140.9 },
      { x: 167.9, y: 144.1 },
    ],
    [
      { x: 167.9, y: 144.1 },
      { x: 178.9, y: 136 },
      { x: 175.7, y: 125 },
    ],
    [
      { x: 175.7, y: 125 },
      { x: 187.4, y: 125.1 },
      { x: 196.1, y: 123.9 },
    ],
    [
      { x: 196.1, y: 123.9 },
      { x: 241, y: 177.4 },
      { x: 295, y: 222.4 },
    ],
    [
      { x: 294, y: 221.4 },
      { x: 315.6, y: 227.9 },
      { x: 336.7, y: 223.9 },
    ],
    [
      { x: 336.7, y: 223.9 },
      { x: 348.3, y: 217 },
      { x: 359.8, y: 210 },
    ],
    [
      { x: 359.8, y: 210 },
      { x: 367.5, y: 204.3 },
      { x: 366.5, y: 194.7 },
    ],
    [
      { x: 366.5, y: 194.7 },
      { x: 338.7, y: 143.4 },
      { x: 300.7, y: 99.2 },
    ],
    [
      { x: 300.7, y: 100.2 },
      { x: 316.6, y: 90.3 },
      { x: 329.9, y: 77.8 },
    ],
    [
      { x: 329.9, y: 77.8 },
      { x: 337.1, y: 82.9 },
      { x: 345.7, y: 84.9 },
    ],
    [
      { x: 345.7, y: 84.9 },
      { x: 358.3, y: 78.4 },
      { x: 352.4, y: 56.5 },
    ],
    [
      { x: 352.4, y: 56.5 },
      { x: 369.1, y: 49 },
      { x: 381.6, y: 35.7 },
    ],
    [
      { x: 381.6, y: 35.7 },
      { x: 384.9, y: 21.5 },
      { x: 371.5, y: 16 },
    ],
    [
      { x: 371.5, y: 16 },
      { x: 315.3, y: 32.8 },
      { x: 257.5, y: 47 },
    ],
    [
      { x: 258.5, y: 47.5 },
      { x: 245.6, y: 34 },
      { x: 229.2, y: 25 },
    ],
    [
      { x: 229.2, y: 25 },
      { x: 216.6, y: 26.5 },
      { x: 205.6, y: 32.9 },
    ],
    [
      { x: 205.6, y: 32.9 },
      { x: 192.1, y: 19.3 },
      { x: 176.9, y: 7.6 },
    ],
    [
      { x: 176.9, y: 7.6 },
      { x: 149.4, y: 8 },
      { x: 122, y: 13.7 },
    ],
    [
      { x: 122.4, y: 13.7 },
      { x: 109.6, y: 23.8 },
      { x: 95.4, y: 31.7 },
    ],
    [
      { x: 95.4, y: 31.7 },
      { x: 84.4, y: 35.2 },
      { x: 74, y: 40.2 },
    ],
    [
      { x: 74, y: 40.2 },
      { x: 91, y: 49.5 },
      { x: 110, y: 52.5 },
    ],
    [
      { x: 110, y: 52.5 },
      { x: 105.7, y: 70.1 },
      { x: 94.8, y: 84.6 },
    ],
    [
      { x: 94.8, y: 84.6 },
      { x: 54.1, y: 87.9 },
      { x: 12.8, y: 87.4 },
    ],
    [
      { x: 13.3, y: 87.4 },
      { x: 3.7, y: 90.2 },
      { x: 6.5, y: 99.7 },
    ],
    [
      { x: 6.5, y: 99.7 },
      { x: 13.4, y: 109.9 },
      { x: 24.8, y: 116.5 },
    ],
    [
      { x: 134.2, y: 75.6 },
      { x: 144.2, y: 75.4 },
      { x: 152.2, y: 69.4 },
    ],
    [
      { x: 152.2, y: 69.4 },
      { x: 147.8, y: 60.7 },
      { x: 141, y: 53.6 },
    ],
    // [
    //   { x: 141, y: 53.6 },
    //   { x: 136.7, y: 64.3 },
    //   { x: 134.2, y: 75.6 },
    // ],
  ].map(dots =>
    dots.map(dot => ({
      x: dot.x + INITIAL_X,
      y: 500 - dot.y - INITIAL_Y,
    })),
  );

  const arrB = [
    [
      { x: 5.4, y: 160.1 },
      { x: 31, y: 178.2 },
      { x: 43.4, y: 220.8 },
    ],
    [
      { x: 43.4, y: 219.8 },
      { x: 70.5, y: 330.1 },
      { x: 178.6, y: 350 },
    ],
    [
      { x: 192.3, y: 353.4 },
      { x: 206.2, y: 365.5 },
      { x: 219.7, y: 378.2 },
    ],
    [
      { x: 219.7, y: 378.2 },
      { x: 240.9, y: 395.4 },
      { x: 267.7, y: 400.5 },
    ],
    [
      { x: 259.1, y: 383.3 },
      { x: 257.6, y: 332.3 },
      { x: 283.9, y: 288.4 },
    ],
    // [
    //   { x: 208.6, y: 348.7 },
    //   { x: 238.8, y: 345.9 },
    //   { x: 256.3, y: 320.1 },
    // ],
    [
      { x: 282.9, y: 289.4 },
      { x: 350, y: 215 },
      { x: 359.3, y: 119.9 },
    ],
    [
      { x: 283.9, y: 288.4 },
      { x: 333.7, y: 217.5 },
      { x: 346.6, y: 131.8 },
    ],
    [
      { x: 346.6, y: 133.8 },
      { x: 351.1, y: 103.2 },
      { x: 372.3, y: 84.3 },
    ],
    [
      { x: 372.3, y: 84.3 },
      { x: 410.1, y: 66.7 },
      { x: 405.5, y: 36.1 },
    ],
    [
      { x: 359.3, y: 121.9 },
      { x: 361.7, y: 108.1 },
      { x: 372.1, y: 98.9 },
    ],
    [
      { x: 372.1, y: 98.9 },
      { x: 420.1, y: 73.7 },
      { x: 405.5, y: 36.1 },
    ],
    [
      { x: 48.5, y: 187.4 },
      { x: 35.9, y: 164.6 },
      { x: 14.3, y: 149.8 },
    ],
    [
      { x: 14.3, y: 149.8 },
      { x: 38.2, y: 140.7 },
      { x: 58.8, y: 165.4 },
    ],
    [
      { x: 58.3, y: 164.4 },
      { x: 87, y: 188.3 },
      { x: 124.7, y: 204.6 },
    ],
    [
      { x: 147.8, y: 217.4 },
      { x: 179.5, y: 240.9 },
      { x: 209.5, y: 214 },
    ],
    [
      { x: 209, y: 215 },
      { x: 219.5, y: 202.5 },
      { x: 234.3, y: 198.8 },
    ],
    [
      { x: 234.3, y: 198.8 },
      { x: 211.4, y: 180.8 },
      { x: 185.5, y: 186.4 },
    ],
    [
      { x: 185.8, y: 186.4 },
      { x: 165.7, y: 189 },
      { x: 146.1, y: 203.1 },
    ],
    [
      { x: 209.5, y: 214 },
      { x: 310, y: 185.8 },
      { x: 324, y: 101.8 },
    ],
    [
      { x: 323.3, y: 103.8 },
      { x: 280, y: 75.7 },
      { x: 279.6, y: 36.1 },
    ],
    [
      { x: 279.6, y: 36.1 },
      { x: 290.5, y: 50.9 },
      { x: 308.7, y: 53.2 },
    ],
    [
      { x: 308.7, y: 53.2 },
      { x: 329.3, y: 54.2 },
      { x: 345.6, y: 66.8 },
    ],
    [
      { x: 345.6, y: 66.8 },
      { x: 363.4, y: 37.7 },
      { x: 393.5, y: 21.5 },
    ],
    [
      { x: 251.4, y: 198 },
      { x: 296.2, y: 168.9 },
      { x: 317.3, y: 110.6 },
    ],
    [
      { x: 317.3, y: 111.6 },
      { x: 273.8, y: 81.2 },
      { x: 272.6, y: 25.1 },
    ],
    [
      { x: 272.6, y: 25.1 },
      { x: 304.7, y: 53.1 },
      { x: 331, y: 48.2 },
    ],
    [
      { x: 330, y: 48.2 },
      { x: 342, y: 51.1 },
      { x: 344.5, y: 53.8 },
    ],
    [
      { x: 344.5, y: 53.8 },
      { x: 350, y: 37 },
      { x: 393.5, y: 21 },
    ],
    [
      { x: 282.9, y: 289.4 },
      { x: 350, y: 215 },
      { x: 359.3, y: 119.9 },
    ],
  ].map(dots =>
    dots.map(dot => ({
      x: dot.x + INITIAL_X,
      y: 500 - dot.y - INITIAL_Y,
    })),
  );

  const curvedArrA = arrA.map(dots =>
    getCurveDots(dots[0], dots[1], dots[2]),
  );

  ctx.beginPath();
  buildGrid(axesDots);
  ctx.strokeStyle = '#808080';
  buildGrid(dividerDots);
  ctx.stroke();
  ctx.strokeStyle = 'black';

  ctx.beginPath();
  ctx.lineWidth = 2;
  curvedArrA.map(build(ctx));
  ctx.stroke();
  ctx.lineWidth = 1;

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

    const config = {
      x: +rotationX.value,
      y: +rotationY.value,
      angle: rotationState,
    };
    const transformed = curvedArrA.map(dots =>
      euclidTransformations(dots, config, null),
    );

    ctx.beginPath();
    ctx.lineWidth = 2;
    transformed.map(build(ctx));
    ctx.stroke();
    ctx.lineWidth = 1;

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

    const updatedDots = curvedArrA.map(dots =>
      dots.map(dot => ({
        x: dot.x + +centerX.value + +x,
        y: dot.y + +centerY.value + +y,
      })),
    );

    ctx.beginPath();
    ctx.lineWidth = 2;
    updatedDots.map(build(ctx));
    ctx.stroke();
    ctx.lineWidth = 1;

    inputX.value = `${+centerX.value + x}`;
    inputY.value = `${+centerY.value + y}`;

    deltaX.value = +deltaX.value + +x;
    deltaY.value = +deltaY.value + +y;
  };

  animateInput.onclick = () => {
    const test = arrA.map((dots, i) => {
      return dots.map((dot, j) => animate(dot, arrB[i][j]));
    });

    let iterator = 0;
    const i = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      buildGrid(axesDots);
      ctx.strokeStyle = '#808080';
      buildGrid(dividerDots);
      ctx.stroke();
      ctx.strokeStyle = 'black';

      ctx.beginPath();
      ctx.lineWidth = 2;

      test.forEach(elem => {
        const curvedArr = getCurveDots(
          elem[0][iterator],
          elem[1][iterator],
          elem[2][iterator],
        );
        build(ctx, curvedArr);
      });

      ctx.stroke();
      ctx.lineWidth = 1;

      iterator += 1;
      if (iterator === 100) {
        clearInterval(i);
      }
    }, 0);
  };
};

window.onload = () => {
  buildEuclid();
};
