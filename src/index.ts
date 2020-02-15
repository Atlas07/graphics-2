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
  X_CENTER,
  Y_CENTER,
  R_SMALL,
  Proportions,
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

const draw = (
  smallRadius: number,
  canvasWidth: number,
  canvasHeight: number,
  ctx: CanvasRenderingContext2D,
) => {
  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;
  const R_BIG = R_SMALL * Proportions.R_BIG;

  drawXAxis(canvasWidth, ctx);
  drawYAxis(canvasHeight, ctx);
  drawDividerXLines(canvasWidth, ctx);
  drawDividerYLines(canvasHeight, ctx);
  

  ctx.lineWidth = 2;

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

  ctx.lineWidth = 1;
}

window.onload = () => {
  const input = <HTMLInputElement> document.getElementById('radius');
  const canvas = <HTMLCanvasElement> document.getElementById('canvas');
  
  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const info = document.getElementById('info-division');
  info.innerHTML = `Division: ${canvasWidth / 10}`;

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  //* initial drawing
  draw(R_SMALL, canvasWidth, canvasHeight, ctx);
  
  input.onkeyup = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(+input.value, canvasWidth, canvasHeight, ctx);
  };
};