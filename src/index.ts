import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,

  getDotCoords,

  drawArc,
} from './utils';

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

    drawArc(200, 200, 100, 0, 360, ctx);
    drawSquare(200, 200, 50, ctx);

    // centered
    drawArc(200, 200, 25, 0, 360, ctx);
    // top / bottom
    drawArc(200, 150, 25, 135, 405, ctx);
    drawArc(200, 250, 25, -45, 225, ctx);
    // rigth / left
    drawArc(250, 200, 25, -135, 135, ctx);
    drawArc(150, 200, 25, 45, 315, ctx);

    
    const bigRightCircleCoords = getDotCoords(200, 200, 100, -45);
    const bigLeftCircleCoords = getDotCoords(200, 200, 100, 225);

    drawArc(
      bigRightCircleCoords.x - 26,
      bigRightCircleCoords.y + 26,
      37.5,
      0,
      360,
      ctx,
    );
    drawArc(
      bigLeftCircleCoords.x + 26,
      bigLeftCircleCoords.y + 26,
      37.5,
      0,
      360,
      ctx,
    );
  }
}

window.onload = draw;
