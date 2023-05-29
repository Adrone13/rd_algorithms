/**
 * Дано масив nums цілих чисел довжиною N.
 * Всі числа в nums лежать в діапазоні [1, N]
 * Кожне число зустрічається один або два рази.
 *
 * Потрібно знайти та повернути список чисел, які зустрічаються двічі.
 *
 * Числа можна повернути в будь-якому порядку.
 *
 * Умова: алгоритм має працювати за час O(n).
 * Додаткова умова (можете написати іншою функцією): алгоритм повинен працювати за час O(n)
 * і використовувати O(1) додаткової пам'яті.
 */

const testCases = [
  //         12 11 18 23 16       9
  { input: [[4, 3, 2, 7, 8, 2, 3, 1]], expected: [2, 3] },
  { input: [[1, 1, 2]], expected: [1] },
  { input: [[4, 3, 2, 7, 6, 3, 1]], expected: [3] },
  { input: [[5, 2, 3, 4, 1]], expected: [] },
  { input: [[9, 5, 6, 3, 2, 5, 1, 4, 8, 6, 4, 9, 1, 2]], expected: [1, 2, 4, 5, 6, 9] },
];

function findDuplicates(nums) {
  const counter = new Map();
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const numCounter = counter.get(currentNum) ?? 0;

    counter.set(currentNum, numCounter + 1);
  }

  console.log(counter);

  for (let [num, count] of counter) {
    if (count > 1) {
      result.push(num);
    }
  }

  return result.sort((a, b) => a - b);
}

function findDuplicatesO1(nums) {
  // console.log(nums, nums.length);

  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const index = nums[i] % n;
    // console.log('I:', i, 'Index:', index, 'Value:', nums[nums[i] % n], '+', n);

    nums[index] += n;
  }

  const result = [];

  for (let i = 0; i < n; i++) {
    if (nums[i] / 2 > n) {
      result.push(i);
    }
  }
  
  return result;
}

const { test } = require('../utils/test');

test(findDuplicatesO1, testCases);

// const { input, expected } = testCases[0];

// console.log('Expected:', expected, 'Received:', findDuplicatesO1(...input));
