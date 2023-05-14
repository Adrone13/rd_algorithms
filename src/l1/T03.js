const testArrays = [
  { input: [1, 1, 1], expected: 3 },
  { input: [1, 2, 1], expected: 2 },
  { input: [-3], expected: 0 },
  { input: [-3, -2, 10], expected: 0 },
  { input: [-3, -2, -5], expected: 4 },
  { input: [1, 5, 90, 0], expected: 91 },
  { input: [1, 0, 5, 4, 90, 0], expected: 95 }
];

function calcOperations(nums) {
  if (nums.length < 2) {
    return 0;
  }

  let opSum = 0;

  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i - 1] - nums[i];

    console.log(nums[i], '-', nums[i - 1], '=', diff)

    if (diff >= 0) {
      opSum += diff + 1;
      nums[i] = nums[i] + diff + 1;
    }
  }

  return opSum;
}

console.log(calcOperations(testArrays[4].input));