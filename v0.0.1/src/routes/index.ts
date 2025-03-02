// src/routes/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'

function renderHome(_: Request, res: Response): void {
  res.render('index', {title: 'Home'})
}

function renderAbout(_: Request, res: Response): void {
  res.render('about', {title: 'About'})
}

export default Router().get('/', renderHome).get('/about', renderAbout)
