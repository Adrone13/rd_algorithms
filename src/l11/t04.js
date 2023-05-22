/**
 * Є система для поїздок таксі. Ця система вміє надсилати нам події, коли подорож завершена.
 * Разом з подією ми отримуємо довжину поїздки (в кілометрах, завжди заокруглена до цілої кількості).
 * Наша система має вміти віддавати K найкоротші поїздки в будь-який момент часу.
 *
 * Система повинна вміти обробляти 2 типи запитів:
 * Запит #1: відбулася поїздка довжиною Х кілометрів
 * Запит #2: повернути K найкоротших поїздок на даний момент, в порядку зростання.
 *
 * Поїздки які були повернуті на запит #2 більше не приймають участь в наступних операціях (тобто, їх "забрали").
 *
 * Запити задаються як масив, де першим значенням буде ключ запиту.
 * У випадку запиту #1 буде також вказана довжина поїздки другим елементом масиву.
 *
 * Значення K задається лише на початку.
 * Значення запитів у вхідних даних завжди є валідними.
 *
 * Приклад запитів:
 * [1, 54] - означає що відбулася поїздка та її дистанція дорівнює 54 кілометрам
 * [2] - означає що потрібно повернути K найкоротших поїздок на цей момент, в порядку зростання (якщо всього поїздок менше, повернути ті що є)
 *
 * Порядок запитів може бути різним.
 * Оскільки всі команди передаються відразу у вигляді списку, повернути потрібно лише результат усіх операцій у правильному порядку.
 * Приклад input:
 * K = 3, requests = [[1, 54], [1, 32], [2], [1, 85], [1, 4], [1, 5], [1, 22], [1 , 2], [2]]
 * Приклад output:
 * [[32, 54], [2, 4, 5]]
 */

const { BinarySearchTree, AVLTree, BinaryHeap } = require('../structures');

function processRequests(k, requests) {
  const responses = [];
  const trips = new BinarySearchTree();

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const [requestType, requestParam] = request;

    if (requestType === 1) {
      trips.add(requestParam);

      trips.traverseInOrder();
    } else {
      const response = [];

      for (let j = 0; j < k; j++) {
        const val = trips.findSmallestValue();
        if (!val) {
          break;
        }
        trips.delete(val);
        response.push(val);
      }

      responses.push(response);
    }
  }

  return responses;
}

function processRequestsAVL(k, requests) {
  const responses = [];
  const trips = new AVLTree();

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const [requestType, requestParam] = request;

    if (requestType === 1) {
      trips.insert(requestParam);

      trips.printTree();
    } else {
      const response = [];

      for (let j = 0; j < k; j++) {
        const val = trips.findSmallestValue();
        console.log('Shortest trip', val);

        if (!val) {
          break;
        }
        trips.delete(val);
        response.push(val);
      }

      responses.push(response);
    }
  }

  return responses;
}

function processRequestsBinaryHeap(k, requests) {
  const responses = [];
  const trips = new BinaryHeap();

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
    const [requestType, requestParam] = request;

    if (requestType === 1) {
      trips.add(requestParam);

      trips.print();
    } else {
      const response = [];

      for (let j = 0; j < k; j++) {
        const val = trips.remove();

        trips.print();

        if (!val) {
          break;
        }

        response.push(val);
      }

      responses.push(response);
    }
  }

  return responses;
}

const testCases = [
  {
    input: [3, [[1, 54], [1, 32], [2], [1, 85], [1, 4], [1, 5], [1, 22], [1, 2], [2]]],
    expected: [[32, 54], [2, 4, 5]]
  },
  {
    input: [2, [[2], [1, 54], [1, 32], [1, 85], [1, 4], [2], [1, 5], [2]]],
    expected: [[], [4, 32], [5, 54]]
  },
];

const { test } = require('../utils/test');

test(processRequestsBinaryHeap, testCases);
