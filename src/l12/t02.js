/**
 * Дано два рядки S і T.
 * Рядок T згенеровано випадковою перестановкою букв у рядку S, потім одна
 * додаткова буква додана до випадкового місця (позиції).
 *
 * Потрібно знайти та повернути букву, яка була додана.
 *
 * Приклад
 * Input: s = "abcd", t = "acbed"
 * Output: "e"
 */

const testCases = [
  { input: ["abde", "debca"], expected: 'c' },
  { input: ["abde", "xdeba"], expected: 'x' },
  { input: ["abde", "dabew"], expected: 'w' },
  { input: ["aabbde", "adabelb"], expected: 'l' },
  // a { 'a' => 2, 'b' => 2, 'd' => 1, 'e' => 1 }
  // d { 'a' => 1, 'b' => 2, 'd' => 1, 'e' => 1 }
  // a { 'a' => 1, 'b' => 2, 'd' => null, 'e' => 1 }
  // b { 'a' => null, 'b' => 2, 'd' => null, 'e' => 1 }
  // e { 'a' => null, 'b' => 1, 'd' => null, 'e' => 1 }
  // d { 'a' => null, 'b' => 1, 'd' => null, 'e' => null }
  { input: ["aabbde", "adabedb"], expected: 'd' },

  // a { 'a' => 2, 'b' => 2, 'd' => 1, 'e' => 1 }
  // d { 'a' => 1, 'b' => 2, 'd' => 1, 'e' => 1 }
  // a { 'a' => 1, 'b' => 2, 'd' => null, 'e' => 1 }
  // b { 'a' => null, 'b' => 2, 'd' => null, 'e' => 1 }
  // e { 'a' => null, 'b' => 1, 'd' => null, 'e' => 1 }
  // f { 'a' => null, 'b' => 1, 'd' => null, 'e' => null }
  { input: ["aabbde", "adabefb"], expected: 'f' },
];

function findAddedChar(s, t) {
  const initialStringCharCount = new Map();
  const modifiedStringCharCount = new Map();

  for (let char of s) {
    const count = initialStringCharCount.get(char) ?? 0;
    
    initialStringCharCount.set(char, count + 1);
  }

  for (let char of t) {
    const count = modifiedStringCharCount.get(char) ?? 0;
    
    modifiedStringCharCount.set(char, count + 1);
  }

  for (let [char, count] of modifiedStringCharCount) {
    const initialCount = initialStringCharCount.get(char);

    if (initialCount !== count) {
      return char;
    }
  }
}

function findAddedCharAlternative(s, t) {
  const originalStringCodeSum = s.split('').reduce((a, c) => a + c.charCodeAt(), 0);
  const modifiedStringCodeSum = t.split('').reduce((a, c) => a + c.charCodeAt(), 0);

  return String.fromCharCode(modifiedStringCodeSum - originalStringCodeSum);
}

function findAddedCharOptimized(s, t) {
  const initialStringCharCount = new Map();

  for (let char of s) {
    const count = initialStringCharCount.get(char) ?? 0;
    
    initialStringCharCount.set(char, count + 1);
  }

  for (let char of t) {
    const count = initialStringCharCount.get(char);

    if (!count) {
      return char;
    }

    if (count > 1) {
      initialStringCharCount.set(char, count - 1);
    } else {
      initialStringCharCount.delete(char);
    }
  }
}


const {test} = require('../utils/test')

test(findAddedCharOptimized, testCases);

const { input, expected } = testCases[4];

// console.log('Expected:', expected, 'Received:', findAddedCharOptimized(...input));
