export default class SortableList {
  head;
  length;

  constructor(...arr) {
    this.checkIfArray(arr);
    this.length = arr.length;
    this.head = Node.create(null, this.getArrayItem(arr));
    console.log(this.head);
  }

  *getArrayItem(arr) {
    yield* arr; // Generator yielding array items one by one
  }

  checkIfArray(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Argument must be an array');
    }
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.el); // Push node value into result array
      current = current.next;
    }
    return result;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.el; // Yield each node's value
      current = current.next;
    }
  }
}

class Node {
  el;
  next = null; // Explicitly define next for readability
  prev;

  constructor(el, prev) {
    this.el = el;
    this.prev = prev;
  }

  static create(prev, iterator) {
    const {value, done} = iterator.next();
    if (done) {
      return null;
    }
    const node = new Node(value, prev); // Create node with value
    node.next = Node.create(node, iterator); // Recursively create next node
    return node;
  }
}
