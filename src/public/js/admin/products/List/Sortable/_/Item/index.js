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
    this.eventHandlers = Handlers.create(this);
    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    new Listener(this)
      .set(this.el, 'mousedown')
      .set(this.el, 'transitionend')
      .set(this.el, 'transitionstart');
    return this;
  }
  addStyles() {
    this.el.classList.add(this.CSSClass.animated);
    return this;
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
  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }

  // getEvent(node, eventHandlerPath) {
  //   const nodeType = node.nodeType;
  //   const eventHandlerPathSegments = [nodeType, ...eventHandlerPath.split('.')];
  //   return {
  //     type: eventHandlerPathSegments[1],
  //     handlerPathSegments: eventHandlerPathSegments,
  //   };
  // }
  // mapEventHandlerClasses(obj, transform) {
  //   const result = {}; // Preserve array/object structure
  //   for (const key in obj) {
  //     if (Object.hasOwn(obj, key)) {
  //       const value = obj[key];
  //       if (typeof value === 'object' && value !== null) {
  //         // If the value is an object, recurse
  //         result[key] = this.mapEventHandlerClasses(value, transform);
  //       } else if (typeof value === 'function') {
  //         // If the value is a class (function), apply the transformation
  //         result[key] = transform(value);
  //       } else {
  //         // Preserve non-class leaf values as they are
  //         result[key] = value;
  //       }
  //     }
  //   }
  //   return result;
  // }
  // setEventListener(node, eventHandlerPath) {
  //   const event = this.getEvent(node, eventHandlerPath);
  //   const eventHandler = getDeep(this.eventHandlers, event.handlerPathSegments);
  //   node.addEventListener(event.type, eventHandler);
  //   return this;
  // }
  // unsetEventListener(node, eventHandlerPath) {
  //   const event = this.getEvent(node, eventHandlerPath);
  //   const eventHandler = getDeep(this.eventHandlers, event.handlerPathSegments);
  //   node.removeEventListener(event.type, eventHandler);
  //   return this;
  // }
}
// function getDeep(obj, path) {
//   let current = obj;
//   let pathSegments = path.slice();
//   for (let key of pathSegments) {
//     if (current == null || !(key in current)) {
//       return undefined; // Return undefined if path is broken
//     }
//     current = current[key];
//   }
//   return current;
// }
class Handlers {
  static item = this;
  constructor(item, obj) {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          // If the value is an object, recurse
          this[key] = new this.constructor(item, value);
        } else if (typeof value === 'function') {
          // If the value is a class (function), apply the transformation
          this[key] = this.transform(item, value);
        } else {
          // Preserve non-class leaf values as they are
          this[key] = value;
        }
      }
    }
    // console.log(Handlers.item);
  }
  static create(item) {
    const obj = item.eventHandlerClasses;
    const instance = new this(item, obj);
    return instance;
  }
  transform(item, Class) {
    const instance = new Class(item);
    return (e) => instance.handle(e);
  }
}
export class Listener {
  constructor(item) {
    this.item = item;

    // this.node = node;
    // this.nodeType = node.nodeType;

    // const handlerPathSegments = handlerPath.split('.');

    // this.type = handlerPathSegments[0];
    // this.handlerPathSegments = [
    //   this.nodeType,
    //   ...handlerPathSegments.split('.'),
    // ];

    // this.eventHandler = getDeep(this, this.handlerPathSegments);
  }
  getArgs(node, handlerPath) {
    const nodeType = node.nodeType;
    let handlerPathSegments = handlerPath.split('.');
    const eventType = handlerPathSegments[0];
    handlerPathSegments = [nodeType, ...handlerPath.split('.')];
    return [
      eventType,
      this.item.getDeep(this.item.eventHandlers, handlerPathSegments),
    ];
  }
  set(node, handlerPath) {
    node.addEventListener(...this.getArgs(node, handlerPath));
    return this;
  }
  unset(node, handlerPath) {
    node.removeEventListener(...this.getArgs(node, handlerPath));
    return this;
  }
}
