const { strict: assert } = require('node:assert');

const { test, testCase } = require('../test');

const { Trie } = require('./trie');


/**
 * Test cases
 * - search should return true if string is found
 * - search should return false if search substring does not exist but the whole string does
 * - startsWith should return true if if it matches part of the string or as a whole
 */

test('Trie', () => {
  testCase('search should return true if string is found', () => {
    const trie = new Trie();

    trie.insert('address');
    trie.insert('city');
    trie.insert('country');

    assert.equal(true, trie.search('address'));
    assert.equal(true, trie.search('city'));
    assert.equal(true, trie.search('country'));
  });

  testCase('search should return false if substring matches partially', () => {
    const trie = new Trie();

    trie.insert('address');
    trie.insert('city');
    trie.insert('country');

    assert.equal(false, trie.search('a'));
    assert.equal(false, trie.search('add'));
    assert.equal(false, trie.search('adda'));

    trie.insert('add');

    assert.equal(true, trie.search('add'));

    assert.equal(false, trie.search('cit'));
    assert.equal(false, trie.search('count'));
  });

  testCase('startsWith should return true if it matches part of the string or as a whole', () => {
    const trie = new Trie();

    trie.insert('add');

    assert.equal(true, trie.startsWith('a'));
    assert.equal(true, trie.startsWith('ad'));
    assert.equal(true, trie.startsWith('add'));
    assert.equal(false, trie.startsWith('addr'));
    assert.equal(false, trie.startsWith('addre'));
    assert.equal(false, trie.startsWith('addres'));
    assert.equal(false, trie.startsWith('address'));

    trie.insert('address');

    assert.equal(true, trie.startsWith('a'));
    assert.equal(true, trie.startsWith('ad'));
    assert.equal(true, trie.startsWith('add'));
    assert.equal(true, trie.startsWith('addr'));
    assert.equal(true, trie.startsWith('addre'));
    assert.equal(true, trie.startsWith('addres'));
    assert.equal(true, trie.startsWith('address'));
  });
});
