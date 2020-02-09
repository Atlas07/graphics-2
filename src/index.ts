import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,

  getDotCoords,
  drawArc,

  degToRadian,
} from './utils';
import {
  R_SMALL,
  R_MEDIUM,
  R_BIG,

  X_CENTER,
  Y_CENTER,
} from './constants';

const drawSquare = (
  x: number,
  y: number,
  width: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.beginPath();

  ctx.moveTo(x + width, y);
  ctx.lineTo(x, y + width);
  ctx.lineTo(x - width, y);
  ctx.lineTo(x, y - width);
  ctx.lineTo(x + width, y);

  ctx.stroke();
};

function draw() {
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');

  if (canvas.getContext) {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    drawXAxis(ctx);
    drawYAxis(ctx);
    drawDividerXLines(ctx);
    drawDividerYLines(ctx);

    drawArc(X_CENTER, Y_CENTER, R_BIG, 0, 360, ctx);
    drawSquare(X_CENTER, Y_CENTER, R_SMALL * 2, ctx);

    // centered
    drawArc(X_CENTER, Y_CENTER, R_SMALL, 0, 360, ctx);
    // top / bottom
    drawArc(
      X_CENTER,
      Y_CENTER - 2 * R_SMALL,
      R_SMALL,
      135,
      405,
      ctx,
    );
    drawArc(
      X_CENTER,
      Y_CENTER + 2 * R_SMALL,
      R_SMALL,
      -45,
      225,
      ctx,
    );
    // rigth / left
    drawArc(
      X_CENTER + 2 * R_SMALL,
      Y_CENTER,
      R_SMALL,
      -135,
      135,
      ctx,
    );
    drawArc(
      X_CENTER - 2 * R_SMALL,
      Y_CENTER,
      R_SMALL,
      45,
      315,
      ctx,
    );

    const bigRightCircleCoords = getDotCoords(X_CENTER, Y_CENTER, R_BIG, -45);
    const bigLeftCircleCoords = getDotCoords(X_CENTER, Y_CENTER, R_BIG, 225);

    drawArc(
      bigRightCircleCoords.x - (R_MEDIUM * Math.cos(degToRadian(45))),
      bigRightCircleCoords.y + (R_MEDIUM * Math.sin(degToRadian(45))),
      R_MEDIUM,
      225,
      405,
      ctx,
    );
    drawArc(
      bigLeftCircleCoords.x + (R_MEDIUM * Math.cos(degToRadian(45))),
      bigLeftCircleCoords.y + (R_MEDIUM * Math.cos(degToRadian(45))),
      R_MEDIUM,
      135,
      315,
      ctx,
    );
  }
}

window.onload = draw;

// const topArcDots = getArcDots(200, 150, 25, 270, 360).map(item => +item.x.toFixed(2));
// const leftMediumArcDots = getArcDots(
//   bigRightCircleCoords.x - 26,
//   bigRightCircleCoords.y + 26,
//   37.5,
//   90,
//   180,
// ).map(item => +item.x.toFixed(2));

// const test = R.intersection(topArcDots, leftMediumArcDots);