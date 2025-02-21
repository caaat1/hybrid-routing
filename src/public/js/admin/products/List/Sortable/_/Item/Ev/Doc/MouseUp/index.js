// import {Listener} from '../../../index.js';
import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle = (e) => {
    console.log('MouseUp');
    // this.sortableList_item
    //   .unsetEventListener(document, 'mousemove.dragStart')
    //   .unsetEventListener(document, 'mouseup');
    this.sortableList_item.event
      .getListener(document, 'mousemove.dragStart')
      .remove();
    this.sortableList_item.event.getListener(document, 'mouseup').remove();
  };
}
