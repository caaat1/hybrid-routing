// import {Listener} from '../../../index.js';
import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle = (e) => {
    console.log('MouseUp');
    this.sortableList_item.drag = null;

    console.log(this.sortableList_item);

    this.sortableList_item.el.classList.remove(
      this.sortableList_item.CSSClass.dragged,
    );
    this.sortableList_item.el.classList.add(
      this.sortableList_item.CSSClass.animated,
      this.sortableList_item.CSSClass.released,
    );
    this.sortableList_item
      .eventListenerOn(document)
      .unset('mousemove.dragStart.before')
      .unset('mousemove.dragStart.after')
      .unset('mouseup');
  };
}
