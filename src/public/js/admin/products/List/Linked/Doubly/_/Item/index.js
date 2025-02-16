export default class Item {
  next;
  prev;
  src;

  constructor(src, prev, srcIterator) {
    this.src = src;
    this.prev = prev;
    this.next = this.constructor.build(this, srcIterator);
  }

  static build(prev, srcIterator) {
    const {value, done} = srcIterator.next();
    return done ? null : new this(value, prev, srcIterator);
  }
}
