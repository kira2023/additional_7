module.exports = function solveSudoku(matrix) {
  function checkColumn(matrix, row, column, number) {
    for (let i = 0; i <= 8; i++) {
      if (i !== column && matrix[row][i] === number) {
        return false;
      }
    }
    return true;
  }

  function checkRow(matrix, row, column, number) {
    for (let i = 0; i <= 8; i++) {
      if (i !== row && matrix[i][column] === number) {
        return false;
      }
    }
    return true;
  }

  function checkBox(matrix, row, column, number) {
    const y = Math.floor((row / 3)) * 3;
    const x = Math.floor((column / 3)) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== row && j !== column && matrix[y + i][x + j] === number) {
          return false;
        }
      }
    }
    return true;
  }

  function checkInsertNumber(matrix, row, column, number) {
    return checkRow(matrix, row, column, number) &&
      checkColumn(matrix, row, column, number) &&
      checkBox(matrix, row, column, number);
  }


  function trySolveSudoku(matrix) {
    let completionFlag;
    let number;
    for (let row = 0; row <= 8; row++) {
      for (let column = 0; column <= 8; column++) {
        if (!matrix[row][column]) {
          for (number = 1; number <= 9; number++) {
            if (checkInsertNumber(matrix, row, column, number)) {
              matrix[row][column] = number;
              completionFlag = trySolveSudoku(matrix);
              if (completionFlag) {
                return true;
              }
              matrix[row][column] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  trySolveSudoku(matrix);

  return matrix;
}