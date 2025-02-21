import Drag from '../../../Drag/index.js';
// import {Listener} from '../../../index.js';
import ElementEvent from '../index.js';

export default class MouseDown extends ElementEvent {
  handle = (e) => {
    if (this.sortableList_item.isGrabbable(e)) {
      this.sortableList_item.el.classList.add(
        this.sortableList_item.CSSClass.grabbed,
      );
      this.sortableList_item.drag = new Drag(this, e);

      // this.sortableList_item
      //   .setEventListener(document, 'mousemove.dragStart')
      //   .setEventListener(document, 'mouseup');
      this.sortableList_item.event
        .getListener(document, 'mousemove.dragStart')
        .add();
      this.sortableList_item.event.getListener(document, 'mouseup').add();
    }
  };
}
