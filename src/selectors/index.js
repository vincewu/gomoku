import { createSelector } from 'reselect';
import { BLACK, WHITE } from '../types';

const gomokuSelector = state => state.gomoku;

export const serializeSelector = createSelector(
  gomokuSelector,
  gomoku => gomoku.reduce((acc, row) => {
      return acc + row.reduce((ac, col) => {
        switch (col.color) {
          case WHITE:
            return ac + 'W';
          case BLACK:
            return ac + 'B';
          default:
            return ac + ' ';
        }
      }, '')
    }, '')
);
