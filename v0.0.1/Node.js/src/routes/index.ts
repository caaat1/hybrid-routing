// src/routes/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'

// import View from '../view/index.js'

function renderHome(_req: Request, res: Response): void {
  res.render('.', {title: 'Home'})
  //   const view = View.create()
  //   res.send(view.serialize())
}

function renderAbout(_req: Request, res: Response): void {
  res.render('about', {title: 'About'})
}

export default Router().get('/', renderHome).get('/about', renderAbout)
