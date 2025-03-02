import CompositeHandlers from './CompositeHandlers/index.js'
const Item = (function () {
  function Item(element, otherElements) {
    this.element = element
    this.otherElements = otherElements
    this.CSSClass = {
      animated: 'animated',
      dragged: 'dragged',
      grabbed: 'grabbed',
      moving: 'moving',
      released: 'released',
    }
    this.isTransitionEnded = true
    this.compositeHandlers = new CompositeHandlers(this)
    this.compositeHandlers.nodeHandlers[Node.DOCUMENT_NODE]
    void this.otherElements
    console.log(this.compositeHandlers)
    this.addStyles().addEventListeners()
  }
  Item.prototype.addEventListeners = function () {
    return this
  }
  Item.prototype.addStyles = function () {
    this.element.classList.add(this.CSSClass.animated)
    return this
  }
  Item.prototype.isGrabbable = function (e) {
    return this.isTransitionEnded && e.which < 2
  }
  return Item
})()
export default Item
//# sourceMappingURL=index.js.map
