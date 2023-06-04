/**
 * LRU Cache
 * Основна ідея імплементації LRU кеша базується на використанні двох структур: двозв'язного списку і хеш-мапи.
 * Хеш-мапа використовується для швидкого доступу до будь-якого елементу в кеші, а двозв'зний список дає
 * можливість трекати як давно елемент був використаний даючи швидкий доступ до першого (head) і останнього
 * елемента (tail). Доступ до найстарішого елемента в кеші дозволяє швидко видалити його з кешу, коли кеш
 * повністю заповнений і нам необхідно додати новий елемент.
 * 
 * Перевагами цього підходу є складність О(1) для операцій get і put.
 * Основним недоліком є прожерливість по пам'яті O(2n) = О(n), оскільки кожен елемент повинно зберігати у двох структурах.
 * 
 * Оскільки в вимогах немає видалення, я вирішив дещо полегшити роботу GC, створюючи нові ноди тільки в момент
 * коли кеш ще неповністю заповнений. Коли треба оновити значення по ключу чи додати нове, найстаріша нода буде
 * перевикористана для нового значення і поставлена в початок списку. Таким чином після повного заповнення
 * кеш працює з пулом нод.
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
    const node = this.#cache.get(key);

    console.log('GET ITEM:', key);

    if (!node) {
      return -1;
    }

    this.#moveToHead(node);

    // // If node is already in the head (most recent) return found value
    // if (node === this.#head) {
    //   return node.val;
    // }

    // // If node is tail (least recent) move this node to the head
    // if (node === this.#tail) {
    //   const secondLast = this.#tail.prev;

    //   node.prev = null;
    //   node.next = this.#head;
    //   this.#head.prev = node;
    //   this.#head = node;
    //   secondLast.next = null;
    //   this.#tail = secondLast;

    //   return node.val;
    // }

    // // If node is somewhere in the middle connect previous and next nodes and move node to the head
    // // prev <-> current <-> next
    // // prev <-> next
    // // node <-> head <-> n... <-> prev <-> next
    // // head <-> n... <-> prev <-> next
    // const previousNode = node.prev;
    // const nextNode = node.next;

    // // Connect previous and next nodes
    // previousNode.next = nextNode;
    // nextNode.prev = previousNode;

    // // Remove pointer to previous
    // node.prev = null;
    // // Set next pointer to current head
    // node.next = this.#head;
    // // Set current head's prev pointer to node
    // this.#head.prev = node;
    // // Make node a new head
    // this.#head = node;

    return node.val;
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
    } else {
      // If node is somewhere in the middle connect previous and next nodes
      const previousNode = node.prev;
      const nextNode = node.next;

      // Connect previous and next nodes
      previousNode.next = nextNode;
      nextNode.prev = previousNode;
    }

    // Remove pointer to previous
    node.prev = null;
    // Set next pointer to current head
    node.next = this.#head;
    // Set current head's prev pointer to node
    this.#head.prev = node;
    // Make node a new head
    this.#head = node;
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    console.log('ADDING:', key, value);

    if (this.#cache.size === 0) {
      const node = new Node(key, value);

      this.#head = node;
      this.#tail = node;

      this.#cache.set(key, node);
    }

    const existing = this.#cache.get(key);


    // If key does not exist and capacity is not full
    // - add node to Map
    // - make node a new head
    if (!existing && !this.#isFull()) {
      console.log('Key does not exist and capacity is not full');

      const node = new Node(key, value);

      // Set next pointer to current head
      node.next = this.#head;
      // Set current head's prev pointer to node
      this.#head.prev = node;
      // Make node a new head
      this.#head = node;

      this.#cache.set(key, node);

      return;
    }

    // If key does not exist and capacity is full
    // - set new value to tail node
    // - make second last node a tail
    // - move tail to start
    // - remove key from map
    if (!existing && this.#isFull()) {
      const oldest = this.#tail;
      
      this.#cache.delete(oldest.key);
      
      oldest.key = key;
      oldest.val = value;

      this.#moveToHead(oldest);

      // const tail = this.#tail;
      // const secondLast = this.#tail.prev;

      // this.#cache.delete(this.#tail.key);

      // tail.key = key;
      // tail.val = value;

      // // make second last item tail
      // secondLast.next = null;
      // this.#tail = secondLast;

      // // Move tail to head
      // tail.prev = null;
      // tail.next = this.#head;
      // this.#head.prev = tail;
      // this.#head = tail;

      this.#cache.set(key, oldest);

      return;
    }

    // If key exists
    // - update existing node value (reuse existing node as a micro-optimization)
    // - make node most recent
    if (existing === this.#head) {
      existing.val = value;

      return;
    }
    if (existing === this.#tail) {
      existing.prev = null;
      existing.next = this.#head;
      this.#head.prev = node;
      this.#head = existing;
      existing.val = value;

      return;
    }


    const previousNode = existing.prev;
    const nextNode = existing.next;

    // Connect previous and next nodes
    previousNode.next = nextNode;
    nextNode.prev = previousNode;

    // Remove pointer to previous
    existing.prev = null;
    // Set next pointer to current head
    existing.next = this.#head;
    existing.val = value;
    // Set current head's prev pointer to node
    this.#head.prev = existing;
    // Make node a new head
    this.#head = existing;
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
