import {
  degToRadian,
} from './degToRadian';

// eslint-disable-next-line
export const drawArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  ctx: CanvasRenderingContext2D,
) => {
  const startRadian = degToRadian(startAngle);
  const endRadian = degToRadian(endAngle);
  let isFirstDot = true;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for (let i = startRadian; i <= endRadian; i += Math.PI / 180) {
    const dotX = radius * Math.cos(i);
    const dotY = radius * Math.sin(i);

    if (isFirstDot) {
      ctx.moveTo(x + dotX, y + dotY);
      isFirstDot = false;
    }

    ctx.lineTo(x + dotX, y + dotY);
  }

  ctx.stroke();
};
