// src/routes/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'
// import {DOMImplementation, XMLSerializer} from 'xmldom'

// import type Document from '../DOM/Node/Document/index.js'
import View from '../view/index.js'

function renderHome(_req: Request, res: Response): void {
  const view = new View()
  // const view: Document = View.create()
  res.send(view.toString())

  // res.send(new XMLSerializer().serializeToString(document))
  // res.render('index', {title: 'Home'})
}

function renderAbout(_req: Request, res: Response): void {
  res.render('about', {title: 'About'})
}

export default Router().get('/', renderHome).get('/about', renderAbout)
