import * as R from 'ramda';

// eslint-disable-next-line
export const build = R.curry((ctx: CanvasRenderingContext2D, dots: Array<{ x: number; y: number }>) => {
  const [firstDot, ...restDots] = dots;

  ctx.moveTo(firstDot.x, firstDot.y);
  restDots.forEach(dot => ctx.lineTo(dot.x, dot.y));
});
