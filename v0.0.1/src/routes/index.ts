// src/routes/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'
import {DOMImplementation, XMLSerializer} from 'xmldom'

function renderHome(_req: Request, res: Response): void {
  const imp: DOMImplementation = new DOMImplementation()
  const doctype = imp.createDocumentType('html', '', '') // Equivalent to <!DOCTYPE html>
  const document: Document = imp.createDocument(null, 'html', doctype)

  // Add a child element to the <html> element to prevent self-closing
  const html = document.documentElement
  const body = document.createElement('body')
  html.appendChild(body) // Adding a body tag inside <html>
  body.textContent = ' '

  // Serialize the document to string
  console.log(new XMLSerializer().serializeToString(document))

  res.send(new XMLSerializer().serializeToString(document))
  // res.render('index', {title: 'Home'})
}

function renderAbout(_req: Request, res: Response): void {
  res.render('about', {title: 'About'})
}

export default Router().get('/', renderHome).get('/about', renderAbout)
