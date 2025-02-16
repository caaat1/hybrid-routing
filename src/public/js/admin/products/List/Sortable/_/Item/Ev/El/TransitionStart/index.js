import ElementEvent from '../index.js';

export default class TransitionStart extends ElementEvent {
  handle() {
    this.sortableList_item.isTransitionEnded = false;
    this.sortableList_item.el.classList.add(
      this.sortableList_item.CSSClass.moving,
    );
  }
}
