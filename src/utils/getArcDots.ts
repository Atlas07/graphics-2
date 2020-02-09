import {
  degToRadian,
} from './degToRadian';
import {
  getDotCoords,
} from './getDotCoords'

const fill = (startAngle: number, endAngle: number) => {
  const arr = [];

  for(let angle = startAngle; angle <= endAngle; angle += 1) {
    arr.push({
      angle,
      radianAngle: degToRadian(angle),
    });
  }

  return arr;
};

interface Dot {
  angle: number,
  radianAngle: number,
  x: number,
  y: number,
};

export const getArcDots = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): Array<Dot> => {
  const angles = fill(startAngle, endAngle);
  const dots = angles.map(item => ({
    ...item,
    ...getDotCoords(x, y, radius, item.angle),
  }));

  return dots;
};
