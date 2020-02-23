export const build = (dots: Array<{ x: number; y: number }>, ctx: CanvasRenderingContext2D) => {
  const [firstDot, ...restDots] = dots;

  ctx.moveTo(firstDot.x, firstDot.y);
  restDots.forEach(dot => ctx.lineTo(dot.x, dot.y));
};
