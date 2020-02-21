import {
  rotate,
  translate,
} from './utils';

export const euclidTransformations = (
  dots: Array<{ x: number; y: number }>,
  rotation: { x: number; y: number; angle: number },
  translation: { x: number; y: number },
) => {
  const rotatedDots = rotation
    ? dots.map(dot => rotate({ x: dot.x, y: dot.y }, rotation.x, rotation.y, rotation.angle))
    : [...dots];
  const translatedDots = translation
    ? rotatedDots.map(dot =>
      translate({ x: dot.x, y: dot.y }, { x: translation.x, y: translation.y }),
    )
    : [...rotatedDots];

  return translatedDots;
};