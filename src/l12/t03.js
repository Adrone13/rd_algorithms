/**
 * Дано pattern та рядок str.
 * Поверніть TRUE якщо рядок str "слідує" заданому шаблону pattern, інакше
 * поверніть FALSE.
 *
 * "Слідує" -- означає що є збіг послідовностей,
 * тобто бієкцію між літерами рядку pattern і словами в рядку str.
 *
 * Слова в str завжди розділені одним пробілом.
 * Символи в pattern йдуть один за одним.
 *
 * str і pattern можуть містити тільки символи [a-z]
 * (тоді як str ще містить пробіли)
 *
 * Також, str.length > pattern.length
 *
 * Приклад:
 * Input: pattern = 'abba', str = 'robot dream dream robot'
 * Output: true
 * Пояснення: в цьому прикладі шаблон виконується, бо
 * ми можемо співставити його до рядку таким чином що a = robot, b = dream
 *
 * Приклад 2:
 * Input: pattern = 'abcbc', str = 'bot makes word makes dream'
 * Output: FALSE
 * Пояснення: повного збігу немає, бо в шаблоні 'c' зустрічається 2 рази,
 * тоді як в рядку цим символам не можна співставити одне і
 * те ж слово (word != dream).
 */

const testCases = [
  { input: ["jquery", "jquery"], expected: false },
  { input: ["abba", "robot dream dream robot"], expected: true },
  { input: ["abcbc", "bot makes word makes dream"], expected: false },
  { input: ["abcbc", "bot makes word makes word"], expected: true },
  { input: ["qabcbc", "q bot makes word makes word"], expected: true },
  { input: ["qabcbc", "q bot makes words makes word"], expected: false },
  { input: ["abba", "bot bot bot bot"], expected: false },
  { input: ["abcbc", "a b d b c"], expected: false },
];

function testString(pattern, str) {
  const matchedWords = new Map();
  const usedPatternChars = new Set();
  
  let currentWord = '';
  let wordCount = 0;

  for (let i = 0; i <= str.length; i++) {
    const char = str[i];

    if (char === ' ' || i === str.length) {
      const currentPattern = pattern[wordCount];
      const matchedPattern = matchedWords.get(currentWord);

      // Current word was already met but its position does not match the pattern OR
      // Current word was not met but its matching pattern was processed
      if (
        (matchedPattern && currentPattern !== matchedPattern) ||
        (!matchedPattern && usedPatternChars.has(currentPattern))
      ) {
        return false;
      }

      // Add word pattern match
      matchedWords.set(currentWord, currentPattern);
      // Add processed pattern
      usedPatternChars.add(currentPattern);
      // Reset current word
      currentWord = '';
      // Increment word counter
      wordCount++;
    } else {
      currentWord += char;
    }
  }

  if (pattern.length !== wordCount) {
    return false;
  }

  return true;
}

function testStringUpdated(pattern, str) {
  const matchedPatterns = new Map();
  const usedWords = new Set();
  
  let currentWord = '';
  let wordCount = 0;

  for (let i = 0; i <= str.length; i++) {
    const char = str[i];

    if (char === ' ' || i === str.length) {
      const currentPattern = pattern[wordCount];
      const matchedWord = matchedPatterns.get(pattern[wordCount]);

      // Current word was already met but its position does not match the pattern OR
      // Current word was not met but its matching pattern was processed
      if (
        (matchedWord && currentWord !== matchedWord) ||
        (!matchedWord && usedWords.has(currentWord))
      ) {
        return false;
      }

      // Add word pattern match
      matchedPatterns.set(currentPattern, currentWord);
      // Add processed pattern
      usedWords.add(currentWord);
      // Reset current word
      currentWord = '';
      // Increment word counter
      wordCount++;
    } else {
      currentWord += char;
    }
  }

  if (pattern.length !== wordCount) {
    return false;
  }

  return true;
}

function testStringSingleMap(pattern, str) {
  const positions = new Map();
  const words = str.split(' ');

  if (pattern.length !== words.length) {
    return false;
  } 

  for (let i = 0; i < words.length; i++) {
    const patternPosition = positions.get(`p_${pattern[i]}`);
    const wordPosition = positions.get(`w_${words[i]}`);
    
    if (patternPosition !== wordPosition) {
      return false;
    }

    positions.set(`p_${pattern[i]}`, i);
    positions.set(`w_${words[i]}`, i);
  }

  return true;
}

const { test } = require('../utils/test');

test(testStringSingleMap, testCases);

// const { input, expected } = testCases[6];

// console.log('Expected:', expected, 'Received', testStringOptimized(...input));
