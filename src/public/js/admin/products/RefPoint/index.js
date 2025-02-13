export default class RefPoint {
  x;
  _y = 0;
  // delta;
  _e;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get e() {
    return this._e;
  }
  set e(value) {
    // this.delta = new Delta(e, this);
    this._e = value;
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = this._y + value;
  }
  get delta() {
    return {x: this.e.pageX - this.x, y: this.e.pageY - this.y};
  }
}
// class Delta {
//   e;
//   refPoint;
//   constructor(e, refPoint) {
//     this.e = e;
//     this.refPoint = refPoint;
//   }
//   get x() {
//     return this.e.pageX - this.refPoint.x;
//   }
//   get y() {
//     return this.e.pageY - this.refPoint.y;
//   }
// }
