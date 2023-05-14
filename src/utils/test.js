function test(fn, testCases) {
  testCases.forEach((testCase, index) => {
    const { input, expected } = testCase;

    console.log('Input:', input)

    const actual = fn(...input);

    process.stdout.write(`Expected: ${expected}, Received: ${actual} `);

    if (actual !== expected) {
      process.stdout.write(`❌ Test ${index} failed`);
    } else {
      process.stdout.write(`✅ Test ${index} successful`);
    }
    process.stdout.write('\n');
  });
}

module.exports = {
  test,
};