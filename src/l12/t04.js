/**
 * Дано два рядки ransomNote та magazine, поверніть TRUE якщо ransomNote може
 * бути складена з рядка magazine та FALSE якщо це неможливо.
 *
 * Кожен символ у рядку magazine може бути використаний
 * рівно один раз у ransomNote.
 *
 * Приклад:
 * Input: "ransom", "man or sort"
 * Output: true
 * Всі букви з "ransom" точно присутні в рядку "man or sort"
 * і можуть бути використані
 */

const { test } = require("../utils/test");

const testCases = [
  { input: ["aa", "aab"], expected: true },
  { input: ["aa", "ab"], expected: false },
  { input: ["ransom", "man or sort"], expected: true },
  { input: ["ransom", "man and sot"], expected: false },
  { input: ["RanSom", "man or soRt"], expected: false },
  { input: ["RanSom", "man or SoRt"], expected: true },
  { input: ["Ran  Som", "man or SoRt"], expected: true },
  { input: ["Ran  So m", "man or SoRt"], expected: false },
  { input: ["Poke", "OK that is Poke"], expected: true },
  { input: ["a", "b"], expected: false },
  { input: ["qwertyuiop", "poiqwerytuueq"], expected: true },
  { input: ["poiqwerytuueq", "qwertyuiop"], expected: false },
];

function isMurderNotePossible(ransomNote, magazine) {
  const dict = new Map();
  for (let char of magazine) {
    const count = dict.get(char) ?? 0;
    
    dict.set(char, count + 1);
  }

  // console.log(dict);

  for (let char of ransomNote) {
    // if (char === ' ') {
    //   continue;
    // }

    const charCount = dict.get(char);

    if (!charCount) {
      // console.log('FAILED ON CHAR:', char);
      // console.log('DICT:', dict);

      return false;
    }

    if (charCount > 1) {
      dict.set(char, charCount - 1);
    } else {
      dict.delete(char);
    }
  }

  // console.log(dict);

  return true;
}

test(isMurderNotePossible, testCases);

// const { input, expected } = testCases[7];

// console.log('Expected:', expected, 'Received:', isMurderNotePossible(...input));
