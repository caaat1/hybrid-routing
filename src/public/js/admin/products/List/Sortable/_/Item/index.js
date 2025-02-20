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
  eventHandlers = {};
  isTransitionEnded = true;

  constructor(el) {
    this.el = el;
    this.addStyles().addEventListeners();
  }

  addEventListeners() {
    this.setEventListener(this.el, 'mousedown')
      .setEventListener(this.el, 'transitionend')
      .setEventListener(this.el, 'transitionstart');
    return this;
  }

  addStyles() {
    this.el.classList.add(this.CSSClass.animated);
    return this;
  }

  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }

  getEvent(node, eventHandlerPath) {
    const nodeType = node.nodeType;
    const eventHandlerPathSegments = [nodeType, ...eventHandlerPath.split('.')];
    return {
      type: eventHandlerPathSegments[1],
      handlerPathSegments: eventHandlerPathSegments,
    };
  }
  setEventListener(node, eventHandlerPath) {
    const event = this.getEvent(node, eventHandlerPath);
    const EventHandlerClass = getDeep(
      this.eventHandlerClasses,
      event.handlerPathSegments,
    );
    const eventHandlerInstance = new EventHandlerClass(this);
    const eventHandler = (e) => eventHandlerInstance.handle(e);
    setDeep(this.eventHandlers, event.handlerPathSegments, eventHandler);
    node.addEventListener(event.type, eventHandler);
    return this;
  }
  unsetEventListener(node, eventHandlerPath) {
    const event = this.getEvent(node, eventHandlerPath);
    const eventHandler = getDeep(this.eventHandlers, event.handlerPathSegments);
    node.removeEventListener(event.type, eventHandler);
    return this;
  }
}
function getDeep(obj, path) {
  let current = obj;

  for (let key of path) {
    if (current == null || !(key in current)) {
      return undefined; // Return undefined if path is broken
    }
    current = current[key];
  }

  return current; // Return the final value
}
// function isClass(value) {
//   try {
//     Reflect.construct(String, [], value);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }
function setDeep(obj, path, value) {
  let current = obj;
  let lastKey = path.pop(); // Extract the last key to set the value later

  for (let key of path) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}; // Ensure intermediate objects exist
    }
    current = current[key]; // Move deeper
  }

  current[lastKey] = value; // Set the final value
}
