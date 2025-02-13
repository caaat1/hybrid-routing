export default class RefPoint {
  x;
  y;
  delta;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  setDelta(e) {
    this.delta = new Delta(e, this);
  }
}
class Delta {
  e;
  refPoint;
  constructor(e, refPoint) {
    this.e = e;
    this.refPoint = refPoint;
  }
  get x() {
    return this.e.pageX - this.refPoint.x;
  }
  get y() {
    return this.e.pageY - this.refPoint.y;
  }
}
