const __extends =
  (this && this.__extends) ||
  (function () {
    let extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (const p in b) {
            if (Object.prototype.hasOwnProperty.call(b, p)) {
              d[p] = b[p]
            }
          }
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null) {
        throw new TypeError(
          `Class extends value ${String(b)} is not a constructor or null`,
        )
      }
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
import NodeHandlers from '../index.js'
const Element = (function (_super) {
  __extends(Element, _super)
  function Element() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  return Element
})(NodeHandlers)
export default Element
//# sourceMappingURL=index.js.map
