const main = (args) => {
  const arr = [34, 19, 35, 18, 21];
  const tree = new AVLTree();

  for (let n of arr) {
    tree.insert(n);
  }
  /*
               34
          19       35
       18    21
   */

  tree.printTree();

  tree.insert(30);
  /*
               21
          19        34
       18        30    35
   */
  tree.printTree();

  tree.insert(32);
  /*
               21
          19           34
       18         30        35
                     32
   */
  tree.printTree();

  tree.insert(33);
  /*
               21
          19           34
       18         32        35
               30     33
   */
  tree.printTree();

  tree.delete(19);
  /*
                32
          21           34
       18    30     33      35
   */
  tree.printTree();
}


class Node {
  constructor(val) {
    this.value = val;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {

  constructor() {
    this.root = null;
  }

  find(value) {
    let current = this.root;
    while (current != null) {
      if (current.value === value) {
        break;
      }
      current = current.value < value ? current.right : current.left;
    }
    return current;
  }

  insert(value) {
    this.root = this.insertRecursively(this.root, value);
  }

  delete(value) {
    this.root = this.deleteRecursively(this.root, value);
  }

  getRoot() {
    return this.root;
  }

  getHeight() {
    return this.root == null ? -1 : this.root.height;
  }

  insertRecursively(node, value) {
    if (node == null) {
      return new Node(value);
    } else if (node.value > value) {
      node.left = this.insertRecursively(node.left, value);
    } else if (node.value < value) {
      node.right = this.insertRecursively(node.right, value);
    } else {
      throw new Error("duplicate value!");
    }
    return this.rebalance(node);
  }

  deleteRecursively(node, value) {
    if (node == null) {
      return node;
    } else if (node.value > value) {
      node.left = this.deleteRecursively(node.left, value);
    } else if (node.value < value) {
      node.right = this.deleteRecursively(node.right, value);
    } else {
      if (node.left == null || node.right == null) {
        node = (node.left == null) ? node.right : node.left;
      } else {
        let mostLeftChild = this.mostLeftChild(node.right);
        node.value = mostLeftChild.value;
        node.right = this.deleteRecursively(node.right, node.value);
      }
    }
    if (node != null) {
      node = this.rebalance(node);
    }
    return node;
  }

  mostLeftChild(node) {
    let current = node;
    /* loop down to find the leftmost leaf */
    while (current.left != null) {
      current = current.left;
    }
    return current;
  }

  findSmallestValue() {
    if (!this.root) {
      return null;
    }

    const smallestValueNode = this.mostLeftChild(this.root);

    return smallestValueNode.value;
  }

  rebalance(z) {
    this.updateHeight(z);
    const balance = this.getBalance(z);
    if (balance > 1) {
      if (this.getHeight(z.right.right) > this.getHeight(z.right.left)) {
        z = this.rotateLeft(z);
      } else {
        z.right = this.rotateRight(z.right);
        z = this.rotateLeft(z);
      }
    } else if (balance < -1) {
      if (this.getHeight(z.left.left) > this.getHeight(z.left.right)) {
        z = this.rotateRight(z);
      } else {
        z.left = this.rotateLeft(z.left);
        z = this.rotateRight(z);
      }
    }
    return z;
  }

  rotateRight(y) {
    let x = y.left;
    let z = x.right;
    x.right = y;
    y.left = z;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(y) {
    let x = y.right;
    let z = x.left;
    x.left = y;
    y.right = z;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  updateHeight(n) {
    n.height = 1 + Math.max(this.getHeight(n.left), this.getHeight(n.right));
  }

  getHeight(n) {
    return n == null ? -1 : n.height;
  }

  getBalance(n) {
    return (n == null) ? 0 : this.getHeight(n.right) - this.getHeight(n.left);
  }

  printTree() {
    console.log("------START------");
    this.printTreeRecursively(this.root, "", false);
    console.log("------END------");
    console.log("");
  }

  printTreeRecursively(currPtr, indent, last) {
    if (currPtr != null) {
      let prefix = indent;
      if (last) {
        prefix += "R----"
        indent += "   ";
      } else {
        prefix += "L----"
        indent += "|  ";
      }
      console.log(prefix + currPtr.value + "(" + this.getBalance(currPtr) + ")");
      this.printTreeRecursively(currPtr.left, indent, false);
      this.printTreeRecursively(currPtr.right, indent, true);
    }
  }
}

module.exports = {
  AVLTree,
};

// main();