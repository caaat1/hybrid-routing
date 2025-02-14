import Drag from './Drag/index.js';
import pixels from './pixels/index.js';
import RefPoint from './RefPoint/index.js';

(function () {
  'use strict';
  const CSSClass = {
    animated: 'animated',
    dragged: 'dragged',
    grabbed: 'grabbed',
    moving: 'moving',
    released: 'released',
  };
  const list = document.querySelector('[data-xpath="body/main"]');
  const listItems = list.querySelectorAll(
    '[data-xpath^="body/main/div"]:not([data-xpath*="]/div"])',
  );
  const px = 'px';
  const tmOut = 2e3;
  const wGCS = window.getComputedStyle;

  const zIndexBase = 0;
  let zIndex = 0;

  class CustomProperties {
    el;
    zIndex;
    zIndexBase;
    zIndexIncrement = 1;
    _isBeingDragged = false;
    // isBeingDragged = false;
    isTransitionEnded = true;
    eventListener = {
      elt: {
        mousedown: [
          'mousedown',
          (e) => {
            if (this.isGrabAllowed(e)) {
              this.el.classList.add(CSSClass.grabbed);
              document.addEventListener(...this.eventListener.doc.mousemove);
              document.addEventListener(...this.eventListener.doc.mouseup);
              this.refPoint = new RefPoint(e.pageX, e.pageY);
            }
          },
        ],
        transitionend: [
          'transitionend',
          () => {
            this.isTransitionEnded = true;
            this.el.style.removeProperty('left');
            this.el.style.removeProperty('top');
            this.el.style.removeProperty('z-index');
            this.el.classList.remove(CSSClass.moving, CSSClass.released);
          },
        ],
        transitionstart: [
          'transitionstart',
          () => {
            this.isTransitionEnded = false;
            this.el.classList.add(CSSClass.moving);
          },
        ],
      },
      doc: {
        mousemove: [
          'mousemove',
          (e) => {
            this.refPoint.e = e;
            if (this.isBeingDragged) {
              this.handleDragReorder();
              return;
            }
            this.isBeingDragged = new Drag(
              this.refPoint.delta,
            ).isToleranceExceeded;
            if (this.isBeingDragged) {
              this.el.classList.remove(CSSClass.animated, CSSClass.grabbed);
              this.el.classList.add(CSSClass.dragged);
              this.incrementZIndex();
            }
          },
        ],
        mouseup: [
          'mouseup',
          () => {
            if (this.isBeingDragged) {
              this.el.classList.remove(CSSClass.dragged);
              this.el.classList.add(CSSClass.animated, CSSClass.released);
              this.updateZIndexAll();
              this.resetOffset();
            } else {
              this.el.classList.remove(CSSClass.grabbed);
            }
            this.isBeingDragged = false;
            document.removeEventListener(...this.eventListener.doc.mousemove);
            document.removeEventListener(...this.eventListener.doc.mouseup);
          },
        ],
      },
    };
    constructor(el) {
      this.el = el;
      // this.zIndexBase = wGCS(el).zIndex;
      el.classList.add(CSSClass.animated);
      el.addEventListener(...this.eventListener.elt.mousedown);
      el.addEventListener(...this.eventListener.elt.transitionend);
      el.addEventListener(...this.eventListener.elt.transitionstart);
    }
    get isBeingDragged() {
      return this._isBeingDragged;
    }
    set isBeingDragged(value) {
      this._isBeingDragged = value;
    }
    // addEventListener(type) {
    //   const listener = this.eventListener[type];
    //   if (listener) {
    //     this.el.addEventListener(type, this.eventListener[type]);
    //   }
    //   return this;
    // }
    getOffsetCenterY() {
      return this.el.offsetTop + this.el.offsetHeight / 2;
    }
    getOffsetHeightMarginTop() {
      return this.el.offsetHeight + parseFloat(wGCS(this.el).marginTop);
    }
    // decrementZIndex() {
    //   const zIndexTentative = this.zIndex - this.zIndexIncrement;
    //   if (this.zIndexBase == 'auto') {
    //     if(zIndexTentative){}
    //   }
    //   if (this.zIndex != this.zIndexBase) {
    //     this.zIndex -= this.zIndexIncrement;
    //   }
    //   this.el.style.zIndex = this.zIndex;
    // }
    handleDragReorder() {
      let elTrio = [
        this.el.previousElementSibling,
        this.el,
        this.el.nextElementSibling,
      ];
      let siblings = [
        this.el.previousElementSibling,
        this.el.nextElementSibling,
      ];
      siblings.forEach((sibling, index) => {
        if (sibling) {
          let isOrderChanged =
            elTrio[index]._.getOffsetCenterY() >
            elTrio[index + 1]._.getOffsetCenterY();

          if (isOrderChanged && sibling._.isTransitionEnded) {
            list.insertBefore(elTrio[index + 1], elTrio[index]);
            let sign = index ? 1 : -1;
            sibling.style.top = `${sign * this.getOffsetHeightMarginTop()}${px}`;
            this.refPoint.y = sign * sibling._.getOffsetHeightMarginTop();
            sibling._.resetOffset();
          }
        }
      });
      this.updateOffset();
    }
    // incrementZIndex() {
    //   if (this.zIndex == 'auto') {
    //     this.zIndex = this.zIndexIncrement; // or 1?
    //   } else {
    //     this.zIndex += this.zIndexIncrement;
    //   }
    //   this.el.style.zIndex = this.zIndex;
    // }
    incrementZIndex() {
      this.el.style.zIndex = ++zIndex;
    }
    // isDragToleranceExceeded() {
    //   return (
    //     Math.abs(this.refPoint.delta.x) + Math.abs(this.refPoint.delta.y) >
    //     dragTolerance
    //   );
    // }
    isGrabAllowed(event) {
      return this.isTransitionEnded && event.which < 2;
    }
    resetOffset() {
      this.el.style.top = 0;
      this.el.style.left = 0;
    }
    updateOffset() {
      this.el.style.left = pixels(this.refPoint.delta.x);
      this.el.style.top = pixels(this.refPoint.delta.y);
    }
    updateZIndexAll() {
      setTimeout(() => {
        listItems.forEach((el) => {
          el.style.zIndex = wGCS(el).zIndex - (wGCS(el).zIndex > zIndexBase);
        });
        zIndex -= zIndex > zIndexBase;
      }, tmOut);
    }
  }
  listItems.forEach((el) => {
    el._ = new CustomProperties(el);
  });
  document.oncontextmenu = (e) => e.preventDefault();
})();
