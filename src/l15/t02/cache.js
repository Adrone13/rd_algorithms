/**
 * LRU Cache
 * Основою імплементації структури є використання двозв'язного списку і хеш-мапи.
 * Хеш-мапа використовується для швидкого доступу до будь-якого елементу в кеші, а двозв'зний список дає
 * можливість трекати як давно елемент був використаний даючи можливість видаляти найстаріший елемент (tail)
 * замінюючи його на новий.
 * 
 * Перевагами цього підходу є складність О(1) для операцій get і put.
 * Основним недоліком є прожерливість по пам'яті O(2n) = О(n), оскільки кожен елемент необхідно зберігати у 
 * двох структурах. Ще одним недоліком я би додав складність сінку даних між двома структурами :)
 * 
 * Через те що в вимогах немає видалення я вирішив дещо полегшити роботу GC, створюючи нові ноди тільки 
 * в момент коли кеш ще неповністю заповнений. Коли capacity досяг ліміту і треба додати нове значення 
 * чи оновити значення по ключу, найстаріша нода буде перевикористана для нового значення і поставлена в 
 * початок списку. Таким чином після повного заповнення кеш працює з пулом нод замість створення нових інстансів.
 */

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class Cache {
  #capacity;
  #cache;
  #head;
  #tail;

  constructor(capacity = 4) {
    this.#capacity = capacity;
    this.#cache = new Map();
    this.#head = null;
    this.#tail = null;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  // time: O(1)
  get(key) {
    console.log('GET ITEM:', key);

    const node = this.#cache.get(key);

    if (!node) {
      return -1;
    }

    this.#moveToHead(node);

    return node.val;
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  // time: O(1)
  put(key, value) {
    console.log('PUT ITEM:', key, value);

    if (this.#cache.size === 0) {
      const node = new Node(key, value);

      this.#head = node;
      this.#tail = node;

      this.#cache.set(key, node);
    }

    const existing = this.#cache.get(key);

    if (!existing && !this.#isFull()) {
      const node = new Node(key, value);

      node.next = this.#head;
      this.#head.prev = node;
      this.#head = node;

      this.#cache.set(key, node);

      return;
    }

    if (!existing && this.#isFull()) {
      const oldest = this.#tail;
      
      this.#cache.delete(oldest.key);
      
      // Update existing node
      oldest.key = key;
      oldest.val = value;

      this.#moveToHead(oldest);

      this.#cache.set(key, oldest);

      return;
    }

    existing.val = value;

    this.#moveToHead(existing);
  }

  #moveToHead(node) {
    // If node is head
    if (node === this.#head) {
      return;
    }

    // If node is tail
    if (node === this.#tail) {
      const secondLast = this.#tail.prev;

      secondLast.next = null;
      this.#tail = secondLast;

    // If node is somewhere in the middle
    } else {
      const previousNode = node.prev;
      const nextNode = node.next;

      previousNode.next = nextNode;
      nextNode.prev = previousNode;
    }

    node.prev = null;
    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;
  }

  capacity() {
    return this.#capacity;
  }

  size() {
    return this.#cache.size;
  }

  #isFull() {
    return this.#capacity === this.#cache.size;
  }

  printCache() {
    console.log('Cache');

    console.log(this.#cache);
  }

  printList() {
    console.log('Cache order');

    if (this.#head == null) {
      process.stdout.write("<Empty>\n");
      return this;
    }

    let curr = this.#head;
    process.stdout.write(`${curr.val}`);
    curr = curr.next;
    while (curr != null) {
      process.stdout.write(` <-> ${curr.val}`);
      curr = curr.next;
    }
    process.stdout.write("\n");
    return this;
  }
}

module.exports = {
  Cache,
};
