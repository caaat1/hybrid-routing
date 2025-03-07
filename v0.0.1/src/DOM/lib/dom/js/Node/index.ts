// import type Document from './Document/index.js'
// import {JSDOM} from 'jsdom'

export default abstract class Node {
  // Factory method
  // public static create<T extends Node>(doc: Document, type: new () => T): T {
  //   return new type()
  // }

  // Instance property
  protected _DOMNode?: globalThis.Node | undefined

  // Constructor
  public constructor() {
    console.log('Node constructor')
    this.setDOMNode()
    // const kids = this.getKids()
    // kids.forEach((kid) => {
    //   console.log('kid:', kid)
    //   if (typeof kid === 'function' && kid.prototype instanceof Node) {
    //     const node = Node.create(kid as unknown as new () => Node)
    //     console.log('node:', node)
    //   }
    // })
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
  protected getKids<T extends typeof Node>(): T[] {
    return []
  }
}
