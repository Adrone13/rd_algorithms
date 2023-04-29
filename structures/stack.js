class Stack {
  #stack = [];

  constructor(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      this.#stack.push(array[i]);
    }
  }

  peek() {
    return this.#stack[this.#stack.length - 1];
  }

  pop(value) {
    this.#stack.pop(value);
  }

  push(value) {
    this.#stack.push(value);
  }

  isEmpty() {
    return this.#stack.length === 0;
  }

  toArray() {
    return this.#stack;
  }

  size() {
    return this.#stack.length;
  }
}

module.exports = {
  Stack,
};