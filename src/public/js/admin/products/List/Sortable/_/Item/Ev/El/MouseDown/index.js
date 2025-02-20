import Drag from '../../../Drag/index.js';
import ElementEvent from '../index.js';

export default class MouseDown extends ElementEvent {
  handle = (e) => {
    if (this.sortableList_item.isGrabbable(e)) {
      this.sortableList_item.el.classList.add(
        this.sortableList_item.CSSClass.grabbed,
      );
      this.sortableList_item.drag = new Drag(this, e);

      this.sortableList_item
        .setEventListener(document, 'mousemove')
        .setEventListener(document, 'mouseup');
    }
  };
}
