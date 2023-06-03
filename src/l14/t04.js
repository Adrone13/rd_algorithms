/**
 * Ви професійний грабіжник, який планує пограбування будинків
 * на одній прямій вулиці.
 *
 * В кожному будинку є певна кількість грошей, яку ви знаєте і можете забрати,
 * єдине обмеження, яке заважає вам пограбувати всі будинки
 * -- це система безпеки будинків.
 *
 * Ви можете відключити систему безпеки будинку, але тоді у вас не вийде
 * відключити систему безпеки будинків, які є сусідніми до цього будинку.
 *
 * Тобто, якщо ви пробралися в будинок i, це означає, що у вас не вийде
 * пробратися в будинки (i-1) та (i+1) (якщо вони є).
 *
 * Вам дано масив цілих чисел nums, що відображає кількість грошей у кожному
 * будинку.
 *
 * Знайдіть максимальну кількість грошей, які ви зможете забрати, без
 * спрацьовування системи безпеки.
 *
 * Приклад:
 * Input: nums = [1,2,3,1]
 * Output: 4
 * Пояснення: грабуєте будинок №1 (money = 1) і потім будинок №3 (money = 3).
 * Усього ви несете 4 одиниці грошей.
 *
 * Обмеження:
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 400
 *
 *
 * Подумайте, чи всі тест кейси ви покрили, чи треба дописати ще декілька? :)
 */

const testCases = [
  { input: [[2, 1, 1, 2]], expected: 4 },
  // 2 + 3 | 1 + 5 | 2 + 5
  { input: [[2, 1, 3, 5]], expected: 7 },
  //         |__|__|  |
  //         |  |_____| 
  //         |________|
  { input: [[1, 2, 3, 1]], expected: 4 },
  { input: [[1, 2, 3, 5]], expected: 7 },
  { input: [[2, 7, 9, 3, 1]], expected: 12 },
  { input: [[2, 7, 9, 3, 15, 10, 10, 10, 12]], expected: 48 },

  { input: [[3, 2]], expected: 3 },
  { input: [[1]], expected: 1 },
  { input: [[2, 5, 1]], expected: 5 },
];

function biggestSnatch(nums) {
  if (!nums.length) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }

  console.log('Nums:', nums, '\n');

  const dp = [nums[0], nums[1]];
  let max = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // console.log('Current:', nums[i]);
    // console.log('Prev - 1:', dp[i - 2]);
    // console.log('Prev - 2:', dp[i - 3]);
    // console.log('dp:', dp);

    if (!dp[i - 3]) {
      dp[i] = nums[i] + dp[i - 2];
    } else {
      dp[i] = nums[i] + Math.max(dp[i - 3], dp[i - 2]);
    }

    if (dp[i] > max) {
      max = dp[i];
    }
  }

  console.log(dp);
  console.log(max);

  return max;
}

const { input, expected } = testCases[0];

console.log('Expected:', expected, 'Received:', biggestSnatch(...input));

// const {test} = require('../utils/test');

// test(biggestSnatch, testCases);