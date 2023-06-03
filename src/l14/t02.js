/**
 * Вам дана матриця (сітка) MxN, заповнена невід'ємними цілими числами.
 * Знайдіть шлях з верхньої лівої (left top) клітини у праву нижню (bottom
 * right) з найменшою сумою чисел по дорозі.
 *
 * За умови, що можна рухатися ТІЛЬКИ вниз або вправо на будь-якому кроці.
 *
 * Приклад:
 * Input: grid = [
 * [1,3,1],
 * [1,5,1],
 * [4,2,1]
 * ]
 * Output: 7
 * Пояснення: шлях 1 → 3 → 1 → 1 → 1 має найменшу суму.
 *
 * Обмеження:
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 200
 * 0 <= grid[i][j] <= 100
 */

function printGrid(grid) {
  console.log('Grid');
  console.log('[');
  grid.forEach(element => {
    console.log('  ', element);
  });
  console.log(']');
  console.log('\n');
}

function findLightestPath(grid) {
  printGrid(grid);

  const m = grid.length;
  const n = grid[0].length;

  const dp = [];

  for (let i = 0; i < m; i++) {
    dp[i] = [];

    for (let j = 0; j < n; j++) {
      const currentCell = grid[i][j];
      
      if (i === 0 && j === 0) {
        dp[i][j] = currentCell;
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1] + currentCell;
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j] + currentCell;
      } else {
        const top = dp[i - 1][j];
        const left = dp[i][j - 1];
        
        dp[i][j] = currentCell + Math.min(top, left);
      }
    }
  }

  printGrid(dp);

  return dp[m - 1][n - 1];
}

const testCases = [
  // { input: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7 },
  // { input: [[[1, 2, 3], [4, 5, 6]]], expected: 12 },
  // { input: [[[1]]], expected: 1 },
  // { input: [[[1, 1], [3, 1]]], expected: 3 },
  // { input: [[[1, 1, 3], [4, 1, 1]]], expected: 4 },
  // { input: [[[1, 2, 3], [1, 1, 8], [4, 1, 1], [4, 8, 1]]], expected: 6 },
  // { input: [[[1, 2, 3, 2, 1]]], expected: 9 },
];

const { test } = require('../utils/test');

test(findLightestPath, testCases);

// const { input, expected } = testCases[0];

// console.log('Expected:', expected, 'Received:', findLightestPath(...input));
