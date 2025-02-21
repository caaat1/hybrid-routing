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
    this.eventHandlers = this.mapEventHandlerClasses(
      this.eventHandlerClasses,
      (Class) => {
        const instance = new Class(this);
        return (e) => instance.handle(e);
      },
    );
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
  mapEventHandlerClasses(obj, transform) {
    const result = {}; // Preserve array/object structure
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
          // If the value is an object, recurse
          result[key] = this.mapEventHandlerClasses(value, transform);
        } else if (typeof value === 'function') {
          // If the value is a class (function), apply the transformation
          result[key] = transform(value);
        } else {
          // Preserve non-class leaf values as they are
          result[key] = value;
        }
      }
    }
    return result;
  }
  setEventListener(node, eventHandlerPath) {
    const event = this.getEvent(node, eventHandlerPath);
    const eventHandler = getDeep(this.eventHandlers, event.handlerPathSegments);
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
  let pathSegments = path.slice();
  for (let key of pathSegments) {
    if (current == null || !(key in current)) {
      return undefined; // Return undefined if path is broken
    }
    current = current[key];
  }
  return current;
}
// function isClass(value) {
//   try {
//     Reflect.construct(String, [], value);
//     return true;
//   } catch (e) {
//     return false;
//   }
// }
// function iterateObject(obj, callback) {
//   // Iterate over each property in the object
//   for (const key in obj) {
//     if (Object.hasOwn(obj, key)) {
//       // Check if the value is an object (and not null)
//       if (typeof obj[key] === 'object' && obj[key] !== null) {
//         // If it's an object, recursively call iterateObject on it
//         iterateObject(obj[key], callback);
//       } else {
//         // If it's not an object, call the callback with the key and value
//         callback(key, obj[key]);
//       }
//     }
//   }
// }
// function setDeep(obj, path, value) {
//   let current = obj;
//   const lastKey = path.at(-1);
//   const pathSegments = path.slice(0, -1);
//   for (let key of pathSegments) {
//     if (!(key in current) || typeof current[key] !== 'object') {
//       current[key] = {}; // Create missing objects
//     }
//     current = current[key]; // Move deeper
//   }
//   current[lastKey] = value; // ✅ Modifies the actual object!
// }
