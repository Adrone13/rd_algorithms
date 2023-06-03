/**
 * Вам дано масив цілих чисел nums, знайдіть підмасив (що містить як мінімум 1
 * число) який має найбільшу суму та поверніть суму.
 *
 * Підмасив - це безперервна частина масиву.
 * Наприклад, для масиву [1,2,3,4], масив [2,3] є підмасивом, але [2,4] не є,
 * тому що це не безперервна частина масиву.
 *
 * Приклад
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Пояснення: [4,-1,2,1] має найбільшу суму = 6.
 *
 * Обмеження:
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 */

const testCases = [
  {
    input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
    expected: 6
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[5, 4, -1, 7, 8]],
    expected: 23
  },
  {
    input: [[8, 2, 3]],
    expected: 13
  },
  {
    input: [[8, -2]],
    expected: 8
  },
  {
    input: [[-8, -2]],
    expected: -2
  },
];

function findLargestSubarray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    console.log(currentSum, nums[i], maxSum);

    currentSum = currentSum > 0 ? currentSum + nums[i] : nums[i];

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
}

const { input, expected } = testCases[0];
