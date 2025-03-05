import {DOMImplementation} from 'xmldom'

import Node from '../index.js'

export default abstract class Document extends Node {
  // Constructor
  public constructor() {
    super()
  }

  // Getter and Setter
  public override get DOMNode(): globalThis.Document | undefined {
    return super.DOMNode as globalThis.Document
  }
  protected override set DOMNode(value: globalThis.Document | undefined) {
    super.DOMNode = value
  }

  // Instance method
  protected override setDOMNode(): void {
    const imp: DOMImplementation = new DOMImplementation()
    const doctype: DocumentType = imp.createDocumentType('html', '', '')

    this.DOMNode = imp.createDocument(
      'http://www.w3.org/1999/xhtml',
      'html',
      doctype,
    )
  }
  // public static override create(): Document {
  //   return super.create() as Document
  // }
  // public static create(): Node {
  //   const node = new this()
  //   const kids = node.kids
  //   return node
  // }
}
