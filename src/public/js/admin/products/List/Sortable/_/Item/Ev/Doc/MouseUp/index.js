// import {Listener} from '../../../index.js';
import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle = (e) => {
    console.log('MouseUp');
    this.sortableList_item
      .eventListenerOn(document)
      .unset('mousemove.dragStart')
      .unset('mouseup');
  };
}
