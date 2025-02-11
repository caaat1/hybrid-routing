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
  const px = 'px';
  const tmOut = 1000;
  const wGCS = window.getComputedStyle;
  const zIndBase = 0;
  let zInd = 0;

  let isBeingDragged = true;
  let isGrabbed;
  let draggedItem;
  let mouseStartX;
  let mouseStartY;

  listItems.forEach((item) => {
    if (undefined === item.CustomProperty) {
      Object.defineProperty(item, 'CustomProperty', {
        value: {},
        writable: false, // Prevent reassignment but allow modifications inside
        enumerable: false, // Hide from `Object.keys()`
        configurable: false, // Prevent deletion or reconfiguration
      });
    }
    item.CustomProperty.isTransitionEnded = true;
    item.classList.add(CSSClass.anim);
    item.addEventListener(eventName.transitionEnd, () => {
      item.CustomProperty.isTransitionEnded = true;
      item.style.removeProperty('top');
      item.classList.remove(CSSClass.bD, CSSClass.mv);
    });

    item.addEventListener(eventName.mouseDown, (e) => {
      isGrabbed = item.CustomProperty.isTransitionEnded && e.which < 2;
      if (isGrabbed) {
        isBeingDragged = false;

        draggedItem = item;
        draggedItem.classList.add(CSSClass.mD);

        mouseStartX = e.pageX;
        mouseStartY = e.pageY;
      }
    });
  });
  document.addEventListener(eventName.mouseMove, (e) => {
    if (isGrabbed) {
      if (isBeingDragged) {
        [0, 2].forEach((value, index) => {
          let adjacentItems = [
            draggedItem.previousElementSibling,
            draggedItem,
            draggedItem.nextElementSibling,
          ];
          let sibling = adjacentItems[value];
          if (sibling) {
            value--;
            let isOverLapped =
              adjacentItems[index].offsetTop +
                adjacentItems[index].offsetHeight / 2 >
              adjacentItems[index + 1].offsetTop +
                adjacentItems[index + 1].offsetHeight / 2;
            if (isOverLapped && sibling.CustomProperty.isTransitionEnded) {
              const oHmT = (el) =>
                value * (el.offsetHeight + parseFloat(wGCS(el).marginTop));
              list.insertBefore(adjacentItems[index + 1], adjacentItems[index]);
              sibling.style.top = oHmT(draggedItem) + px;
              sibling.classList.add(CSSClass.mv);
              sibling.CustomProperty.isTransitionEnded = false;
              mouseStartY += oHmT(sibling);
              sibling.style.top = 0;
            }
          }
        });
        draggedItem.style.left = `${e.pageX - mouseStartX}${px}`;
        draggedItem.style.top = `${e.pageY - mouseStartY}${px}`;
      } else {
        isBeingDragged =
          Math.abs(e.pageX - mouseStartX) + Math.abs(e.pageY - mouseStartY) >
          dragTolerance;
        draggedItem.classList.remove(CSSClass.anim);
        zInd++;
        draggedItem.style.zIndex = zInd;
      }
    }
  });
  document.addEventListener(eventName.mouseUp, () => {
    if (isGrabbed) {
      setTimeout(() => {
        if (isBeingDragged) {
          draggedItem.classList.add(CSSClass.anim, CSSClass.bD);
          setTimeout(() => {
            listItems.forEach(
              (item) =>
                (item.style.zIndex =
                  wGCS(item).zIndex - (wGCS(item).zIndex > zIndBase)),
            );
            zInd -= zInd > zIndBase;
          }, tmOut);
          draggedItem.style.top = 0;
          draggedItem.CustomProperty.isTransitionEnded = false;
        }
        draggedItem.classList.remove(CSSClass.mD);
        isGrabbed = false;
        draggedItem.style.left = 0;
      }, 10);
    }
  });
  document.oncontextmenu = (e) => e.preventDefault();
})();
