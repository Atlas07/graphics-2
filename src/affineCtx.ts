import {
  drawAffineXAxis,
  drawAffineYAxis,
  drawDividerXAffineLines,
  drawDividerYAffineLines,
  getArcDots,
  getDotCoords,
  build,
  degToRadian,
} from './utils';
import { affineTransformation } from './transformations/affine';
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
  angle: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();
  ctx.lineWidth = 2;

  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_BIG = R_SMALL * Proportions.R_BIG;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;

  const bigArcDots = getArcDots(centerX, centerY, R_BIG, 0, 360);
  const affineBigArcDots = bigArcDots.map(
    affineTransformation(angle),
  );
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
    affineTransformation(angle),
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
  const affineTopArcDots = topArcDost.map(
    affineTransformation(angle),
  );
  const affineBottomArcDots = bottomArcDots.map(
    affineTransformation(angle),
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
    affineTransformation(angle),
  );
  const affineLeftArcDots = leftArcDots.map(
    affineTransformation(angle),
  );
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
  const affineSquareDots = squareDots.map(
    affineTransformation(angle),
  );
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
    affineTransformation(angle),
  );
  const affineBigLeftCircleDots = bigLeftCircleDots.map(
    affineTransformation(angle),
  );
  build(ctx, affineBigRightCircleDots);
  build(ctx, affineBigLeftCircleDots);

  ctx.stroke();
  ctx.lineWidth = 1;
};

const buildAffine = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById('affine')
  );
  const buildInput = <HTMLInputElement>(
    document.getElementById('build')
  );
  const radius = <HTMLInputElement>(
    document.getElementById('euclidRadius')
  );
  const centerX = <HTMLInputElement>(
    document.getElementById('euclidCenterX')
  );
  const centerY = <HTMLInputElement>(
    document.getElementById('euclidCenterY')
  );
  const rotation = <HTMLInputElement>(
    document.getElementById('euclidRotation')
  );

  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d',
  );

  drawAffineXAxis(canvasWidth, 20, ctx);
  drawAffineYAxis(canvasWidth, 20, ctx);
  drawDividerXAffineLines(canvasWidth, 20, ctx);
  drawDividerYAffineLines(canvasHeight, 20, ctx);

  draw(R_SMALL, +centerX.value, +centerY.value, 20, ctx);
};

window.onload = () => {
  buildAffine();
};
