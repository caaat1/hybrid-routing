export default class ClassList {
  el;
  constructor(el) {
    this.el = el;
  }
  add(...classes) {
    el.classList.add(...classes);
    return this;
  }
  remove(...classes) {
    el.classList.remove(...classes);
    return this;
  }
}
