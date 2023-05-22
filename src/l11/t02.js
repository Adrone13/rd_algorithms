/**
 * Дано бінарне дерево (НЕ ПОШУКУ).
 * Повернути кількість "хороших" вузлів у ньому.
 *
 * "Гарним" вузлом вважається такий вузол,
 * значення якого більше або дорівнює за всі значення вузлів
 * які знаходяться на шляху від кореня до цього вузла.
 *
 * Приклад дерева
 *                (3)
 *          1              (4)
 *     (3)              1       (5)
 * Output: 4
 * Вузли виділені дужками у прикладі є "хорошими" вузлами.
 * Наприклад, для вузла (5) справедлива умова, оскільки вузли шляхом від кореня щодо нього - [3, 4] мають значення менше.
 *
 * Note: у тестах дерево задано через масив, але на вхід дається ВУЗОЛ, а саме - корінь дерева.
 * Структура вузла наступна:
 * Node {
 *   int data;
 *   Node left;
 *   Node right
 * }
 */

const { arrayToTree } = require("../utils/array-to-tree");
const { test } = require("../utils/test");

function traverseInOrderRecursive(node, path = [], result = 0) {
  if (node != null) {
    if (path.every(i => i <= node.data)) {
      result += 1;
    }

    path.push(node.data);

    result = traverseInOrderRecursive(node.left, path, result);
    result = traverseInOrderRecursive(node.right, path, result);

    path.pop();
  }

  return result;
}

function findGoodNodes(node, biggestInPath = 0, result = 0) {
  if (node != null) {
    if (node.data >= biggestInPath) {
      result += 1;
      biggestInPath = node.data;
    }

    result = findGoodNodes(node.left, biggestInPath, result);
    result = findGoodNodes(node.right, biggestInPath, result);    
  }

  return result;
}

const testCases = [
  //             (5)
  //       1              (4)
  //   3               1       (5)
  { input: [arrayToTree([5, 1, 4, 3, null, 1, 5])], expected: 2 },
  //             (3)
  //       1              (4)
  //  (3)              1       (5)
  { input: [arrayToTree([3, 1, 4, 3, null, 1, 5])], expected: 4 },
  //       (1)
  //    (2)     (3)
  // (4)  (5) (6)  (7)
  { input: [arrayToTree([1, 2, 3, 4, 5, 6, 7])], expected: 7 },
  //      (7)
  //   6       5
  // 4   3   2   1
  { input: [arrayToTree([7, 6, 5, 4, 3, 2, 1])], expected: 1 },
  //        (3)
  //    (3)
  // (4)   2
  { input: [arrayToTree([3, 3, null, 4, 2])], expected: 3 },
  //             (4) 
  //      (6)               3
  //   3              (4)      (5)
  { input: [arrayToTree([4, 6, 3, 3, null, 4, 5])], expected: 4 },
];

test(findGoodNodes, testCases);
