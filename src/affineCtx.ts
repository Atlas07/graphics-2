import {
  drawDividerXAffineLines,
  drawDividerYAffineLines,
} from './utils';

const buildAffine = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("affine");

  if (!canvas.getContext) {
    throw new Error("No canvas");
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

  // drawXAxis(canvasWidth, ctx);
  // drawYAxis(canvasHeight, ctx);
  drawDividerXAffineLines(canvasWidth, 20, ctx);
  drawDividerYAffineLines(canvasHeight, 20, ctx);
};

export default buildAffine;
