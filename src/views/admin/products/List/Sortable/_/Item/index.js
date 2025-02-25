// import After from './Ev/Doc/MouseMove/DragStart/After/index.js';
// import Before from './Ev/Doc/MouseMove/DragStart/Before/index.js';
// import MouseUp from './Ev/Doc/MouseUp/index.js';
// import MouseDown from './Ev/El/MouseDown/index.js';
// import TransitionEnd from './Ev/El/TransitionEnd/index.js';
// import TransitionRun from './Ev/El/TransitionRun/index.js';
// import TransitionStart from './Ev/El/TransitionStart/index.js';

import Drag from './Drag/Transform/index.js';

export default class Item {
  CSSClass = {
    animated: 'animated',
    dragged: 'dragged',
    grabbed: 'grabbed',
    moving: 'moving',
    released: 'released',
  };
  drag;
  element;
  eventListener;
  isTransitionEnded = true; // LOC:
  otherElements;
  constructor(element, otherElements) {
    this.element = element;
    this.otherElements = otherElements;

    // this.mouseDown = new MouseDown(new OnElement(this));
    // this.transitionEnd = new TransitionEnd(new OnElement(this));
    // this.transitionStart = new TransitionStart(new OnElement(this));
    // this.mouseMove = {
    //   dragStart: {
    //     after: new After(new OnDocument(this)),
    //     before: new Before(new OnDocument(this)),
    //   },
    // };
    this.compositeHandlers = new this.compositeHandlers(this);
    this.compositeHandlers.add(new DocumentHandlers(this));
    this.compositeHandlers.add(new ElementHandlers(this));

    this.addStyles().addEventListeners();
  }
  addEventListeners() {
    this.element.addEventListener('mousedown', this.mouseDown.handler);
    this.element.addEventListener('transitionend', this.transitionEnd.handler);
    this.element.addEventListener(
      'transitionstart',
      this.transitionStart.handler,
    );
    // this.eventListenerOn(this.element)
    //   .set('mousedown')
    //   .set('transitionend')
    //   .set('transitionstart');
    return this;
  }
  addStyles() {
    this.element.classList.add(this.CSSClass.animated);
    return this;
  }
  isGrabbable(e) {
    return this.isTransitionEnded && e.which < 2;
  }
}

class 
// class EventListener {
//   constructor(item) {
//     const handlers = new (class {
//       constructor(handlerStructure) {
//         for (const key in handlerStructure) {
//           if (Object.hasOwn(handlerStructure, key)) {
//             const value = handlerStructure[key];
//             if (typeof value === 'object' && value !== null) {
//               this[key] = new this.constructor(value);
//             } else if (typeof value === 'function') {
//               this[key] = this.transform(value);
//             } else {
//               throw new Error('Invalid handler structure');
//             }
//           }
//         }
//       }
//       transform(Class) {
//         const instance = new Class(item);
//         return (e) => instance.handle(e);
//       }
//     })({
//       [Node.DOCUMENT_NODE]: {
//         mousemove: {
//           dragStart: {
//             after: After,
//             before: Before,
//           },
//         },
//         mouseup: MouseUp,
//       },
//       [Node.ELEMENT_NODE]: {
//         mousedown: MouseDown,
//         transitionend: TransitionEnd,
//         transitionrun: TransitionRun,
//         transitionstart: TransitionStart,
//       },
//     });
//     this.on = (node) =>
//       new (class {
//         set;
//         remove;
//         constructor(node) {
//           const getArgs = (handlerPath) => {
//             const nodeType = node.nodeType;
//             const handlerPathSegments = handlerPath.split('.');
//             const eventType = handlerPathSegments[0];
//             let current = handlers;
//             for (let key of [nodeType, ...handlerPathSegments]) {
//               if (current == null || !(key in current)) {
//                 throw new Error(
//                   `Invalid handler path: '${handlerPath}' at '${key}'`,
//                 );
//               }
//               current = current[key];
//             }
//             return [eventType, current];
//           };
//           this.set = (handlerPath) => {
//             node.addEventListener(...getArgs(handlerPath));
//             return this;
//           };
//           this.remove = (handlerPath) => {
//             node.removeEventListener(...getArgs(handlerPath));
//             return this;
//           };
//         }
//       })(node);
//   }
// }
class OnNodeType {
  constructor(item) {
    this.item = item;
  }
}
class OnDocument extends OnNodeType {}
class OnElement extends OnNodeType {}

class EventHandler {
  eventType;
  handle = (e) => {
    void e;
  };
  nodeType;
  constructor(nodeType) {
    this.nodeType = nodeType;
    this.eventType = this.constructor.name.toLowerCase();
    this.handler = (e) => {
      this.handle(e);
    };
  }
  // add(/* ...getArgs */) {
  //   console.log(this.getOwn('element'));
  //   this.getOwn('element').addEventListener(this.getOwn('name'), this.handler);
  // }
  // getOwn(property) {
  //   let client = this;
  //   console.log(this);
  //   while ('client' in client) {
  //     // console.log('here');
  //     if (property in client) {
  //       return client[property];
  //     }
  //     client = client.client;
  //   }
  //   throw new Error(
  //     `Property ${property} not found in the inheritance chain of ${this.constructor.name}`,
  //   );
  // }
  // remove(/* ...getArgs */) {
  //   // console.log('removing: ', this.name, this.handler);

  //   this.getOwn('element').removeEventListener(
  //     this.getOwn('name'),
  //     this.handler,
  //   );
  // }
}
// class Extension {}
// class EventHandlerExtension /*  extends EventType */ {
//   constructor(prev) {}
// }
class MouseDown extends EventHandler {
  // name = 'mousedown';
  handle = (e) => {
    const item = this.nodeType.item;

    if (item.isGrabbable(e)) {
      item.element.classList.add(item.CSSClass.grabbed);
      item.drag = new Drag(this, e);

      // console.log(this.item.eventListener.document.mousemove.dragStart.before);

      // item.eventListener.document.mousemove.dragStart.before.add();
      // item.eventListener.document.mouseup.add();
    }
  };
}
class TransitionEnd extends EventHandler {
  handle = (e) => {
    // super.handle(e);
    const item = this.nodeType.item;

    item.isTransitionEnded = true;
    item.drag.resetProperties();
    item.element.classList.remove(item.CSSClass.moving, item.CSSClass.released);
  };
}
class TransitionRun extends EventHandler {}
class TransitionStart extends EventHandler {
  handle = (e) => {
    super.handle(e);
    // console.log('transition started');

    this.item.isTransitionEnded = false;
    this.item.element.classList.add(this.item.CSSClass.moving);
  };
  // constructor(item) {
  //   super(item);
  // }
}
// class MouseMove extends EventHandlers {
//   // name = 'mousemove';
//   dragStart = new DragStart(this);
// }
// class DragStart extends EventHandlers {
//   after = new After(this);
//   before = new Before(this);
// }
// class After extends EventHandlers {
//   handle = (e) => {
//     // console.log('there!');

//     const item = this.getEventType();
//     item.drag.rerender(e);
//   };
// }
// class Before extends EventHandlers {
//   handle = (e) => {
//     // console.log('here!');

//     const item = this.getEventType();
//     if (item.drag.isToleranceExceeded(e)) {
//       // item.element.classList.add(this.CSSClass.pulled);

//       // console.log(item.eventListener.document.mousemove.dragStart.before);

//       item.eventListener.document.mousemove.dragStart.before.remove();
//       item.eventListener.document.mousemove.dragStart.after.add();
//       item.element.classList.remove(
//         item.CSSClass.animated,
//         item.CSSClass.grabbed,
//         item.CSSClass.pulled,
//       );
//       item.element.classList.add(item.CSSClass.dragged);
//       // item.incrementZIndex();
//     }
//   };
// }
// class MouseUp extends EventHandlers {
//   handle = (e) => {
//     // console.log('MouseUp');
//     super.handle(e);
//     this.item.drag.resetOffset(); // Any use?
//     this.item.element.classList.remove(this.item.CSSClass.dragged);
//     this.item.element.classList.add(
//       this.item.CSSClass.animated,
//       this.item.CSSClass.released,
//     );
//     this.item.eventListener.document.mousemove.dragStart.before.remove();
//     this.item.eventListener.document.mousemove.dragStart.after.remove();
//     this.item.eventListener.document.mouseup.remove();
//   };
// }
