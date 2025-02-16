import DocEvent from '../index.js';

export default class MouseUp extends DocEvent {
  handle(e) {
    console.log('MouseUp');
    document.removeEventListener(
      'mousemove',
      this.sortableList_item.eventHandler.doc.mouseMove,
    );
    document.removeEventListener(
      'mouseup',
      this.sortableList_item.eventHandler.doc.mouseUp,
    );
  }
}
