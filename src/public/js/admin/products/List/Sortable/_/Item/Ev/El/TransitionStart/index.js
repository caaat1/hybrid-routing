import ElementEvent from '../index.js';

export default class TransitionStart extends ElementEvent {
  handle = (e) => {
    console.log('transition started');
    this.sortableList_item.isTransitionEnded = false;
    this.sortableList_item.el.classList.add(
      this.sortableList_item.CSSClass.moving,
    );
  };
}
