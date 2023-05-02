/**
 * Дано закодований рядок, поверніть розкодований рядок.
 *
 * Правильно кодування наступне: k[encoded_str], де encoded_str усередині
 * квадратних дужок повторюється рівно k разів.
 * k гарантовано позитивне число.
 *
 * Ви можете бути впевнені, що вхідний рядок завжди валідний;
 * там немає зайвих пробілів, квадратні дужки правильно стоять, ітд
 *
 * Більше того, ви можете бути впевнені, що оригінальний рядок не містить чисел
 * та числа використовуються тільки для повторень (k).
 * Тобто числа тільки вказують на кількість повторень закодованої частини.
 * Наприклад, не може бути вхідного рядка як "3a" або "2[4]".
 *
 * Приклад:
 * Input: s = "3[a]2[bc]"
 * Output: "aaabcbc"
 *
 * Додатково: в цьому завданні важливо зробити саме гарне рекурсивне рішення для максимального балу.
 */

const { test } = require('../utils/test');

function decodeRecStack(str, i = 0, stack = []) {
  if (i === str.length) {
    return stack[0];
  }

  const currChar = str[i];

  // if char is number
  if (!isNaN(parseInt(currChar, 10))) {
    stack.push(currChar);
  }
  // if char is letter
  if (/[a-z]/.test(currChar)) {
    const lastChar = stack[stack.length - 1];

    if (lastChar && /[a-z]/.test(lastChar)) {
      stack.pop();
      stack.push(lastChar + currChar);
    } else {
      stack.push(currChar);
    }
  }
  if (currChar === ']') {
    const lastChar = stack.pop();
    const lastNum = stack.pop();

    let subStr = '';

    for (let i = 0; i < lastNum; i++) {
      subStr += lastChar;
    }

    if (stack.length !== 0 && /[a-z]/.test(stack[stack.length - 1][0])) {
      subStr = stack[stack.length - 1] + subStr;
      stack.pop();
      stack.push(subStr);
    } else {
      stack.push(subStr);
    }
  }
  console.log();

  return decodeRecStack(str, i + 1, stack);
}

const isAlphabetChar = (char) => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122;
const isNumberChar = (char) => !isNaN(parseInt(char, 10));

function decodeRec(input) {
  function decode(str, index = 0, result = '') {
    let num = '';

    while (str[index] !== ']' && index < str.length) {
      // Saving current num
      if (isNumberChar(str[index])) {
        num += str[index];
      }
      // Saving current alpha
      if (isAlphabetChar(str[index])) {
        result += str[index];
      }
      // Calling decode recursively
      if (str[index] === '[') {
        const [decodedSubStr, nestedIndex] = decode(str, index + 1, '');

        index = nestedIndex;

        for (let n = 0; n < parseInt(num, 10); n++) {
          result += decodedSubStr
        }

        num = '';
      }

      index++;
    }

    return [result, index];
  }

  const [result] = decode(input);

  return result;
}

const testCases = [
  { input: ["3[a]2[bc]"], expected: "aaabcbc" },
  { input: ["3[a2[c]]"], expected: "accaccacc" },
  { input: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" },
  { input: ["ro2[bot]dr4[e]ams"], expected: "robotbotdreeeeams" },
  { input: ["qwe2[asd3[w2[e]]]"], expected: "qweasdweeweeweeasdweeweewee" },
  { input: ["10[a]2[bc]"], expected: "aaaaaaaaaabcbc" },
];

test(decodeRec, testCases);

