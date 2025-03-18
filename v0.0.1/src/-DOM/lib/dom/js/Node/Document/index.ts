// import {JSDOM} from 'jsdom'

// import Node from '../index.js'

// export default abstract class Document/*  extends Node */ {
//   // Constructor
//   // public constructor() {
//   //   super()
//   // }

//   // Getter and Setter
//   public override get DOMNode(): globalThis.Document | undefined {
//     return super.DOMNode as globalThis.Document
//   }
//   protected override set DOMNode(value: globalThis.Document | undefined) {
//     super.DOMNode = value
//   }

//   // Instance method
//   public override toString(): string {
//     if (this.DOMNode === undefined) {
//       return '' // OR: throw new Error('DOMNode is not defined')
//     }
//     const serializer = new XMLSerializer()
//     return serializer.serializeToString(this.DOMNode)
//   }
//   protected override setDOMNode(): void {
//     // Create an empty document with <!DOCTYPE html>
//     const dom = new JSDOM(``, {
//       contentType: 'text/html',
//     })

//     // Manually set the doctype
//     const document = dom.window.document
//     const doctype = document.implementation.createDocumentType('html', '', '')
//     document.appendChild(doctype)
//     this.DOMNode = document
//   }
//   // public static override create(): Document {
//   //   return super.create() as Document
//   // }
//   // public static create(): Node {
//   //   const node = new this()
//   //   const kids = node.kids
//   //   return node
//   // }
// }
