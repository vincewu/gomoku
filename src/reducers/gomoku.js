import {GRID_SIZE, TOGGLE} from '../types';

const initGomoku = [];

for (let i = 0; i < GRID_SIZE; i++) {
  const row = [];
  for (let j = 0; j < GRID_SIZE; j++) {
    row.push({
      color: null
    });
  }
  initGomoku.push(row);
}


export default (state = initGomoku, action) => {
  const { x, y, color } = action;
  switch(action.type) {
    case TOGGLE:
      return state.map((row, rowIdx) => {
        if (rowIdx !== y) {
          return [...row];
        } else {
          return row.map((col, colIdx) => {
            if (colIdx !== x) {
              return {...col};
            } else {
              return {
                ...col,
                color
              }
            }
          });
        }
      });
    default:
      return state;
  }
};