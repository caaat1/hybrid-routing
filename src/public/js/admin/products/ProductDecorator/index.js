// import pixels from '../pixels/index.js';
// import RefPoint from '../RefPoint/index.js';

// export default class ProductDecorator {
//   CSSClass = {
//     animated: 'animated',
//     dragged: 'dragged',
//     grabbed: 'grabbed',
//     moving: 'moving',
//     released: 'released',
//   };
//   dragTolerance = 4;
//   tmOut = 1e3;
//   wGCS = window.getComputedStyle;
//   zIndBase = 0;
//   zInd = 0;

//   el;
//   isBeingDragged = false;
//   isTransitionEnded = true;
//   eventListener = {
//     mouseDown: [
//       'mousedown',
//       (e) => {
//         let isGrabbed = this.isTransitionEnded && e.which < 2;
//         if (isGrabbed) {
//           this.el.classList.add(this.CSSClass.grabbed);
//           document.addEventListener(...this.eventListener.mouseMove);
//           document.addEventListener(...this.eventListener.mouseUp);
//           this.refPoint = new RefPoint(e.pageX, e.pageY);
//         }
//       },
//     ],
//     mouseMove: [
//       'mousemove',
//       (e) => {
//         if (this.isBeingDragged) {
//           [-1, 1].forEach((sign, index) => {
//             let elTrio = [
//               this.el.previousElementSibling,
//               this.el,
//               this.el.nextElementSibling,
//             ];
//             let sibling = elTrio[sign + 1];
//             if (sibling) {
//               let isNextElSurpassed =
//                 elTrio[index]._.getOffsetCenterY() >
//                 elTrio[index + 1]._.getOffsetCenterY();
//               if (isNextElSurpassed && sibling._.isTransitionEnded) {
//                 list.insertBefore(elTrio[index + 1], elTrio[index]);
//                 sibling.style.top = `${sign * this.getOffsetHeightMarginTop()}${px}`;
//                 sibling.classList.add(CSSClass.moving);
//                 sibling._.isTransitionEnded = false;
//                 this.refPoint.y += sign * sibling._.getOffsetHeightMarginTop();
//                 sibling.style.top = 0;
//               }
//             }
//           });
//           this.el.style.left = pixels(this.refPoint.getDelta(e).x);
//           this.el.style.top = pixels(this.refPoint.getDelta(e).y);
//         } else {
//           this.isBeingDragged =
//             Math.abs(this.refPoint.getDelta(e).x) +
//               Math.abs(this.refPoint.getDelta(e).y) >
//             dragTolerance;
//           if (this.isBeingDragged) {
//             this.el.classList.remove(CSSClass.animated, CSSClass.grabbed);
//             this.el.classList.add(CSSClass.dragged);
//             zInd++;
//             this.el.style.zIndex = zInd;
//           }
//         }
//       },
//     ],
//     mouseUp: [
//       'mouseup',
//       () => {
//         setTimeout(() => {
//           if (this.isBeingDragged) {
//             this.el.classList.remove(CSSClass.dragged);
//             this.el.classList.add(
//               this.CSSClass.animated,
//               this.CSSClass.moving,
//               this.CSSClass.released,
//             );
//             setTimeout(() => {
//               listItems.forEach(
//                 (el) =>
//                   (el.style.zIndex =
//                     wGCS(el).zIndex - (wGCS(el).zIndex > zIndBase)),
//               );
//               zInd -= zInd > zIndBase;
//             }, tmOut);
//             this.el.style.top = 0;
//             this.isTransitionEnded = false;
//           }
//           this.el.classList.remove(CSSClass.grabbed);
//           this.isBeingDragged = false;
//           this.el.style.left = 0;
//         }, 10);
//         document.removeEventListener(...this.eventListener.mouseMove);
//         document.removeEventListener(...this.eventListener.mouseUp);
//       },
//     ],
//     transitionEnd: [
//       'transitionend',
//       () => {
//         this.isTransitionEnded = true;
//         this.el.style.removeProperty('top');
//         this.el.classList.remove(this.CSSClass.moving, this.CSSClass.released);
//       },
//     ],
//   };
//   constructor(el) {
//     this.el = el;
//     el.classList.add(this.CSSClass.animated);
//     el.addEventListener(...el._.eventListener.transitionEnd);
//     el.addEventListener(...el._.eventListener.mouseDown);
//   }
//   getOffsetCenterY() {
//     return this.el.offsetTop + this.el.offsetHeight / 2;
//   }
//   getOffsetHeightMarginTop() {
//     return this.el.offsetHeight + parseFloat(this.wGCS(this.el).marginTop);
//   }
//   //   addEventListener(type) {
//   //     const listener = this.eventListener[type];
//   //     if (listener) {
//   //       this.el.addEventListener(type, this.eventListener[type]);
//   //     }
//   //     return this;
//   //   }
// }
