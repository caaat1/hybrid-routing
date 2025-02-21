import toPx from '../../../../../../toPx/index.js';
import Drag from '../index.js';

export default class Transform extends Drag {
  rerender(e) {
    const dX = toPx(e.pageX - this.e.dragStart.pageX);
    const dY = toPx(e.pageY - this.e.dragStart.pageY);
    this.sortableList_item.el.style.transform = `translate(${dX}, ${dY})`;
  }
  resetOffset() {
    this.sortableList_item.el.style.transform = 'none';
  }
  resetProperties() {
    this.sortableList_item.el.style.removeProperty('transform');
  }
}
