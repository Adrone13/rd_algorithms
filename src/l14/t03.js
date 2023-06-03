/**
 * Вам дано 2 рядки: text1 та text2. Поверніть довжину найбільшої спільної
 * підпослідовності цих двох рядків. Якщо такої немає - поверніть 0.
 *
 * Підпослідовність рядка - це рядок отриманий з оригінального рядка з деякими
 * віддаленими символами (може бути 0)
 * АЛЕ БЕЗ зміни відносного порядку символів, що залишилися.
 * Наприклад, 'ace' є підрядоком 'abcde'.
 *
 * Спільна послідовність двох рядків це послідовність, яка є в обох рядках.
 *
 * Приклад:
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Пояснення: найдовша підпослідовність - "ace", довжиною в 3 символи.
 *
 * Обмеження:
 * 1 <= text1.length, text2.length <= 1000
 * text1 і text2 складаються лише з символів [a-z]
 *
 * Підказка: постарайтеся вирішити це завдання самостійно, але якщо ніяк не
 * виходить
 * - пошукайте LCS (longest common subsequence) і окремо розберіться як це працює.
 */

const testCases = [
  // { input: ["abcdaf", "af"], expected: 4 },

  { input: ["abcdaf", "acbcf"], expected: 4 },

  { input: ["ace", "abcde"], expected: 3 },

  { input: ["abcde", "ace"], expected: 3 },
  { input: ["abc", "abc"], expected: 3 },
  { input: ["abc", "def"], expected: 0 },
  { input: ["qwerty", "qy"], expected: 2 },
  { input: ["qwerty", "qklhy"], expected: 2 },

  { input: ["", "a"], expected: 0 },
  { input: ["a", "b"], expected: 0 },
  { input: ["", ""], expected: 0 },
];

function printLcsMatrix(text1, text2, matrix) {
  process.stdout.write('    ');
  // text2.split('').forEach(i => process.stdout.write(i + ' '));
  text2.split('').forEach(i => process.stdout.write(`\x1b[33m${i}\x1b[0m` + ' '));
  process.stdout.write('\n');

  matrix.forEach((element, index) => {
    if (index === 0) {
      process.stdout.write('  ');
      element.forEach(i => process.stdout.write(i + ' '));
      process.stdout.write('\n');
      
      return;
    }

    process.stdout.write(`\x1b[33m${text1.charAt(index - 1)}\x1b[0m` + ' ');
    element.forEach(i => process.stdout.write(i + ' '));
    process.stdout.write('\n');
  });
}

function longestCommonSubsequence(text1, text2) {
  const m = text2.length + 1;
  const n = text1.length + 1
  const dp = Array.from(new Array(m), () => new Array(n).fill(0));

  for (let i = 1; i < m; i++) {
    const currentChar = text2.charAt(i - 1);

    // console.log('Text 2 char:', currentChar);

    for (let j = 1; j < n; j++) {
      const comparedChar = text1.charAt(j - 1);
      

      // console.log('Text 1 char:', comparedChar);

      // The letter is included in sequence
      if (currentChar === comparedChar) {
        const diagonal = dp[i - 1][j - 1];
        // console.log('Found:', comparedChar);
        dp[i][j] = diagonal + 1;
      
      // The letter is on the path but isn't included
      } else {
        const top = dp[i - 1][j];
        const left = dp[i][j - 1];

        dp[i][j] = Math.max(top, left);
      }
    }
    console.log();
  }

  printLcsMatrix(text2, text1, dp);

  return dp[m - 1][n - 1];
}

const { test } = require('../utils/test');

// test(longestCommonSubsequence, testCases);

const { input, expected } = testCases[0];

console.log('Expected:', expected, 'Received:', longestCommonSubsequence(...input));
