/**
 * Дано бінарне дерево, перевірити чи є воно бінарним деревом пошуку.
 *
 * Note: у тестах дерево задано через масив, але на вхід дається ВУЗОЛ, а саме - корінь дерева.
 * Структура вузла така:
 * Node {
 *   int data
 *   Node left;
 *   Node right
 * }
 */

const { test } = require('../utils/test');
const { arrayToTree } = require('../utils/array-to-tree');

function isBstWrong(root) {
  // visiting left node recursively
  // visiting current node
  // visiting right node recursively
  if (node != null) {
    console.log('Current node:', node.data);
    console.log('Left node:', node.left?.data, 'Right node:', node.right?.data);

    if (node.left && node.left.data >= node.data || node.right && node.right.data <= node.data) {
      return false;
    }

    if (!traverseInOrderRecursive(node.left) || !traverseInOrderRecursive(node.right)) {
      return false;
    }
  }

  return true;
}

function findSmallestValueRecursive(root) {
  // moving left as much as possible. last element is smallest
  return root.left == null ? root.value : findSmallestValueRecursive(root.left);
}

function findGreatestValueRecursive(root) {
  // moving right as much as possible. last element is greatest
  return root.right == null ? root.value : findGreatestValueRecursive(root.right);
}


function isBstValid(root, rangeMin = Number.MIN_SAFE_INTEGER, rangeMax = Number.MAX_SAFE_INTEGER) {
  if (root === null) {
    return true;
  }

  console.log('Current node:', root.data, 'min', rangeMin, 'max', rangeMax, root.data <= rangeMin || root.data >= rangeMax);

  if (root.data <= rangeMin || root.data >= rangeMax) {
    console.log('Failed value', root.data);

    return false;
  }

  const isLeftValid = isBstValid(root.left, rangeMin, root.data);
  if (!isLeftValid) {
    return false;
  }

  const isRightValid = isBstValid(root.right, root.data, rangeMax);
  if (!isRightValid) {
    return false;
  }

  return true;
}


const testCases = [
  //       3
  //   2       5
  // 1   2  4    6
  { input: [arrayToTree([3, 2, 5, 1, 45, 4, 6])], expected: false },

  //       3
  //   1       4
  // 3   _   1   5
  // { input: [arrayToTree([3, 1, 4, 3, null, 1, 5])], expected: false },
  // //      1
  // //           3
  // //         2   7
  // { input: [arrayToTree([1, null, 3, null, null, 2, 7])], expected: true },
  // { input: [arrayToTree([1])], expected: true },
  // //   1
  // // 2   3
  // { input: [arrayToTree([1, 2, 3])], expected: false },
  // //   2
  // // 1   3
  // { input: [arrayToTree([2, 1, 3])], expected: true },
  // //       5
  // //   1       4
  // //         3   6
  // { input: [arrayToTree([5, 1, 4, null, null, 3, 6])], expected: false },
];

test(isBstValid, testCases);
