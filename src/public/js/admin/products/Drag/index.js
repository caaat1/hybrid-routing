export default class Drag {
  delta;
  tolerance = 4;
  constructor(delta) {
    this.delta = delta;
  }
  get offset() {
    return Math.abs(this.delta.x) + Math.abs(this.delta.y);
  }
  get isToleranceExceeded() {
    return this.offset > this.tolerance;
  }
}
