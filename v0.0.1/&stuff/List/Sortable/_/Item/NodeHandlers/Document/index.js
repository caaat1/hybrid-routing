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
const Document = (function (_super) {
  __extends(Document, _super)
  function Document() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  return Document
})(NodeHandlers)
export default Document
//# sourceMappingURL=index.js.map
