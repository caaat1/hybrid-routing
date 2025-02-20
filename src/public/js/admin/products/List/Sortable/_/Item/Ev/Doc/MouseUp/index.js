import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle = (e) => {
    console.log('MouseUp');
    this.sortableList_item
      .unsetEventListener(document, 'mousemove.dragStart')
      .unsetEventListener(document, 'mouseup');
  };
}
