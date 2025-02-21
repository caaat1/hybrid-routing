export default class Drag {
  e = {
    dragStart: undefined,
    mouseDown: undefined,
  };
  tolerance = 40;
  sortableList_item;
  constructor(mouseDownElementEvent, e) {
    this.sortableList_item = mouseDownElementEvent.sortableList_item;
    this.e.mouseDown = e;
    console.log('new Drag', mouseDownElementEvent);
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
