import {Listener} from '../../../index.js';
import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle = (e) => {
    console.log('MouseUp');
    // this.sortableList_item
    //   .unsetEventListener(document, 'mousemove.dragStart')
    //   .unsetEventListener(document, 'mouseup');
    new Listener(this.sortableList_item)
      .unset(document, 'mousemove.dragStart')
      .unset(document, 'mouseup');
  };
}
