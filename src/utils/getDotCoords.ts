import {
  degToRadian
} from './degToRadian';

// eslint-disable-next-line
export const getDotCoords = (
  x: number,
  y: number,
  radius: number,
  angle: number,
) => {
  const radianAngle = degToRadian(angle);

  const xDot = radius * Math.cos(radianAngle);
  const yDot = radius * Math.sin(radianAngle);

  return {
    x: x + xDot,
    y: y + yDot,
  };
};