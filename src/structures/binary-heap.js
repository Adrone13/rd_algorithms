class BinaryHeap {
  heap;

  constructor() {
    this.heap = [];
  }

  parent(position) {
    if (position === 0) {
      return null;
    }

    if (position % 2 === 0) {
      return (position - 2) / 2;
    }
  
    return (position - 1) / 2;
  }

  leftChild(position) {
    return 2 * position + 1;
  }

  rightChild(position) {
    return 2 * position + 2;
  }

  isLeaf(position) {
    return position > ((this.heap.length - 1) / 2);
  }

  swap(aPosition, bPosition) {
    const aNodeValue = this.heap[aPosition];

    this.heap[aPosition] = this.heap[bPosition];
    this.heap[bPosition] = aNodeValue;
  }

  heapify(position) {
    if (this.heap.length <= 1 || this.isLeaf(position)) {
      return;
    }

    const currentNode = this.heap[position];

    const leftChildPos = this.leftChild(position);
    const rightChildPos = this.rightChild(position);
    
    const leftChild = this.heap[leftChildPos];
    const rightChild = this.heap[rightChildPos];

    // console.log('Current', currentNode)
    // console.log('Left', leftChild)
    // console.log('Right', rightChild)

    let smallestPosition = position;

    if (leftChild && currentNode > leftChild) {
      smallestPosition = leftChildPos;
    }
    if (rightChild && this.heap[smallestPosition] > rightChild) {
      smallestPosition = rightChildPos;
    }

    // console.log(smallestPosition);

    if (smallestPosition !== position) {
      this.swap(position, smallestPosition);
      this.heapify(smallestPosition);
    }
  }

  add(value) {
    console.log('ADD', value);

    this.heap.push(value);

    if (this.heap.length === 1) {
      return;
    }

    const size = this.heap.length;

    const parent = this.heap[this.parent(size - 1)];

    if (value > parent) {
      return;
    }

    let currentPos = size - 1;
    while (this.heap[currentPos] < this.heap[this.parent(currentPos)]) {
      const parentPos = this.parent(currentPos);

      this.swap(currentPos, parentPos);
      currentPos = parentPos;
    }
  }

  remove() {
    if (this.heap.length === 0) {
      return null;
    }

    const root = this.heap[0];

    if (this.heap.length === 1) {
      this.heap.pop();

      return root;
    }

    console.log('REMOVE', root);

    const lastElement = this.heap.pop();

    this.heap[0] = lastElement;
    this.heapify(0);

    return root;
  }

  print() {
    console.log("------START------");

    for (let i = 0; i <= this.heap.length / 2; i++) {
      const leftChild = this.heap[this.leftChild(i)];
      const rightChild = this.heap[this.rightChild(i)];

      console.log(`PARENT: ${this.heap[i]}`);
      console.log('---' + `LEFT: ${leftChild ?? '_'}`);
      console.log('---' + `RIGHT: ${rightChild ?? '_'}`);
    }

    console.log("------END------");
  }
}

function main() {
  const heap = new BinaryHeap();

  heap.add(5);
  heap.add(6);
  heap.add(7);
  heap.add(3);
  heap.add(2);
  heap.add(4);
  heap.add(110);
  //       2
  //   3       4
  // 6   5   7   110

  heap.print();

  const result = heap.remove();
  //      110
  //   3       4
  // 6   5   7

  //       3
  //   5       4
  // 6  110   7
  console.log('Polled element:', result);

  heap.print();
}

// main();

module.exports = {
  BinaryHeap,
};
