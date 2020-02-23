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


const draw = (smallRadius: number, angle: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.lineWidth = 2;

  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_BIG = R_SMALL * Proportions.R_BIG;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;

  const bigArcDots = getArcDots(400, 400, R_BIG, 0, 360);
  const affineBigArcDots = bigArcDots.map(affineTransformation(angle));
  build(ctx, affineBigArcDots);

  // centered
  const centeredArcDots = getArcDots(400, 400, R_SMALL, 0, 360);
  const affineCenteredDots = centeredArcDots.map(affineTransformation(angle));
  build(ctx, affineCenteredDots);

  // top/bottom
  const topArcDost = getArcDots(400, 400 - 2 * R_SMALL, R_SMALL, 135, 405);
  const bottomArcDots = getArcDots(400, 400 + 2 * R_SMALL, R_SMALL, -45, 225);
  const affineTopArcDots = topArcDost.map(affineTransformation(angle));
  const affineBottomArcDots = bottomArcDots.map(affineTransformation(angle));
  build(ctx, affineTopArcDots);
  build(ctx, affineBottomArcDots);

  // / rigth/left
  const rightArcDots = getArcDots(400 + 2 * R_SMALL, 400, R_SMALL, -135, 135);
  const leftArcDots = getArcDots(400 - 2 * R_SMALL, 400, R_SMALL, 45, 315);
  const affineRightArcDots = rightArcDots.map(affineTransformation(angle));
  const affineLeftArcDots = leftArcDots.map(affineTransformation(angle));
  build(ctx, affineRightArcDots);
  build(ctx, affineLeftArcDots);

  // square
  const squareDots = [
    {
      x: 400 + R_SMALL * 2,
      y: 400,
    },
    {
      x: 400,
      y: 400 + R_SMALL * 2,
    },
    {
      x: 400 - R_SMALL * 2,
      y: 400,
    },
    {
      x: 400,
      y: 400 - R_SMALL * 2,
    },
    {
      x: 400 + R_SMALL * 2,
      y: 400,
    },
  ];
  const affineSquareDots = squareDots.map(affineTransformation(angle));
  build(ctx, affineSquareDots);

  // medium
  const bigRightCircleCoords = getDotCoords(400, 400, R_BIG, -45);
  const bigLeftCircleCoords = getDotCoords(400, 400, R_BIG, 225);
  const bigRightCircleDots = getArcDots(
    bigRightCircleCoords.x - R_MEDIUM * Math.cos(degToRadian(45)),
    bigRightCircleCoords.y + R_MEDIUM * Math.sin(degToRadian(45)),
    R_MEDIUM,
    225,
    405,
  );
  const bigLeftCircleDots = getArcDots(
    bigLeftCircleCoords.x + R_MEDIUM * Math.cos(degToRadian(45)),
    bigLeftCircleCoords.y + R_MEDIUM * Math.cos(degToRadian(45)),
    R_MEDIUM,
    135,
    315,
  );
  const affineBigRightCircleDots = bigRightCircleDots.map(affineTransformation(angle));
  const affineBigLeftCircleDots = bigLeftCircleDots.map(affineTransformation(angle));
  build(ctx, affineBigRightCircleDots);
  build(ctx, affineBigLeftCircleDots);

  ctx.stroke();
  ctx.lineWidth = 1;
};

const buildAffine = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('affine');

  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  drawAffineXAxis(canvasWidth, 20, ctx);
  drawAffineYAxis(canvasWidth, 20, ctx);
  drawDividerXAffineLines(canvasWidth, 20, ctx);
  drawDividerYAffineLines(canvasHeight, 20, ctx);

  draw(R_SMALL, 20, ctx);
};

export default buildAffine;
