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

class Node {
  item;
  next;
  prev;

  constructor(item, prev, itemIterator) {
    this.item = item;
    this.prev = prev;
    this.next = Node.build(this, itemIterator);
  }

  static build(prev, itemIterator) {
    const {value, done} = itemIterator.next();
    return done ? null : new Node(value, prev, itemIterator);
  }
}
