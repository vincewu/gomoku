import {GRID_SIZE, TOGGLE} from '../types';

const checkVertical = (action) => {
  const { gomoku, color } = action;
  let goNumber = 0;
  for (let y = action.y - 1; y >= 0 && gomoku[y][action.x].color === color; y--) {
    goNumber++;
  }
  for (let y = action.y + 1; y < GRID_SIZE && gomoku[y][action.x].color === color; y++) {
    goNumber++;
  }

  return goNumber === 4;
};

const checkHorizontal = (action) => {
  const { gomoku, color } = action;
  let goNumber = 0;
  for (let x = action.x - 1; x >= 0 && gomoku[action.y][x].color === color; x--) {
    goNumber++;
  }
  for (let x = action.x + 1; x < GRID_SIZE && gomoku[action.y][x].color === color; x++) {
    goNumber++;
  }

  return goNumber === 4;
};

const checkLeftDiagonal = (action) => {
  const { gomoku, color } = action;
  let goNumber = 0;
  for (let x = action.x - 1, y = action.y - 1; x >= 0 && y >= 0 && gomoku[y][x].color === color; x--, y--) {
    goNumber++;
  }
  for (let x = action.x + 1, y = action.y + 1; x < GRID_SIZE && y < GRID_SIZE && gomoku[y][x].color === color; x++, y++) {
    goNumber++;
  }

  return goNumber === 4;
};

const checkRightDiagonal = (action) => {
  const { gomoku, color } = action;
  let goNumber = 0;
  for (let x = action.x - 1, y = action.y + 1; x >= 0 && y < GRID_SIZE && gomoku[y][x].color === color; x--, y++) {
    goNumber++;
  }
  for (let x = action.x + 1, y = action.y - 1; x < GRID_SIZE && y >= 0 && gomoku[y][x].color === color; x++, y--) {
    goNumber++;
  }

  return goNumber === 4;
};

export default (state = '', action) => {
  switch(action.type) {
    case TOGGLE:
      return checkVertical(action) || checkHorizontal(action) ||
              checkLeftDiagonal(action) || checkRightDiagonal(action) ? action.color : '';
    default:
      return '';
  }
};