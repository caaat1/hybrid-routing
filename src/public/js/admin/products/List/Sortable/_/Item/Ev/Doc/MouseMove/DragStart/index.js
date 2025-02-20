import MouseMove from '../index.js';

export default class DragStart extends MouseMove {
  handle = this.before;
  after = (e) => {
    console.log('there!');
  };
  before = (e) => {
    console.log('here!');
    if (this.sortableList_item.drag.isToleranceExceeded(e)) {
      // this.el.classList.add(this.CSSClass.pulled);
      console.log('almost there');
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
}
