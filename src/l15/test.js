let testCasesCount = 0;
let successfulTestCasesCount = 0;

function testCase(name, fn) {
  testCasesCount++;

  console.log('Running:', name);
  try {
    fn();

    console.log(`✅ Test passed`);
    successfulTestCasesCount++;
  } catch (error) {
    console.log('❌ Test failed:', error);
  }

  console.log();
}

function test(name, fn) {
  console.log(name);

  fn();

  if (testCasesCount === successfulTestCasesCount) {
    console.log(`✅ Passed ${successfulTestCasesCount}/${testCasesCount}`);
  } else {
    console.log(`❌ Passed ${successfulTestCasesCount}/${testCasesCount}`);
  }

  testCasesCount = 0;
  successfulTestCasesCount = 0;
}

module.exports = {
  test,
  testCase,
};
