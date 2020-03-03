import * as R from 'ramda';

import {
  drawXAxis,
  drawYAxis,
  drawDividerXLines,
  drawDividerYLines,
  build,
  drawArc,
  getArcDots,
  getDotCoords,
  degToRadian,
} from './utils';
import { euclidTransformations } from './transformations/euclid';

import {
  X_CENTER,
  Y_CENTER,
  R_SMALL,
  Proportions,
} from './constants';

const draw = (
  smallRadius: number,
  centerX: number,
  centerY: number,
  rotation: number,
  rotationX: number,
  rotationY: number,
  ctx: CanvasRenderingContext2D,
) => {
  const R_SMALL = smallRadius * Proportions.R_SMALL;
  const R_MEDIUM = R_SMALL * Proportions.R_MEDIUM;
  const R_BIG = R_SMALL * Proportions.R_BIG;

  ctx.beginPath();
  ctx.lineWidth = 2;

  const arcDots = getArcDots(centerX, centerY, R_BIG, 0, 360);
  const euclidArcDots = euclidTransformations(
    arcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidArcDots);

  // centered
  const centeredArcDots = getArcDots(centerX, centerY, R_SMALL, 0, 360);
  const euclidCenteredArcDots = euclidTransformations(
    centeredArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidCenteredArcDots);

  // top / bottom
  const topArcDots = getArcDots(
    centerX,
    centerY - 2 * R_SMALL,
    R_SMALL,
    135,
    405,
  );
  const euclidTopArcDots = euclidTransformations(
    topArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidTopArcDots);

  const bottomArcDots = getArcDots(
    centerX,
    centerY + 2 * R_SMALL,
    R_SMALL,
    -45,
    225,
  );
  const euclidBottomArcDots = euclidTransformations(
    bottomArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidBottomArcDots);

  // rigth / left
  const rightArcDots = getArcDots(
    centerX + 2 * R_SMALL,
    centerY,
    R_SMALL,
    -135,
    135,
  );
  const euclidRightArcDots = euclidTransformations(
    rightArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidRightArcDots);

  const leftArcDots = getArcDots(
    centerX - 2 * R_SMALL,
    centerY,
    R_SMALL,
    45,
    315,
  );
  const euclidLefttArcDots = euclidTransformations(
    leftArcDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidLefttArcDots);

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
  const euclidSquareDots = euclidTransformations(
    squareDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidSquareDots);

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
  const euclidBigRightCircleDots = euclidTransformations(
    bigRightCircleDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  const euclidBigLeftCircleDots = euclidTransformations(
    bigLeftCircleDots,
    { x: rotationX, y: rotationY, angle: rotation },
    null,
  );
  build(ctx, euclidBigRightCircleDots);
  build(ctx, euclidBigLeftCircleDots);

  ctx.stroke();
  ctx.lineWidth = 1;
};

const buildEuclid = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementById('euclid')
  );

  const centerX = <HTMLInputElement>(
    document.getElementById('euclidCenterX')
  );
  const centerY = <HTMLInputElement>(
    document.getElementById('euclidCenterY')
  );
  const deltaX = <HTMLInputElement>(
    document.getElementById('deltaX')
  );
  const deltaY = <HTMLInputElement>(
    document.getElementById('deltaY')
  );

  const rotateInput = <HTMLInputElement>(
    document.getElementById('rotate')
  );
  const rotation = <HTMLInputElement>(
    document.getElementById('euclidRotation')
  );
  const rotationX = <HTMLInputElement>(
    document.getElementById('rotationX')
  );
  const rotationY = <HTMLInputElement>(
    document.getElementById('rotationY')
  );

  if (!canvas.getContext) {
    throw new Error('No canvas');
  }

  const canvasWidth = canvas.width - 100;
  const canvasHeight = canvas.height - 100;

  const info = document.getElementById('info-division');
  info.innerHTML = `Division: ${canvasWidth / 10}`;

  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d',
  );

  const buildGrid = R.pipe(
    R.map(build(ctx)),
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
  buildGrid(axesDots);
  ctx.strokeStyle = '#808080';
  buildGrid(dividerDots);
  ctx.stroke();
  ctx.strokeStyle = 'black';

  const radius = 25;

  draw(
    radius,
    +centerX.value,
    +centerY.value,
    +rotation.value,
    +rotationX.value,
    +rotationY.value,
    ctx,
  );

  let rotationState = 0;

  rotateInput.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    buildGrid(axesDots);
    ctx.strokeStyle = '#808080';
    buildGrid(dividerDots);
    ctx.stroke();
    ctx.strokeStyle = 'black';

    draw(
      radius,
      +centerX.value,
      +centerY.value,
      +rotation.value + rotationState,
      +rotationX.value,
      +rotationY.value,
      ctx,
    );

    rotationState += +rotation.value;
    rotation.value = '0';
  };

  window.onkeydown = (event: any) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown'
    ) {
      return;
    }

    const inputX = <HTMLInputElement>(
      document.getElementById('euclidCenterX')
    );
    const inputY = <HTMLInputElement>(
      document.getElementById('euclidCenterY')
    );

    let x = 0;
    let y = 0;

    if (event.key === 'ArrowRight') {
      x += 10;
    }
    if (event.key === 'ArrowLeft') {
      x -= 10;
    }
    if (event.key === 'ArrowDown') {
      y += 10;
    }
    if (event.key === 'ArrowUp') {
      y -= 10;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    buildGrid(axesDots);
    ctx.strokeStyle = '#808080';
    buildGrid(dividerDots);
    ctx.stroke();
    ctx.strokeStyle = 'black';

    draw(
      radius,
      +inputX.value + x,
      +inputY.value + y,
      +rotation.value,
      +rotationX.value,
      +rotationY.value,
      ctx,
    );
    inputX.value = `${+centerX.value + x}`;
    inputY.value = `${+centerY.value + y}`;

    deltaX.value = +deltaX.value + +x;
    deltaY.value = +deltaY.value + +y;
  };
};

window.onload = () => {
  buildEuclid();
};
