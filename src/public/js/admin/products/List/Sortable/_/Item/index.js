import DragStart from './Ev/Doc/MouseMove/DragStart/index.js';
import MouseUp from './Ev/Doc/MouseUp/index.js';
import MouseDown from './Ev/El/MouseDown/index.js';
import TransitionEnd from './Ev/El/TransitionEnd/index.js';
import TransitionRun from './Ev/El/TransitionRun/index.js';
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
  event = {};
  isTransitionEnded = true;
  constructor(el) {
    this.el = el;
    this.event = new Event(this);
    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    this.event
      .listenerOn(this.el)
      .set('mousedown')
      .set('transitionend')
      .set('transitionstart');
    return this;
  }
  addStyles() {
    this.el.classList.add(this.CSSClass.animated);
    return this;
  }
  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }
}
class Event {
  constructor(item) {
    this.handlers = new (class {
      constructor(handlerStructure) {
        for (const key in handlerStructure) {
          if (Object.hasOwn(handlerStructure, key)) {
            const value = handlerStructure[key];
            if (typeof value === 'object' && value !== null) {
              this[key] = new this.constructor(value);
            } else if (typeof value === 'function') {
              this[key] = this.transform(value);
            } else {
              throw new Error('Invalid handler structure');
            }
          }
        }
      }
      transform(Class) {
        const instance = new Class(item);
        return (e) => instance.handle(e);
      }
    })({
      [Node.DOCUMENT_NODE]: {
        mousemove: {
          dragStart: DragStart,
        },
        mouseup: MouseUp,
      },
      [Node.ELEMENT_NODE]: {
        mousedown: MouseDown,
        transitionend: TransitionEnd,
        transitionrun: TransitionRun,
        transitionstart: TransitionStart,
      },
    });
  }
  listenerOn(node) {
    return new (class {
      set;
      unset;
      constructor(This, node) {
        const getArgs = (handlerPath) => {
          const nodeType = node.nodeType;
          const handlerPathSegments = handlerPath.split('.');
          const eventType = handlerPathSegments[0];
          let current = This.handlers;
          for (let key of [nodeType, ...handlerPathSegments]) {
            if (current == null || !(key in current)) {
              throw new Error(
                `Invalid handler path: '${handlerPath}' at '${key}'`,
              );
            }
            current = current[key];
          }
          return [eventType, current];
        };
        this.set = (handlerPath) => {
          node.addEventListener(...getArgs(handlerPath));
          return this;
        };
        this.unset = (handlerPath) => {
          node.removeEventListener(...getArgs(handlerPath));
          return this;
        };
      }
    })(this, node);
  }
}
