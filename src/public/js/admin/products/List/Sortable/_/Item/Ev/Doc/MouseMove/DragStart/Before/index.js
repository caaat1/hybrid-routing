import DragStart from '../index.js';

export default class Before extends DragStart {
  handle = (e) => {
    console.log('here!');
    if (this.sortableList_item.drag.isToleranceExceeded(e)) {
      // this.el.classList.add(this.CSSClass.pulled);
      this.sortableList_item
        .eventListenerOn(document)
        .unset('mousemove.dragStart.before')
        .set('mousemove.dragStart.after');
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
