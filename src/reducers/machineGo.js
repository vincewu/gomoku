import { BLACK, GRID_SIZE, WHITE } from '../types';

const TYPE_SCORE = {
  [BLACK]: {
    5: 100000,
    4: 1000,
    3: 110,
    2: 11,
    1: 2,
  },
  [WHITE]: {
    5: -200000,
    4: -2000,
    3: -100,
    2: -10,
    1: -1,
  }
};

const horizontalScore = gomoku => {
  let score = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    let col = 0;
    while (col < GRID_SIZE) {
      let right = col;
      const { color } = gomoku[row][col];
      if (color !== null) {
        while (right + 1 < GRID_SIZE && gomoku[row][right+1].color === color) {
          right++;
        }
        if (right - col >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (right - col === 3) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (right - col === 2) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (right - col === 1) {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (col - 1 >= 0 && gomoku[row][col-1].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (right + 1 < GRID_SIZE && gomoku[row][right+1].color === null) {
            score += TYPE_SCORE[color][1];
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
      if (color !== null) {
        while (down + 1 < GRID_SIZE && gomoku[down+1][col].color === color) {
          down++;
        }
        if (down - row >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (down - row === 3) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (down - row === 2) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (down - row === 1) {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (row - 1 >= 0 && gomoku[row-1][col].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (down + 1 < GRID_SIZE && gomoku[down+1][col].color === null) {
            score += TYPE_SCORE[color][1];
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
      if (color !== null) {
        while (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol++;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][1];
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
      if (color !== null) {
        while (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === color) {
          nextRow++;
          nextCol++;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (len === 1) {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (startRow - 1 >= 0 && startCol - 1 >= 0 && gomoku[startRow-1][startCol-1].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol + 1 < GRID_SIZE && gomoku[nextRow+1][nextCol+1].color === null) {
            score += TYPE_SCORE[color][1];
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
      if (color !== null) {
        while (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === color) {
          nextRow++;
          nextCol--;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][1];
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
      if (color !== null) {
        while (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === color) {
          nextRow++;
          nextCol--;
        }
        const len = nextRow - startRow;
        if (len >= 4) {
          score += TYPE_SCORE[color][5];
        } else if (len === 3) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][4];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][4];
          }
        } else if (len === 2) {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][3];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][3];
          }
        } else if (len === 1){
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][2];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][2];
          }
        } else {
          if (startRow - 1 >= 0 && startCol + 1 <GRID_SIZE && gomoku[startRow-1][startCol+1].color === null) {
            score += TYPE_SCORE[color][1];
          }
          if (nextRow + 1 < GRID_SIZE && nextCol - 1 >= 0 && gomoku[nextRow+1][nextCol-1].color === null) {
            score += TYPE_SCORE[color][1];
          }
        }
      }
      startRow = nextRow + 1;
      startCol = nextCol - 1;
    }
  }

  return score;
};

const evalBlackBestMove = (gomoku, bestScoreSoFar) => {
  let roundBestScore = -10000000;
  for (let blackRow = 0; blackRow < GRID_SIZE; blackRow++) {
    for (let blackCol = 0; blackCol < GRID_SIZE; blackCol++) {
      if (gomoku[blackRow][blackCol].color === null) {
        gomoku[blackRow][blackCol].color = BLACK;
        const score = verticalScore(gomoku) + horizontalScore(gomoku) + leftDiagonalScore(gomoku) + rightDiagonalScore(gomoku);
        if (score > bestScoreSoFar) {
          gomoku[blackRow][blackCol].color = null;
          return null;
        } else if (score > roundBestScore){
          roundBestScore = score;
        }

        gomoku[blackRow][blackCol].color = null;
      }
    }
  }
  return roundBestScore;
};

export default (state = {}, action) => {
  const { x, y, color, gomoku } = action;

  if (color === BLACK) {
    gomoku[y][x].color = BLACK;
    let maxScore = 10000000;
    let go = {};
    for (let whiteRow = 0; whiteRow < GRID_SIZE; whiteRow++) {
      for (let whiteCol = 0; whiteCol < GRID_SIZE; whiteCol++) {
        if (gomoku[whiteRow][whiteCol].color === null) {
          gomoku[whiteRow][whiteCol].color = WHITE;
          const roundBlackMaxScore = evalBlackBestMove(gomoku, maxScore);
          if (roundBlackMaxScore && roundBlackMaxScore < maxScore) {
            maxScore = roundBlackMaxScore;
            go = {
              x: whiteCol,
              y: whiteRow,
            }
          }

          gomoku[whiteRow][whiteCol].color = null;
        }
      }
    }
    gomoku[y][x].color = null;
    return go;
  }

  return state;
}