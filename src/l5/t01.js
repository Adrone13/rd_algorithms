/**
 * Дано масив цілих унікальних чисел arr, відсортований за зростанням
 * Масив розміром N, для кожного елемента якого виконується 1 <= arr[i] <= N
 *
 * Один елемент видалили з масиву -- знайдіть відсутній елемент.
 *
 * Приклад:
 * input: arr = [1, 2, 3, 4, 5, 7]
 * output: 6
 */

const { test } = require('../utils/test');

function findMissingItemLinear(arr) {
  if (arr[0] !== 1) {
    return 1;
  }
  if (arr[arr.length - 1] !== arr.length + 1) {
    return arr.length + 1;
  }

  for (let i = 0; i < arr.length; i++) {
    const currItem = arr[i];
    const nextItem = arr[i + 1];

    if (currItem + 1 !== nextItem) {
      return currItem + 1;
    }
  }
}

const binarySearch = (arr, elementToSearch) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      // if middle is search value - return it right away
      if (arr[mid] === elementToSearch) {
          return mid;

      } else if (arr[mid] < elementToSearch) {
          // if middle is LESS
          // move to the RIGHT part of array
          left = mid + 1;

      } else if (arr[mid] > elementToSearch) {
          // if middle is BIGGER
          // move to the LEFT part of array
          right = mid - 1;
      }
  }

  return -1;
}


// [1, 2, 3, 5, 6, 7]
//        *
// [1, 2, 3, 5, 6, 7]
// mid (2) === 3 - 1 = true
//              *
// [1, 2, 3, 5, 6, 7]
// mid (4) === 6 - 1 = false
// mid = (3 + 4) / 2 = 3
//           *
// [1, 2, 3, 5, 6, 7]
// mid (3) === 5 - 1 false
// right = 3
function findMissingItemBinary(arr) {
  if (arr[0] !== 1) {
    return 1;
  }
  if (arr[arr.length - 1] !== arr.length + 1) {
    return arr.length + 1;
  } else {}

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      console.log('Mid:', mid);
      console.log('Mid value:', arr[mid]);

      if (mid === arr[mid] - 1) {
        if (arr[mid] + 1 !== arr[mid + 1]) {
          console.log('Found next:', arr[mid] + 1);

          return arr[mid] + 1;
        }

        left = mid + 1;

        console.log('Moving right', `left = ${left}, right = ${right}`);
      } else {
        if (arr[mid] - 1 !== arr[mid - 1]) {
          console.log('Found prev:', arr[mid] - 1);

          return arr[mid] - 1;
        }

        console.log('Moving left')

        right = mid - 1;

        console.log('Moving right', `left = ${left}, right = ${right}`);
      }
  }

  return -1;
}

const testCases = [
  // { input: [[1, 2, 3, 5, 6, 7]], expected: 4 },
  // { input: [[2, 3, 4, 5]], expected: 1 },
  // { input: [[1, 2, 3, 4, 5, 6]], expected: 7 },
  { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]], expected: 13 },
  // { input: [[1, 3, 4, 5, 6, 7]], expected: 2 },
  // { input: [[1]], expected: 2 },
  // { input: [[2]], expected: 1 },
];

// const { input, expected } = testCases[0];

// console.log('Expected:', expected, 'Received:', findMissingItem(input[0]));

test(findMissingItemBinary, testCases);
