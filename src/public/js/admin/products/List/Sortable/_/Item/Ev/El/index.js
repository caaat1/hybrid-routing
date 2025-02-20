export default class El {
  args;
  handle;
  sortableList_item;
  constructor(sortableList_item) {
    this.sortableList_item = sortableList_item;
  }
  takeArgs(...args) {
    this.args = args;
  }
}
