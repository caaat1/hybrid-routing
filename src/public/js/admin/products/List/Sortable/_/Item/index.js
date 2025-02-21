import After from './Ev/Doc/MouseMove/DragStart/After/index.js';
import Before from './Ev/Doc/MouseMove/DragStart/Before/index.js';
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
  eventListenerOn = {};
  isTransitionEnded = true;
  constructor(el) {
    this.el = el;
    const eventListener = new EventListener(this);
    this.eventListenerOn = eventListener.on.bind(eventListener);
    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    this.eventListenerOn(this.el)
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
class EventListener {
  constructor(item) {
    const handlers = new (class {
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
          dragStart: {
            after: After,
            before: Before,
          },
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
    this.on = (node) =>
      new (class {
        set;
        unset;
        constructor(node) {
          const getArgs = (handlerPath) => {
            const nodeType = node.nodeType;
            const handlerPathSegments = handlerPath.split('.');
            const eventType = handlerPathSegments[0];
            let current = handlers;
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
      })(node);
  }
}
