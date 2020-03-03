import * as R from 'ramda';

import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,
  getArcDots,
  getDotCoords,
  build,
  degToRadian,
} from './utils';
import { projectiveTransformation } from './transformations/projective';
import {
  X_CENTER, // TODO:
  Y_CENTER, // TODO:
  R_SMALL,
  Proportions,
} from './constants';

const draw = (
  smallRadius: number,
  centerX: number,
  centerY: number,
  vectors: { e1: number[]; e2: number[], e3: number[]},
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();
  ctx.lineWidth = 2;

  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_BIG = R_SMALL * Proportions.R_BIG;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;

  const bigArcDots = getArcDots(
    centerX,
    centerY,
    R_BIG,
    0,
    360,
  );
  const strategy = projectiveTransformation(vectors);
  const affineBigArcDots = bigArcDots.map(strategy);
  console.log({ affineBigArcDots });
  build(ctx, affineBigArcDots);

  // centered
  const centeredArcDots = getArcDots(
    centerX,
    centerY,
    R_SMALL,
    0,
    360,
  );
  const affineCenteredDots = centeredArcDots.map(
    strategy,
  );
  build(ctx, affineCenteredDots);

  // top/bottom
  const topArcDost = getArcDots(
    centerX,
    centerY - 2 * R_SMALL,
    R_SMALL,
    135,
    405,
  );
  const bottomArcDots = getArcDots(
    centerX,
    centerY + 2 * R_SMALL,
    R_SMALL,
    -45,
    225,
  );
  const affineTopArcDots = topArcDost.map(strategy);
  const affineBottomArcDots = bottomArcDots.map(
    strategy,
  );
  build(ctx, affineTopArcDots);
  build(ctx, affineBottomArcDots);

  // / rigth/left
  const rightArcDots = getArcDots(
    centerX + 2 * R_SMALL,
    centerY,
    R_SMALL,
    -135,
    135,
  );
  const leftArcDots = getArcDots(
    centerX - 2 * R_SMALL,
    centerY,
    R_SMALL,
    45,
    315,
  );
  const affineRightArcDots = rightArcDots.map(
    strategy,
  );
  const affineLeftArcDots = leftArcDots.map(strategy);
  build(ctx, affineRightArcDots);
  build(ctx, affineLeftArcDots);

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
  const affineSquareDots = squareDots.map(strategy);
  build(ctx, affineSquareDots);

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
  const affineBigRightCircleDots = bigRightCircleDots.map(
    strategy,
  );
  const affineBigLeftCircleDots = bigLeftCircleDots.map(
    strategy,
  );
  build(ctx, affineBigRightCircleDots);
  build(ctx, affineBigLeftCircleDots);

  ctx.stroke();
  ctx.lineWidth = 1;
};

const buildGrid = (
  ctx: CanvasRenderingContext2D,
  affineVectors: { e1: number[]; e2: number[], e3: number[] },
  dots: Array<Array<{ x: number; y: number }>>,
) => {
  const buildFunc = R.pipe(
    R.map(R.map(projectiveTransformation(affineVectors))),
    R.map(build(ctx)),
  );

  buildFunc(dots);
};

const buildAffine = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById('projective')
  );
  const buildInput = <HTMLInputElement>(
    document.getElementById('build')
  );
  const e11 = <HTMLInputElement>(
    document.getElementById('e11')
  );
  const e12 = <HTMLInputElement>(
    document.getElementById('e12')
  );
  const e13 = <HTMLInputElement>(
    document.getElementById('e13')
  );
  const e21 = <HTMLInputElement>(
    document.getElementById('e21')
  );
  const e22 = <HTMLInputElement>(
    document.getElementById('e22')
  );
  const e23 = <HTMLInputElement>(
    document.getElementById('e23')
  );
  const e31 = <HTMLInputElement>(
    document.getElementById('e31')
  );
  const e32 = <HTMLInputElement>(
    document.getElementById('e32')
  );
  const e33 = <HTMLInputElement>(
    document.getElementById('e33')
  );

  const affineVectors = {
    e1: [+e11.value, +e12.value, +e13.value],
    e2: [+e21.value, +e22.value, +e23.value],
    e3: [+e31.value, +e32.value, +e33.value],
  };
  const affineAxisVectors = {
    e1: [+e11.value, +e12.value, 0],
    e2: [+e21.value, +e22.value, 0],
    e3: [+e31.value, +e32.value, 1],
  };
  const radius = 25;
  const centerX = 270;
  const centerY = 270;

  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d',
  );

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
  buildGrid(ctx, affineAxisVectors, axesDots);
  ctx.strokeStyle = '#808080';
  buildGrid(ctx, affineAxisVectors, dividerDots);
  ctx.stroke();
  ctx.strokeStyle = 'black';

  draw(+radius, +centerX, +centerY, affineVectors, ctx);

  buildInput.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // eslint-disable-next-line
    const affineVectors = {
      e1: [+e11.value, +e12.value, +e13.value],
      e2: [+e21.value, +e22.value, +e23.value],
      e3: [+e31.value, +e32.value, +e33.value],
    };
    // eslint-disable-next-line
    const affineAxisVectors = {
      e1: [+e11.value, +e12.value, 0],
      e2: [+e21.value, +e22.value, 0],
      e3: [+e31.value, +e32.value, 1],
    };
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
    ctx.strokeStyle = 'black';
    buildGrid(ctx, affineAxisVectors, axesDots);
    ctx.strokeStyle = '#808080';
    buildGrid(ctx, affineAxisVectors, dividerDots);
    ctx.stroke();
    ctx.strokeStyle = 'black';
    draw(+radius, +centerX, +centerY, affineVectors, ctx);
  };
};

window.onload = () => {
  buildAffine();
};
