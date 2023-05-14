/**
 * Рядок з дужками вважається правильним якщо:
 * - Це порожній рядок
 * - Він може бути записаний як AB (А з'єднаний з В), де А і В є правильними
 * - Він може бути записаний як (А), де А є правильним
 *
 * Дано рядок S. За одну операцію ви можете вставити дужку на будь-яку позицію у
 * рядку.
 * Наприклад, якщо s = "()))", ви можете вставити відкриваючу дужку і отримати
 * "(()))", або закриваючу і отримати "())))".
 *
 * Порахуйте мінімальну кількість операцій потрібних щоб зробити рядок S
 * правильним
 *
 * Приклад:
 * Input: s = "())"
 * Output: 1
 * Приклад 2:
 * Input: s = "))(())(("
 * Output: 4, бо треба додати 2 "(" з початку, та 2 ")" в кінці
 */


const { Stack } = require('../structures');
const { test } = require('../utils/test');

function calculateBracketInsertions(str) {
  const array = [str[0]];

  for (let i = 1; i < str.length; i++) {
    const currPar = str[i];
    const lastPar = array[array.length - 1]

    // console.log(array);
    // console.log('Current par:', currPar, 'Last saved par:', array[array.length - 1]);

    if (currPar === ')' && lastPar === '(') {
      array.pop();
    } else {
      array.push(currPar);
    }
  }

  return array.length;
}

function calculateBracketInsertionsStack(str) {
  const pars = new Stack();

  pars.push(str[0]);

  for (let i = 1; i < str.length; i++) {
    const currPar = str[i];
    const lastPar = pars.peek();

    if (currPar === ')' && lastPar === '(') {
      pars.pop();
    } else {
      pars.push(currPar);
    }
  }

  return pars.size();
}

function calculateBracketInsertionsStackRec(str, pars = new Stack(), index = 1) {
  if (index === 1) {
    pars.push(str[0]);
  }

  const currPar = str[index];
  const lastPar = pars.peek();

  if (currPar === ')' && lastPar === '(') {
    pars.pop();
  } else {
    pars.push(currPar);
  }

  if (index === str.length - 1) {
    return pars.size();
  }

  return calculateBracketInsertionsStackRec(str, pars, index + 1);
}

function calculateBracketInsertionsStackRecProper(str, i = 1, lastPar = null, acc = 1) {
  if (i === 1) {
    lastPar = str[0];
  }
  if (i === str.length) {
    return acc;
  }

  console.log(lastPar);

  if (str[i] === ')' && lastPar === '(') {
    return calculateBracketInsertionsStackRecProper(str, i + 1, str[i], acc - 1);
  }
}

console.log(calculateBracketInsertionsStack("(((((("));

const testData = [
  { input: ["())"], expected: 1 },
  { input: ["((("], expected: 3 },
  { input: ["(()"], expected: 1 },
  { input: [")))((("], expected: 6 },
  { input: ["()))(("], expected: 4 },
  { input: ["()"], expected: 0 },
  { input: ["()))()(()()("], expected: 4 },
];

// test(calculateBracketInsertionsStack, testData);
