class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class Iterator {
  #start = null;
  #current = null;

  constructor(start) {
    this.#start = start;
  }

  next() {
    if (!this.#current) {
      this.#current = this.#start;
    } else {
      this.#current = this.#current.next;
    }

    if (!this.#current) {
      throw new Error('Out of bounds');
    }

    return this.#current.val;
  }

  hasNext() {
    if (!this.#current) {
      return this.#start.next !== null;
    }

    return this.#current.next !== null;
  }
}

class DoublyLinkedList {
  #head;
  #tail;
  #size;

  constructor(array) {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;

    if (array) {
      array.forEach(item => this.add(item));
    }
  }

  peekFirst() {
    return this.#head.val;
  }

  peekLast() {
    return this.#tail.val;
  }

  iterator() {
    return new Iterator(this.#head);
  }

  size() {
    return this.#size;
  }

  forEach(func) {
    let curr = this.#head;

    while (curr !== null) {
      func(curr.val);
      curr = curr.next;
    }
  }

  add(val) {
    const node = new Node(val);

    if (this.#head == null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
      node.prev = this.#tail;
    }
    this.#tail = node;
    this.#size++;

    return this;
  }

  // O(n)
  // basic impl, won't work for empty list
  addByIndex(idx, val) {
    let curr = this.#head;
    let currIdx = 0;
    while (curr != null && currIdx != idx) {
      curr = curr.next;
      currIdx++;
    }

    if (curr == null) {
      throw new Error("Index out of bounds");
    }

    const newNode = new Node(val);
    let prev = curr.prev;
    newNode.next = curr;
    newNode.prev = prev;

    if (prev != null) {
      prev.next = newNode;
    }
    curr.prev = newNode;

    if (curr == this.#head) {
      this.#head = newNode;
    }
    this.#size++;

    return this;
  }

  // O(n)
  remove(idx) {
    let curr = this.#head;
    let currIdx = 0;
    while (curr != null && currIdx != idx) {
      curr = curr.next;
      currIdx++;
    }

    if (curr == null) {
      throw new Error("Index out of bounds");
    }

    if (curr == this.#tail) {
      return this.removeLast();
    }
    if (curr == this.#head) {
      return this.removeFirst();
    }

    const prev = curr.prev;
    const next = curr.next;

    if (prev != null) {
      prev.next = next;
    }
    if (next != null) {
      next.prev = prev;
    }
    this.#size--;

    return this;
  }

  // O(1)
  removeLast() {
    if (this.#head == this.#tail) {
      this.#head = this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    this.#size--;

    return this;
  }

  // O(1)
  removeFirst() {
    if (this.#head == this.#tail) {
      this.#head = this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    this.#size--;

    return this;
  }

  printList() {
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
  DoublyLinkedList,
};

// (() => {
//   new DoublyLinkedList()
//     .add(1)
//     .add(2)
//     .add(3)
//     .add(5)
//     .printList()
//     .remove(1)
//     .printList()
//     .remove(2)
//     .printList()
//     .remove(1)
//     .remove(0)
//     .printList()
//     .add(7)
//     .add(9)
//     .removeLast()
//     .printList()
//     .addByIndex(0, 10)
//     .addByIndex(0, 11)
//     .printList()
//     .removeFirst()
//     .printList();
// })();