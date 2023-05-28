const { isEqual } = require('lodash');

function test(fn, testCases) {
  testCases.forEach((testCase, index) => {
    const { input, expected } = testCase;

    console.log('Input:', input)

    const actual = fn(...input);

    console.log('Expected:', expected, 'Received:', actual);

    if (!isEqual(actual, expected)) {
      throw new Error(`❌ Test ${index} failed`);
    } else {
      console.log(`✅ Test ${index} successful`);
    }
    console.log('\n');
  });
}

module.exports = {
  test,
};