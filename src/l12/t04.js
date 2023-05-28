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
