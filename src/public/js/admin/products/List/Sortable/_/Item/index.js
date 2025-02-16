import MouseMove from './Ev/Doc/MouseMove/index.js';
import MouseUp from './Ev/Doc/MouseUp/index.js';
import MouseDown from './Ev/El/MouseDown/index.js';
import TransitionEnd from './Ev/El/TransitionEnd/index.js';
import TransitionStart from './Ev/El/TransitionStart/index.js';

export default class Item {
  CSSClass = {
    animated: 'animated',
    dragged: 'dragged',
    grabbed: 'grabbed',
    moving: 'moving',
    released: 'released',
  };
  drag;
  el;
  eventHandler;
  isTransitionEnded = true;
  constructor(el) {
    this.el = el;
    this.eventHandlerObj = {
      doc: {
        mouseMove: new MouseMove(this),
        mouseUp: new MouseUp(this),
      },
      el: {
        mouseDown: new MouseDown(this),
        transitionEnd: new TransitionEnd(this),
        transitionStart: new TransitionStart(this),
      },
    };
    this.eventHandler = {
      doc: {
        mouseMove: (e) => this.eventHandlerObj.doc.mouseMove.handle(e),
        mouseUp: (e) => this.eventHandlerObj.doc.mouseUp.handle(e),
      },
      el: {
        mouseDown: (e) => this.eventHandlerObj.el.mouseDown.handle(e),
        transitionEnd: (e) => this.eventHandlerObj.el.transitionEnd.handle(e),
        transitionStart: (e) =>
          this.eventHandlerObj.el.transitionStart.handle(e),
      },
    };
    this.addStyles();
    this.addEventListeners();
  }
  addStyles() {
    this.el.classList.add(this.CSSClass.animated);
  }
  addEventListeners() {
    this.el.addEventListener('mousedown', this.eventHandler.el.mouseDown);
    this.el.addEventListener(
      'transitionend',
      this.eventHandler.el.transitionEnd,
    );
    this.el.addEventListener(
      'transitionstart',
      this.eventHandler.el.transitionStart,
    );
  }
  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }
}
