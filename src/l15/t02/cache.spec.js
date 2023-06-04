const { strict: assert } = require('node:assert');

const { test, testCase } = require('../test');

const { Cache } = require('./cache');

test('LRU Cache', () => {
  testCase('Capacity should be 4 if constructor argument is omitted', () => {
    const cache = new Cache();

    assert.equal(4, cache.capacity());
    assert.equal(0, cache.size());
  });

  testCase('Size should not exceed defined capacity regardless of number of put items', () => {
    const cache = new Cache(3);

    for (let i = 0; i < 5; i++) {
      cache.put(i, i * 10);
    }

    assert.equal(3, cache.capacity());
    assert.equal(3, cache.size());
  });

  testCase('Should return existing item by key', () => {
    const cache = new Cache(10);

    for (let i = 0; i < 5; i++) {
      cache.put(i, i * 10);
    }
    for (let i = 0; i < 5; i++) {
      assert.equal(i * 10, cache.get(i));
    }
  });

  testCase('Should replace existing value on put if key already exists', () => {
    const cache = new Cache(3);
    
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);

    cache.put(1, 4);

    assert.equal(4, cache.get(1));
    assert.equal(3, cache.size());
  });

  testCase('Should return -1 if key does not exist', () => {
    const cache = new Cache(5);
    
    for (let i = 0; i < 6; i++) {
      cache.put(i, i * 10);
    }

    assert.equal(-1, cache.get(6));
  });

  testCase('Should delete oldest item after adding key if capacity limit is reached', () => {
    const cache = new Cache(3);
    
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);

    cache.get(1);
    
    cache.put(4, 4);

    assert.equal(-1, cache.get(2));
    assert.equal(3, cache.size());
  });

  testCase('Should handle defined limit for key (-10^4 <= key <= 10^4) and value (-10^9 <= value <= 10^9)', () => {
    const cache = new Cache(3);

    cache.put(-Math.pow(10, 4), -Math.pow(10, 9));
    cache.put(Math.pow(10, 4), Math.pow(10, 9));

    assert.equal(-Math.pow(10, 9), cache.get(-Math.pow(10, 4)));
    assert.equal(Math.pow(10, 9), cache.get(Math.pow(10, 4)));
  });
});
