import {XMLSerializer} from 'xmldom'

export default abstract class Node {
  // Instance property
  protected _DOMNode?: globalThis.Node | undefined

  // Constructor
  public constructor() {
    console.log('Node constructor')
    this.setDOMNode()
  }

  // Abstract method
  protected abstract setDOMNode(): void

  // Getter and Setter
  public get DOMNode(): globalThis.Node | undefined {
    return this._DOMNode
  }

  protected set DOMNode(value: globalThis.Node | undefined) {
    this._DOMNode = value
  }

  // Getter (additional)
  protected get kids(): Array<typeof Node> {
    return []
  }

  // Instance method
  public toString(): string {
    if (undefined === this.DOMNode) {
      return '' // OR: throw new Error('DOMNode is not defined')
    }
    return new XMLSerializer().serializeToString(this.DOMNode)
  }
}
