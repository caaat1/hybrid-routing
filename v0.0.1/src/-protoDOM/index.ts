import {JSDOM} from 'jsdom'

// import Document from '../DOM/dom/js/Node/Document/index.js'
// import type Node from '../DOM/dom/js/Node/index.js'

// import DocumentElement from './DocumentElement/index.js'

export default class View extends JSDOM {
  // protected override getKids<T extends typeof Node>(): T[] {
  //   return [DocumentElement as unknown as T]
  // }
  public static create(): View {
    const dom = new JSDOM('', {pretendToBeVisual: true})

    // Access the window and document
    const {window} = dom
    // const {document} = window

    // Create a new, truly empty document
    const newDocument = new window.Document()

    // Add a DOCTYPE node
    const doctype = newDocument.implementation.createDocumentType(
      'html',
      '',
      '',
    )
    newDocument.appendChild(doctype)

    // Now the document is truly empty
    console.log(newDocument.childNodes.length) // Output: 0

    newDocument.childNodes.forEach((node, index) => {
      console.log(`Node ${index}:`, node.nodeType)
    })
    return dom
  }
}
