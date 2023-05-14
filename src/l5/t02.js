const _ = require('lodash');
const { test } = require('../utils/test');

/**
 * Дано однозвʼязаний список, в якому (для простоти) є тільки цілі числа.
 * Треба визначити чи є цикл в цьому списку.
 * Циклом ми називаємо множину елементів які формують "кільце"
 * Наприклад:
 * 1 -> 2 -> 3 -> 4 -> 5
 * .....|--------------|
 *
 * Тут елемент (5) вказує знову на елемент (2) і створує цикл таким чином.
 *
 * На вход дається обʼєкт Node (val, next).
 * Функція має повернути TRUE якщо цикл існує, або FALSE якщо його немає.
 *
 * Доповнювати структуру Node неможна, так само як змінювати значення елементів.
 * Відомо, що ця структура даних може бути дуже великою, тому рішення має
 * працювати без додаткової памʼяті.
 *
 * Майте на увазі, що приклади містять числа упорядковані тільки для кращої
 * візуалізації, упорядкованість даних НЕ гарантується.
 */

function isCircular(node) {
  let slow = node.next;
  let fast = node.next.next;

  while (fast !== null && fast.next !== null) {
    console.log('slow:', slow.val, 'fast:', fast.val);

    if (slow === fast) {
      break;
    }

    slow = slow.next;
    fast = fast.next.next;
  }

  if (slow !== fast) {
    return null;
  }

  slow = node;
  console.log('slow:', slow, 'fast:', fast);
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
    console.log('slow:', slow, 'fast:', fast);
  }

  return slow;
}

const makeNode = (val, prevNode = null) => {
  const node = { val, next: null };
  if (prevNode) {
      prevNode.next = node;
  }
  return node;
}
const n1 = makeNode(1);
const n2 = makeNode(2, n1);
const n3 = makeNode(3, n2);
const n4 = makeNode(4, n3);
const n5 = makeNode(5, n4);

// n1 -> n2 -> n3 -> n4 -> n5
const nodes = [n1, n2, n3, n4, n5];

const nodes1 = _.cloneDeep(nodes); nodes1[4].next = nodes1[1];
const nodes2 = _.cloneDeep(nodes);
const nodes3 = _.cloneDeep(nodes); nodes3[4].next = nodes3[0];
const nodes4 = _.cloneDeep(nodes); nodes4[4].next = nodes4[4];

// const a1 = makeNode(10);
// const a2 = _.cloneDeep(a1); a2.next = a2;

const testCases = [
  { input: [nodes1[0]], expected: nodes1[1] },
  // { input: [nodes2[0]], expected: null },
  // { input: [nodes3[0]], expected: nodes3[0] },
  // { input: [nodes4[0]], expected: nodes4[4] },
  // { input: [a1], expected: false },
  // { input: [a2], expected: true }
];

test(isCircular, testCases);
