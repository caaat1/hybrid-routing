import Node from './Node/index.js';

export default class SortableList {
  head;
  length;

  constructor(...arr) {
    this.checkIfArray(arr);
    this.length = arr.length;
    this.head = Node.build(null, arr[Symbol.iterator]());
    console.log(this.head);
  }

  checkIfArray(arr) {
    if (false === Array.isArray(arr)) {
      throw new Error('Argument must be an array');
    }
  }

  toArray() {
    return [...this]; // Use the iterable protocol
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.item; // Yield each node's value
      current = current.next;
    }
  }
}
