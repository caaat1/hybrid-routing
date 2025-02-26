import SortableList_Item from './List/Sortable/_/Item/dist/index.js';

(function () {
  'use strict';

  const list = document.querySelector('[data-xpath="body/main"]');
  if (!list) {
    console.error('List element not found');
    return;
  }

  const listElements = list.querySelectorAll(
    '[data-xpath^="body/main/div"]:not([data-xpath*="]/div"])',
  );

  // Prevent right-click context menu globally
  const preventContextMenu = (e) => e.preventDefault();
  document.addEventListener('contextmenu', preventContextMenu);

  // Use a more efficient generator function that avoids re-slicing
  function* iterateWithOthers(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      const others = [...arr.slice(0, i), ...arr.slice(i + 1)];
      yield [arr[i], others];
    }
  }

  const arr = Array.from(listElements);
  for (const [element, others] of iterateWithOthers(arr)) {
    new SortableList_Item(element, others);
  }

  // Optionally, clean up by removing the event listener when done (if needed)
  // document.removeEventListener('contextmenu', preventContextMenu);

})();
