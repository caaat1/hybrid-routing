(function () {
  const CSSClass = {
    anim: 'animated',
    bD: 'is-being-dragged',
    mD: 'grabbed',
    mv: 'moving',
  };
  const dragTolerance = 4;
  const eventName = {
    mouseDown: 'mousedown',
    mouseMove: 'mousemove',
    mouseUp: 'mouseup',
    transitionEnd: 'transitionend',
  };
  const list = document.querySelector('[data-xpath="body/main"]');
  const listItems = list.querySelectorAll(
    '[data-xpath^="body/main/div"]:not([data-xpath*="]/div"])',
  );
  const mouseStartProperty = {
    name: 'mouseStart',
    definition: {
      value: {x: undefined, y: undefined},
      writable: false, // Prevent reassignment but allow modifications inside
      enumerable: false, // Hide from `Object.keys()`
      configurable: false, // Prevent deletion or reconfiguration
    },
  };
  const px = 'px';
  const tmOut = 1000;
  const wGCS = window.getComputedStyle;
  const zIndBase = 0;
  let zInd = 0;

  listItems.forEach((item) => {
    if (undefined === item.property) {
      Object.defineProperty(item, 'property', {
        value: {},
        writable: false, // Prevent reassignment but allow modifications inside
        enumerable: false, // Hide from `Object.keys()`
        configurable: false, // Prevent deletion or reconfiguration
      });
    }
    item.property.isTransitionEnded = true;
    item.classList.add(CSSClass.anim);
    item.addEventListener(eventName.transitionEnd, () => {
      item.property.isTransitionEnded = true;
      item.style.removeProperty('top');
      item.classList.remove(CSSClass.bD, CSSClass.mv);
    });

    item.property.eventHandler = {
      mouseMove: (e) => {
        if (item.property.isBeingDragged) {
          [0, 2].forEach((value, index) => {
            let adjacentItems = [
              item.previousElementSibling,
              item,
              item.nextElementSibling,
            ];
            let sibling = adjacentItems[value];
            if (sibling) {
              let isNextNeighborOverlapped =
                adjacentItems[index].offsetTop +
                  adjacentItems[index].offsetHeight / 2 >
                adjacentItems[index + 1].offsetTop +
                  adjacentItems[index + 1].offsetHeight / 2;
              if (
                isNextNeighborOverlapped &&
                sibling.property.isTransitionEnded
              ) {
                const oHmT = (el) =>
                  (value - 1) *
                  (el.offsetHeight + parseFloat(wGCS(el).marginTop));
                list.insertBefore(
                  adjacentItems[index + 1],
                  adjacentItems[index],
                );
                sibling.style.top = oHmT(item) + px;
                sibling.classList.add(CSSClass.mv);
                sibling.property.isTransitionEnded = false;
                item.property.mouseStart.y += oHmT(sibling);
                sibling.style.top = 0;
              }
            }
          });
          item.style.left = `${e.pageX - item.property.mouseStart.x}${px}`;
          item.style.top = `${e.pageY - item.property.mouseStart.y}${px}`;
        } else {
          if (undefined === item.property.mouseStart) {
            Object.defineProperty(
              item.property,
              mouseStartProperty.name,
              mouseStartProperty.definition,
            );
            item.property.mouseStart.x = e.pageX;
            item.property.mouseStart.y = e.pageY;
          }
          item.property.isBeingDragged =
            Math.abs(e.pageX - item.property.mouseStart.x) +
              Math.abs(e.pageY - item.property.mouseStart.y) >
            dragTolerance;
          if (item.property.isBeingDragged) {
            item.classList.remove(CSSClass.anim);
            zInd++;
            item.style.zIndex = zInd;
          }
        }
      },
      mouseUp: () => {
        setTimeout(() => {
          if (item.property.isBeingDragged) {
            item.classList.add(CSSClass.anim, CSSClass.bD);
            setTimeout(() => {
              listItems.forEach(
                (item) =>
                  (item.style.zIndex =
                    wGCS(item).zIndex - (wGCS(item).zIndex > zIndBase)),
              );
              zInd -= +(zInd > zIndBase);
            }, tmOut);
            item.style.top = 0;
            item.property.isTransitionEnded = false;
          }
          item.classList.remove(CSSClass.mD);
          item.property.isBeingDragged = false;
          delete item.property.mouseStart;
          item.style.left = 0;
        }, 10);
        document.removeEventListener(
          eventName.mouseMove,
          item.property.eventHandler.mouseMove,
        );
        document.removeEventListener(
          eventName.mouseUp,
          item.property.eventHandler.mouseUp,
        );
      },
    };
    item.addEventListener(eventName.mouseDown, (e) => {
      let isGrabbed = item.property.isTransitionEnded && e.which < 2;
      if (isGrabbed) {
        item.classList.add(CSSClass.mD);
        document.addEventListener(
          eventName.mouseMove,
          item.property.eventHandler.mouseMove,
        );
        document.addEventListener(
          eventName.mouseUp,
          item.property.eventHandler.mouseUp,
        );
      }
    });
  });
  document.oncontextmenu = (e) => e.preventDefault();
})();
