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

const getAffineVector = R.pipe(
  (vectorString: string) => vectorString.split(','),
  R.map((vector: string) => +vector),
);

const draw = (
  smallRadius: number,
  centerX: number,
  centerY: number,
  vectors: { e1: number[]; e2: number[] },
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
  affineVectors: { e1: number[]; e2: number[] },
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
  const e1 = <HTMLInputElement>(
    document.getElementById('e1')
  );
  const e2 = <HTMLInputElement>(
    document.getElementById('e2')
  );

  const [e11, e12, e13, w1] = getAffineVector(e1.value);
  const [e21, e22, e23, w2] = getAffineVector(e2.value);
  const affineVectors = {
    e1: [e11, e12, e13, w1],
    e2: [e21, e22, e23, w2],
  };
  const affineAxisVectors = {
    e1: [e11, e12, 0, w1],
    e2: [e21, e22, 0, w2],
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

    const [e11, e12, e13, w1] = getAffineVector(e1.value);
    const [e21, e22, e23, w2] = getAffineVector(e2.value);
    const affineVectors = {
      e1: [e11, e12, e13, w1],
      e2: [e21, e22, e23, w2],
    };
    const affineAxisVectors = {
      e1: [e11, e12, 0, w1],
      e2: [e21, e22, 0, w2],
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
