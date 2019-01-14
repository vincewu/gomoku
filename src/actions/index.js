import { TOGGLE } from '../types'

export const setGo = (x, y, color, gomoku) => ({
    type: TOGGLE,
    x,
    y,
    color,
    gomoku,
  });

