export default class RefPoint {
  constructor(x, y) {
    x;
    y;
    this.x = x;
    this.y = y;
  }
  getDelta(event) {
    return new Delta(event, this);
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
