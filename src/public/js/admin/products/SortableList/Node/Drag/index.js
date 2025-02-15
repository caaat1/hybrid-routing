import pixels from '../pixels/index.js';

export default class Drag {
  e = {
    dragStart: undefined,
    mouseDown: undefined,
  };
  tolerance = 400;
  wrapped;
  constructor(wrapped, e) {
    this.wrapped = wrapped;
    this.e.mouseDown = e;
  }
  getOffset(e) {
    return (
      Math.abs(e.pageX - this.e.mouseDown.pageX) +
      Math.abs(e.pageY - this.e.mouseDown.pageY)
    );
  }
  isToleranceExceeded(e) {
    const result = this.getOffset(e) > this.tolerance;
    if (result) {
      this.e.dragStart = e;
    }
    return result;
  }
  rerender(e) {
    this.wrapped.el.style.left = pixels(e.pageX - this.e.dragStart.pageX);
    this.wrapped.el.style.top = pixels(e.pageY - this.e.dragStart.pageY);
  }
}

class RefPoint {}
