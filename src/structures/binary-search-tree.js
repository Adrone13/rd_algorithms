const main = () => {
  const bt = new BinarySearchTree();

  bt.add(6);
  bt.add(4);
  bt.add(8);
  bt.add(3);
  bt.add(5);
  bt.add(7);
  bt.add(1);
  bt.add(9);
  bt.add(2);

  /*
                         6
                    4         8
                3      5    7   9
              1
                2
  */

  bt.traverseInOrder();
  bt.traverseLevelOrder();

  bt.delete(3);

  /*
                      6
                 4         8
              1    5    7    9
               2
   */

  bt.traverseLevelOrder();

  bt.delete(6);
  bt.traverseLevelOrder();
  /*
                      7
                 4         8
              1    5          9
               2
   */
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  add(value) {
    this.root = this.addRecursive(this.root, value);
  }

  addRecursive(current, value) {
    // if empty place found -- insert here
    if (current == null) {
      return new TreeNode(value);
    }

    // checking new value against current
    // and recursively going down to left or right
    if (value < current.value) {
      current.left = this.addRecursive(current.left, value);
    } else if (value > current.value) {
      current.right = this.addRecursive(current.right, value);
    } else {
      // value already exists
      return current;
    }

    return current;
  }

  containsNode(value) {
    return this.containsNodeRecursive(this.root, value);
  }

  containsNodeRecursive(current, value) {
    // we got to the end without value -- thus it is not in tree
    if (current == null) {
      return false;
    }
    // found it
    if (value === current.value) {
      return true;
    }

    // checking it according to rules
    // and recursively moving to left or right branch
    return value < current.value
      ? this.containsNodeRecursive(current.left, value)
      : this.containsNodeRecursive(current.right, value);
  }

  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

  deleteRecursive(current, value) {
    // we got to the end without needed node -- nothing to delete
    if (current == null) {
      return null;
    }

    // found node to delete
    if (value === current.value) {
      return this.deleteNode(current);
    }

    // moving recursively either left or right based on value, trying to find the node to delete
    if (value < current.value) {
      current.left = this.deleteRecursive(current.left, value);
      return current;
    }
    current.right = this.deleteRecursive(current.right, value);
    return current;
  }

  deleteNode(node) {
    console.log("REMOVING: " + node.value);
    // if there are no child nodes -- it can be easily removed
    if (node.left == null && node.right == null) {
      return null;
    }

    // if there is only one child -- it will be put on the deleted place
    if (node.right == null) {
      return node.left;
    }
    if (node.left == null) {
      return node.right;
    }

    // otherwise, we have both child nodes, thus need to find smallest node from right subtree
    // and put that node on the place of deleted node
    const smallestValue = this.findSmallestValueRecursive(node.right);
    // update node with smallest value
    node.value = smallestValue;
    // now we need to remove that found smallest node, because it is now on the other place
    node.right = this.deleteRecursive(node.right, smallestValue);
    return node;
  }

  findSmallestValue() {
    if (!this.root) {
      return null;
    }

    return this.findSmallestValueRecursive(this.root);
  }

  findSmallestValueRecursive(root) {
    // moving left as much as possible. last element is smallest
    return root.left == null ? root.value : this.findSmallestValueRecursive(root.left);
  }

  findGreatestValue() {
    return this.findGreatestValueRecursive(this.root);
  }

  findGreatestValueRecursive(root) {
    // moving right as much as possible. last element is greatest
    return root.right == null ? root.value : this.findGreatestValueRecursive(root.right);
  }

  traverseInOrder() {
    this.traverseInOrderRecursive(this.root);
    process.stdout.write("\n");
  }

  traverseInOrderRecursive(node) {
    // visiting left node recursively
    // visiting current node
    // visiting right node recursively
    if (node != null) {
      this.traverseInOrderRecursive(node.left);
      process.stdout.write(" " + node.value);
      this.traverseInOrderRecursive(node.right);
    }
  }

  traversePreOrder() {
    this.traversePreOrderRecursive(this.root);
    process.stdout.write("\n");
  }

  traversePreOrderRecursive(node) {
    // visiting current node
    // visiting left node recursively
    // visiting right node recursively
    if (node != null) {
      process.stdout.write(" " + node.value);
      this.traversePreOrderRecursive(node.left);
      this.traversePreOrderRecursive(node.right);
    }
  }

  traversePostOrder() {
    this.traversePostOrderRecursive(this.root);
    process.stdout.write("\n");
  }

  traversePostOrderRecursive(node) {
    // visiting left node recursively
    // visiting right node recursively
    // visiting current node
    if (node != null) {
      this.traversePostOrderRecursive(node.left);
      this.traversePostOrderRecursive(node.right);
      process.stdout.write(" " + node.value);
    }
  }

  traverseLevelOrder() {
    // visiting nodes level by level
    if (this.root == null) {
      return;
    }

    // storing child nodes here
    const nodes = [];
    nodes.push(this.root);

    // visiting all of nodes left in queue
    while (nodes.length > 0) {

      const node = nodes.shift();

      process.stdout.write(" " + node.value);

      // adding child nodes to the queue (they will be last)
      if (node.left != null) {
        nodes.push(node.left);
      }

      if (node.right != null) {
        nodes.push(node.right);
      }
    }

    process.stdout.write("\n");
  }
}

module.exports = {
  BinarySearchTree,
};
