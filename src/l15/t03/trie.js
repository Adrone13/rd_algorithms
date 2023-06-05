/**
 * Trie
 * Основую структури є побудова дерева рядків, в якому ключами вузлів є коди символів.
 * Останній вузол (символ) кожного доданого рядка помічається як кінець.
 * При цьому кожен рівень представляє наступний символ у рядку, що дає змогу знаходити
 * цілі рядки чи підрядки за час рівний довжині інпуту тобто О(n), де n - строка чи префікс.
 * 
 * Основним недоліком є прожерливість по пам'яті яка складає O(DICTIONARY_SIZE * n * m),
 * де n - кількість рядків, m - середня довжина рядка. Для вирішення проблеми пам'яті існує
 * compressed trie, який мерджить ноди, в яких є один нащадок з батьківськими, але таке
 * дерево гірше працює з частими вставками.
 */

class TrieNode {
  #isWordEnd;

  constructor(size) {
    if (!size) {
      throw new Error('"size" not specified');
    }

    this.#isWordEnd = false;
    this.children = new Array(size).fill(null);
  }

  isWordEnd() {
    return this.#isWordEnd;
  }

  markWordEnd() {
    this.#isWordEnd = true;
  }
}

class Trie {
  #DICT_SIZE = 26;

  #root;

  constructor() {
    this.#root = new TrieNode(this.#DICT_SIZE);
  }

  /**
   * @param {string} str
   * @return {void}
   */
  // time O(n) n - length of str
  insert(str) {
    let currentNode = this.#root;

    for (let char of str) {
      const charCode = this.#codeFromChar(char);

      if (currentNode.children[charCode] === null) {
        currentNode.children[charCode] = new TrieNode(this.#DICT_SIZE);
      }

      currentNode = currentNode.children[charCode];
    }

    currentNode.markWordEnd();
  }

  /**
   * @param {string} str
   * @return {boolean}
   */
  // time O(n) n - length of str
  search(str) {
    let currentNode = this.#root;

    for (let char of str) {
      const charCode = this.#codeFromChar(char);

      if (currentNode.children[charCode] == null) {
        return false;
      }

      currentNode = currentNode.children[charCode];
    }

    return currentNode.isWordEnd();
  }

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  // time O(n) n - length of prefix
  startsWith(prefix) {
    let currentNode = this.#root;

    for (let char of prefix) {
      const charCode = this.#codeFromChar(char);

      if (currentNode.children[charCode] == null) {
        return false;
      }

      currentNode = currentNode.children[charCode];
    }

    return true;
  }

  #codeFromChar(char) {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  #charFromCode(code) {
    return String.fromCharCode(code + 'a'.charCodeAt(0));
  }

  print() {
    if (this.#root) {
      return this.#printRecursive(this.#root);
    }
  }

  #printRecursive(node, key = 'root', height = 0) {
    console.log('Node:', key, {
      keys: this.#getNodeKeys(node),
      isWordEnd: node.isWordEnd(),
    });

    if (node.isWordEnd()) {
      console.log('\n');
    }

    node.children.forEach((child, index) => {
      if (child !== null) {
        this.#printRecursive(child, this.#charFromCode(index), height);
      }
    });
  }

  #getNodeKeys(node) {
    return node.children.reduce((acc, item, index) => {
      if (item !== null) {
        acc.push(this.#charFromCode(index));
      }

      return acc;
    }, []);
  }
}

module.exports = {
  Trie,
};

function main() {
  const trie = new Trie();

  trie.insert('address');
  trie.insert('add');

  trie.print();

  console.log('Search "add":', trie.search('add'));
  // console.log(trie.startsWith('address'));

  // trie.insert('add');
  // trie.insert('ad');

  // console.log(trie.search('address 1'));
}

main();
