import ElementEvent from '../index.js';

export default class TransitionEnd extends ElementEvent {
  handle() {
    this.sortableList_item.isTransitionEnded = true;
    this.sortableList_item.el.style.removeProperty('left');
    this.sortableList_item.el.style.removeProperty('top');
    this.sortableList_item.el.style.removeProperty('z-index');
    this.sortableList_item.el.classList.remove(
      this.sortableList_item.CSSClass.moving,
      this.sortableList_item.CSSClass.released,
    );
  }
}
