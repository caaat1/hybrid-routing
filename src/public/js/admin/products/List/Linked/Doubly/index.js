import DoublyLinkedListItem from './_/Item/index.js';

export default class Doubly {
  head;
  length;

  constructor(...arr) {
    this.checkIfArray(arr);
    this.length = arr.length;
    this.head = DoublyLinkedListItem.build(null, arr[Symbol.iterator]());
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
