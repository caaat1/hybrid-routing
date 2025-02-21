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
  eventHandlerClasses = {
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
  };
  event = {};
  isTransitionEnded = true;
  constructor(el) {
    this.el = el;
    // this.eventHandlers = Handlers.create(this);
    this.event = new Event(this);
    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    this.event.getListener(this.el, 'mousedown').add();
    this.event.getListener(this.el, 'transitionend').add();
    this.event.getListener(this.el, 'transitionstart').add();
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
    this.item = item;
    this.handlers = new (class {
      constructor(obj) {
        for (const key in obj) {
          if (Object.hasOwn(obj, key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
              this[key] = new this.constructor(value);
            } else if (typeof value === 'function') {
              this[key] = this.transform(value);
            } else {
              this[key] = value;
            }
          }
        }
      }
      transform(Class) {
        const instance = new Class(item);
        return (e) => instance.handle(e);
      }
    })(item.eventHandlerClasses);
  }
  getListener(node, handlerPath) {
    return new Listener(this.item, node, handlerPath);
  }
}
class Listener {
  constructor(item, node, handlerPath) {
    this.item = item;
    this.node = node;
    this.handlerPath = handlerPath;
  }
  add() {
    this.node.addEventListener(...this.getArgs());
    return this;
  }
  getArgs() {
    const nodeType = this.node.nodeType;
    const handlerPathSegments = this.handlerPath.split('.');
    const eventType = handlerPathSegments[0];
    return [
      eventType,
      this.getDeep(this.item.event.handlers, [
        nodeType,
        ...handlerPathSegments,
      ]),
    ];
  }
  getDeep(obj, path) {
    let current = obj;
    let pathSegments = path.slice();
    for (let key of pathSegments) {
      if (current == null || !(key in current)) {
        return undefined; // Return undefined if path is broken
      }
      current = current[key];
    }
    return current;
  }
  remove() {
    this.node.removeEventListener(...this.getArgs());
    return this;
  }
}
