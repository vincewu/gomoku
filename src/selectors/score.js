import { createSelector } from 'reselect';
import { BLACK, GRID_SIZE, WHITE } from '../types';

const WIN_SCORE = 81;
const TYPE_4_SCORE = WIN_SCORE / 3;
const TYPE_3_SCORE = TYPE_4_SCORE / 3;
const TYPE_2_SCORE = TYPE_3_SCORE / 3;
const TYPE_1_SCORE = TYPE_2_SCORE / 3;

const gomokuSelector = state => state.gomoku;

const sign = color => {
  if (color === BLACK) {
    return 1;
  } else if (color === WHITE){
    return -1;
  } else {
    return 0;
  }
};

const horizontalScore = gomoku => {
  let score = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    let col = 0;
    while (col < GRID_SIZE) {
      let right = col;
      const { color } = gomoku[row][col];
      if (color === BLACK) {
        while (right + 1 < GRID_SIZE && gomoku[row][right+1].color === color) {
          right++;
        }
        if (right - col >= 4) {
          score += sign(color) * WIN_SCORE;
        } else if (right - col === 3) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += sign(color) * TYPE_4_SCORE;
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += sign(color) * TYPE_4_SCORE;
          }
        } else if (right - col === 2) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += sign(color) * TYPE_3_SCORE;
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += sign(color) * TYPE_3_SCORE;
          }
        } else if (right - col === 1) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += sign(color) * TYPE_2_SCORE;
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += sign(color) * TYPE_2_SCORE;
          }
        } else {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += sign(color) * TYPE_1_SCORE;
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += sign(color) * TYPE_1_SCORE;
          }
        }
      }
      col = right + 1;
    }
  }
  return score;
};

const verticalScore = gomoku => {
  let score = 0;
  for (let col = 0; col < GRID_SIZE; col++) {
    let row = 0;
    while (row < GRID_SIZE) {
      let down = row;
      const { color } = gomoku[row][col];
      if (color === BLACK) {
        while (down + 1 < GRID_SIZE && gomoku[down+1][col].color === color) {
          down++;
        }
        if (down - row >= 4) {
          score += sign(color) * WIN_SCORE;
        } else if (down - row === 3) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += sign(color) * TYPE_4_SCORE;
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += sign(color) * TYPE_4_SCORE;
          }
        } else if (down - row === 2) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += sign(color) * TYPE_3_SCORE;
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += sign(color) * TYPE_3_SCORE;
          }
        } else if (down - row === 1) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += sign(color) * TYPE_2_SCORE;
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += sign(color) * TYPE_2_SCORE;
          }
        } else {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += sign(color) * TYPE_1_SCORE;
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += sign(color) * TYPE_1_SCORE;
          }
        }
      }
      row = down + 1;
    }
  }
  return score;
};

const leftDiagonalScore = gomoku => {
  let score = 0;
  for (let i = 0; i < GRID_SIZE; i++) {
    let startRow = i;
    let startCol = 0;
    while (startRow < GRID_SIZE && startCol < GRID_SIZE) {
      let nextRow = startRow;
      let nextCol = startCol;
      const { color } = gomoku[startRow][startCol];
      if (color === BLACK) {
        while (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol++;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += WIN_SCORE;
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_4_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_4_SCORE;
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_3_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_3_SCORE;
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_2_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_2_SCORE;
          }
        } else {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_1_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_1_SCORE;
          }
        }
      }
      startRow = nextRow + 1;
      startCol = nextCol + 1;
    }
  }

  for (let j = 1; j < GRID_SIZE; j++) {
    let startRow = 0;
    let startCol = j;
    while (startRow < GRID_SIZE && startCol < GRID_SIZE) {
      let nextRow = startRow;
      let nextCol = startCol;
      const { color } = gomoku[startRow][startCol];
      if (color === BLACK) {
        while (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol++;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += WIN_SCORE;
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_4_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_4_SCORE;
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_3_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_3_SCORE;
          }
        } else if (len === 1) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_2_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_2_SCORE;
          }
        } else {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_1_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_1_SCORE;
          }
        }
      }
      startRow = nextRow + 1;
      startCol = nextCol + 1;
    }
  }

  return score;
};

const rightDiagonalScore = gomoku => {
  let score = 0;
  for (let i = 0; i < GRID_SIZE; i++) {
    let startRow = i;
    let startCol = GRID_SIZE - 1;
    while (startRow < GRID_SIZE && startCol >= 0) {
      let nextRow = startRow;
      let nextCol = startCol;
      const { color } = gomoku[startRow][startCol];
      if (color === BLACK) {
        while (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol--;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += WIN_SCORE;
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_4_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_4_SCORE;
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_3_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_3_SCORE;
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_2_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_2_SCORE;
          }
        } else {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_1_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_1_SCORE;
          }
        }
      }
      startRow = nextRow + 1;
      startCol = nextCol - 1;
    }
  }

  for (let j = GRID_SIZE - 1; j >= 0; j--) {
    let startRow = 0;
    let startCol = j;
    while (startRow < GRID_SIZE && startCol >= 0) {
      let nextRow = startRow;
      let nextCol = startCol;
      const { color } = gomoku[startRow][startCol];
      if (color === BLACK) {
        while (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol--;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += WIN_SCORE;
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_4_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_4_SCORE;
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_3_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_3_SCORE;
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_2_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_2_SCORE;
          }
        } else {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_1_SCORE;
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_1_SCORE;
          }
        }
      }
      startRow = nextRow + 1;
      startCol = nextCol - 1;
    }
  }

  return score;
};

export default createSelector(
  gomokuSelector,
  gomoku => verticalScore(gomoku) + horizontalScore(gomoku) + leftDiagonalScore(gomoku) + rightDiagonalScore(gomoku)
);