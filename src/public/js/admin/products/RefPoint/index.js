export default class RefPoint {
  x;
  y;
  delta;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  setDelta(event) {
    this.delta = new Delta(event, this);
  }
}
class Delta {
  event;
  refPoint;
  constructor(event, refPoint) {
    this.event = event;
    this.refPoint = refPoint;
  }
  get x() {
    return this.event.pageX - this.refPoint.x;
  }
  get y() {
    return this.event.pageY - this.refPoint.y;
  }
}
