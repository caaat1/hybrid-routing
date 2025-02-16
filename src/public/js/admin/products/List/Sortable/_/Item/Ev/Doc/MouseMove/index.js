import DocEvent from '../index.js';

export default class MouseMove extends DocEvent {
  beforeDragStarts = (e) => {
    console.log('here!');
    if (this.sortableList_item.drag.isToleranceExceeded(e)) {
      // this.el.classList.add(this.CSSClass.pulled);
      this.handle = this.afterDragStarts;
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
  afterDragStarts = (e) => {
    console.log('there!');
  };
  handle = this.beforeDragStarts;
}
