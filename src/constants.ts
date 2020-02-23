export const INITIAL_X = 20;
export const INITIAL_Y = 20;

export const R_SMALL = 25;

export const X_CENTER = 500 + INITIAL_X;
export const Y_CENTER = 500 + INITIAL_X;

export const AXIS_LENGTH_DELTA = 10;
export const AFFINE_COUNT = 8;

interface IProportions {
  R_SMALL: number;
  R_MEDIUM: number;
  R_BIG: number;
};

export const Proportions: IProportions = {
  R_SMALL: 1,
  R_MEDIUM: 1.6,
  R_BIG: 4,
};
