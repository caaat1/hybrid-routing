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
  const dragTolerance = 4;
  const list = document.querySelector('[data-xpath="body/main"]');
  const listItems = list.querySelectorAll(
    '[data-xpath^="body/main/div"]:not([data-xpath*="]/div"])',
  );
  const px = 'px';
  const tmOut = 1e3;
  const wGCS = window.getComputedStyle;

  const zIndexBase = 0;
  let zIndex = 0;

  class CustomProperties {
    el;
    zIndex;
    zIndexBase;
    zIndexIncrement = 1;
    isBeingDragged = false;
    isTransitionEnded = true;
    eventListener = {
      mouseDown: [
        'mousedown',
        (e) => {
          let isGrabbed = this.isTransitionEnded && e.which < 2;
          if (isGrabbed) {
            this.el.classList.add(CSSClass.grabbed);
            document.addEventListener(...this.eventListener.mouseMove);
            document.addEventListener(...this.eventListener.mouseUp);
            this.refPoint = new RefPoint(e.pageX, e.pageY);
          }
        },
      ],
      mouseMove: [
        'mousemove',
        (e) => {
          const delta = this.refPoint.getDelta(e);
          if (this.isBeingDragged) {
            [-1, 1].forEach((sign, index) => {
              let elTrio = [
                this.el.previousElementSibling,
                this.el,
                this.el.nextElementSibling,
              ];
              let sibling = elTrio[sign + 1];
              if (sibling) {
                let isNextElSurpassed =
                  elTrio[index]._.getOffsetCenterY() >
                  elTrio[index + 1]._.getOffsetCenterY();
                if (isNextElSurpassed && sibling._.isTransitionEnded) {
                  list.insertBefore(elTrio[index + 1], elTrio[index]);
                  sibling.style.top = `${sign * this.getOffsetHeightMarginTop()}${px}`;
                  sibling.classList.add(CSSClass.moving);
                  sibling._.isTransitionEnded = false;
                  this.refPoint.y +=
                    sign * sibling._.getOffsetHeightMarginTop();
                  sibling.style.top = 0;
                }
              }
            });
            this.updateOffset(delta);
            return;
          }
          this.isBeingDragged = this.isDragged(delta);
          if (this.isBeingDragged) {
            this.el.classList.remove(CSSClass.animated, CSSClass.grabbed);
            this.el.classList.add(CSSClass.dragged);
            this.incrementZIndex();
          }
        },
      ],
      mouseUp: [
        'mouseup',
        () => {
          if (this.isBeingDragged) {
            this.el.classList.remove(CSSClass.dragged);
            this.el.classList.add(
              CSSClass.animated,
              CSSClass.moving,
              CSSClass.released,
            );
            setTimeout(() => {
              listItems.forEach((el) => {
                el.style.zIndex =
                  wGCS(el).zIndex - (wGCS(el).zIndex > zIndexBase);
              });
              zIndex -= zIndex > zIndexBase;
            }, tmOut);
            this.resetOffset();
            this.isTransitionEnded = false;
            this.isBeingDragged = false;
          }
          this.el.classList.remove(CSSClass.grabbed);
          document.removeEventListener(...this.eventListener.mouseMove);
          document.removeEventListener(...this.eventListener.mouseUp);
        },
      ],
      transitionEnd: [
        'transitionend',
        () => {
          this.isTransitionEnded = true;
          this.el.style.removeProperty('top');
          this.el.classList.remove(CSSClass.moving, CSSClass.released);
        },
      ],
    };
    constructor(el) {
      this.el = el;
      // this.zIndexBase = wGCS(el).zIndex;
      el.classList.add(CSSClass.animated);
      el.addEventListener(...this.eventListener.transitionEnd);
      el.addEventListener(...this.eventListener.mouseDown);
    }
    addEventListener(type) {
      const listener = this.eventListener[type];
      if (listener) {
        this.el.addEventListener(type, this.eventListener[type]);
      }
      return this;
    }
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
    isDragged(delta) {
      return Math.abs(delta.x) + Math.abs(delta.y) > dragTolerance;
    }
    updateOffset(delta) {
      this.el.style.left = pixels(delta.x);
      this.el.style.top = pixels(delta.y);
    }
    resetOffset() {
      this.el.style.top = 0;
      this.el.style.left = 0;
    }
  }

  listItems.forEach((el) => {
    el._ = new CustomProperties(el);
  });
  document.oncontextmenu = (e) => e.preventDefault();
})();
