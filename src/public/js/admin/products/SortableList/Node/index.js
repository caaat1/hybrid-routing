// import Drag from './Drag/index.js';

// export default class Wrapper {
//   CSSClass = {
//     animated: 'animated',
//     dragged: 'dragged',
//     grabbed: 'grabbed',
//     moving: 'moving',
//     pulled: 'pulled',
//     released: 'released',
//   };
//   drag;
//   el;
//   eventListener = {
//     el: {
//       mousedown: [
//         'mousedown',
//         (e) => {
//           if (this.isGrabbable(e)) {
//             this.el.classList.add(this.CSSClass.grabbed);

//             // this.mouseDown = new MouseDown(e.pageX, e.pageY);
//             this.drag = new Drag(this, e);
//             this.eventListener.doc.mousemove.current =
//               this.eventListener.doc.mousemove.pulling[1];
//             document.addEventListener(
//               this.eventListener.doc.mousemove.pulling[0],
//               (e) => this.eventListener.doc.mousemove.current(e),
//             );
//             // document.addEventListener(...this.eventListener.doc.mouseup);
//           }
//         },
//       ],
//     },
//     doc: {
//       mousemove: [
//         'mousemove',
//         {
//           pulling: (e) => {
//             // this.el.classList.add(this.CSSClass.pulled);

//             if (this.drag.isToleranceExceeded(e)) {
//               this.eventListener.doc.mousemove.current =
//                 this.eventListener.doc.mousemove.dragging[1];
//               this.el.classList.remove(
//                 this.CSSClass.animated,
//                 this.CSSClass.grabbed,
//                 this.CSSClass.pulled,
//               );
//               this.el.classList.add(this.CSSClass.dragged);
//               // this.incrementZIndex();
//             }
//           },
//           dragging: (e) => {
//             this.drag.rerender(e);
//           },
//         },
//       ],
//     },
//   };
//   mouseDown;
//   isTransitionEnded = true;

//   constructor(el) {
//     this.el = el;
//     el.classList.add(this.CSSClass.animated);
//     // this.zIndexBase = wGCS(el).zIndex;

//     el.addEventListener(...this.eventListener.el.mousedown);
//   }
//   isGrabbable(e) {
//     return this.isTransitionEnded && e.which < 2;
//   }
// }
export default class Node {
  item;
  next;
  prev;

  constructor(item, prev, itemIterator) {
    this.item = item;
    this.prev = prev;
    this.next = Node.build(this, itemIterator);
  }

  static build(prev, itemIterator) {
    const {value, done} = itemIterator.next();
    return done ? null : new Node(value, prev, itemIterator);
  }
}
