/**
 * Warmup task :)
 *
 * Дано рядок, представлений як масив символів. Зробіть реверс порядку слів.
 *
 * Слово - це послідовність символів без пробілу. Слова відокремлені одне від одного завжди одним пробілом.
 *
 * Поверніть рядок, що складається зі слів у зворотному порядку, розділених одиночними пробілами.
 * Алгоритм повинен працювати за O(n) часу і НЕ використовувати вбудовані функції як split(), join(), reverse(), StringBuffer, etc.
 *
 * Додаткова умова: Так само, алгоритм повинен працювати in-place (після обробки поверніть той же chars щоб дотриматися сигнатури),
 * тобто не витрачати додаткову пам'ять зовсім (новий масив для символів вже є додатковою пам'яттю, так як і трансформація масиву символів до рядку)
 *
 * Можливі символи: [a-z], [A-Z] та пробіли.
 *
 * Приклад:
 * Input: s = "last task in course"
 * Output: "course in task last"
 */

const { test } = require("../utils/test");


const testCases = [
  {
    input: ["last course".split('')],
    expected: "course last".split('')
  },

  {
    input: ["last task in course".split('')],
    expected: "course in task last".split('')
  },
  {
    input: ["I love algo".split('')],
    expected: "algo love I".split('')
  },
  {
    input: ["singlewordhere".split('')],
    expected: "singlewordhere".split('')
  },
  {
    input: ["a b c d e f g".split('')],
    expected: "g f e d c b a".split('')
  }
];

let iterations = 0;

function reverseSentence(chars) {
  reverse(chars, 0, chars.length - 1);
  
  let wordStart = 0;

  for (let i = 0; i < chars.length + 1; i++) {
    const char = chars[i];

    if (char === ' ' || i === chars.length) {
      reverse(chars, wordStart, i - 1);
      wordStart = i + 1;
    }
  }

  return chars;
}

function reverse(array, from, to) {
  let left = from;
  let right = to;

  while (left < right) {
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;

    left++;
    right--;
  }

  return array;
}

// const { input, expected } = testCases[4];

// console.log('Expected:', expected, 'Received:', reverseSentence(...input));
// console.log('N:', input[0].length);
// console.log('Iterations:', iterations);

test(reverseSentence, testCases);
