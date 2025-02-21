import MouseMove from '../index.js';

export default class DragStart extends MouseMove {
  after = (e) => {
    if (this.sortableList_item.drag) {
      console.log('there!');
      return;
    }
    console.log('switched to "before"');
    this.handle = this.before;
  };
  before = (e) => {
    console.log('here!');
    if (this.sortableList_item.drag.isToleranceExceeded(e)) {
      // this.el.classList.add(this.CSSClass.pulled);
      this.handle = this.after;
      this.sortableList_item.el.classList.remove(
        this.sortableList_item.CSSClass.animated,
        this.sortableList_item.CSSClass.grabbed,
        this.sortableList_item.CSSClass.pulled,
      );
      this.sortableList_item.el.classList.add(
        this.sortableList_item.CSSClass.dragged,
      );
      // this.incrementZIndex();
    }
  };
  handle = this.before;
}
