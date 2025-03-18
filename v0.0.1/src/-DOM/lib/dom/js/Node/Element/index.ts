import Node from '../index.js'

export default abstract class Element extends Node {
  protected override setDOMNode(): void {
    console.log(`Element: ${this.constructor.name}`)
    // this.DOMNode = this.document.createElement(this.constructor.name)
  }
}
