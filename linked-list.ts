class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  add(value: T) {
    const node = new LinkedListNode<T>();
    node.value = value;

    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }

    this.tail = node;
  }

  getHead() {
    return this.head.value;
  }

  getTail() {
    return this.tail;
  }

  findByValue(value: number) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode.value;
      }

      currentNode = currentNode.next;
    }

    return null;
  }
}

const list = new LinkedList<number>();

list.add(1);
list.add(2);
list.add(3);

console.log(list.getHead());
console.log(list.getTail());

console.log()


