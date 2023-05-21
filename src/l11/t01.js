const { arrayToTree } = require('../utils/array-to-tree');
const { test } = require('../utils/test');

/**
 * Дано бінарне дерево пошуку з цілими значеннями і два числа - from & to.
 * Потрібно повернути суму всіх елементів, які є в дереві і потрапляють в діапазон [from; to] (включно).
 *
 * Note: у тестах дерево задано через масив, але на вхід дається ВУЗОЛ, а саме - корінь дерева.
 * Структура вузла наступна:
 * Node {
 *  int data;
 *  Node left;
 *  Node right
 * }
 *
 */

function sumByOrder(node, from, to, sum = 0) {
  if (node !== null) {
    if (node.data >= from && node.data <= to) {
      sum += node.data;
    }

    sum = sumByOrder(node.left, from, to, sum);
    sum = sumByOrder(node.right, from, to, sum);
  }

  return sum;
}

function sumLevelByLevel(root, from, to) {
  console.log('Root:', root);
  console.log('From', from, 'To', to);
  // visiting nodes level by level
  if (root == null) {
      return;
  }

  let sum = 0;

  // storing child nodes here
  const nodes = [];
  nodes.push(root);

  // visiting all of nodes left in queue
  while (nodes.length > 0) {
      const node = nodes.shift();

      console.log(node.data);

      if (node.data >= from && node.data <= to) {
        sum += node.data;
      }

      // adding child nodes to the queue (they will be last)
      if (node.left != null) {
          nodes.push(node.left);
      }

      if (node.right != null) {
          nodes.push(node.right);
      }
  }

  process.stdout.write("\n");

  return sum;
}

const testCases = [
  {
    input: [arrayToTree([1, 2, 3]), 1, 3],
    expected: 6
  },
  {
    input: [arrayToTree([15, 10, 17, 4, 13, 16, 20, null, 6, null, null, null, null, 19, 22]), 16, 20],
    expected: 72
  },
  {
    input: [arrayToTree([15, 10, 17, 4, 13, 16, 20, null, 6, null, null, null, null, 19, 22]), 16, 21],
    expected: 72
  },
  {
    input: [arrayToTree([15, 10, 17, 4, 13, 16, 20, null, 6, null, null, null, null, 19, 22]), 17, 21],
    expected: 56
  },
  {
    input: [arrayToTree([15, 10, 17, 4, 13, 16, 20, null, 6, null, null, null, null, 19, 22]), 0, 12],
    expected: 20
  },
];

test(sumByOrder, testCases);

// const { input, expected } = testCases[2];
// const [ node, from, to ] = input;

// console.log('Node', node)
// console.log('Children left', node.left)
// console.log('Children right', node.right)
// console.log('From', from)
// console.log('To', to);
// console.log('Expected', testCases[0].expected)

// const res = sumByOrder(node, from, to);

// console.log('Expected:', expected, 'Received:', res);

