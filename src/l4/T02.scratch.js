const { test } = require('../utils/test');

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

// )))(((
function calculateBracketInsertionsRec(str, i = 0, lastParIndex = -1, unmatchedCount = 0) {
  console.log(str, i, lastParIndex);

  if (i === str.length) {
    return unmatchedCount;
  }

  const currPar = str[i];
  console.log('CURR PAR:', currPar);
  console.log('LAST PAR:', str[lastParIndex]);

  if (lastParIndex === -1) {
    return calculateBracketInsertionsRec(str, i + 1, i, unmatchedCount + 1);
  }

  if (currPar === ')' && str[lastParIndex] === '(') {
    return calculateBracketInsertionsRec(str, i + 1, -1, unmatchedCount - 1);
  }

  return calculateBracketInsertionsRec(str, i + 1, i, unmatchedCount + 1);
}

function calculateBracketInsertionsRec1(str, i = 0, lastPar = null, unmatchedCount = 0) {
  if (i === str.length) {
    return unmatchedCount;
  }

  const currPar = str[i];
  if (currPar === ')' && lastPar === '(') {
    lastPar = currPar;
    unmatchedCount--;
  } else {
    lastPar = currPar;
    unmatchedCount++;
  }

  return calculateBracketInsertionsRec1(str, i + 1, lastPar, unmatchedCount);
}

// console.log('RESULT:', calculateBracketInsertionsRec('())'), 'EXPECTED:', 1);

const testCases = [
  { input: ["())"], expected: 1 },
  { input: ["((("], expected: 3 },
  { input: ["(()"], expected: 1 },
  { input: [")))((("], expected: 6 },
  { input: ["()))(("], expected: 4 },
  { input: ["()"], expected: 0 },
  { input: ["()))()(()()("], expected: 4 },
];

test(calculateBracketInsertionsRec1, testCases);
