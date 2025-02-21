export default class Drag {
  e = {
    dragStart: undefined,
    mouseDown: undefined,
  };
  tolerance = 400;
  sortList_item;
  constructor(mouseDownElementEvent, e) {
    this.sortList_item = mouseDownElementEvent.sortList_item;
    this.e.mouseDown = e;
    // console.log('new Drag', this);
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
}
