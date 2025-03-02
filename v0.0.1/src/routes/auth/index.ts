// src/routes/auth/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'

import authenticate from '../../services/auth/mongoDB/index.js'
import type {LoginRequestBody} from '../../types/RequestBody' // import your interface

declare module 'express-session' {
  interface SessionData {
    user: unknown
  }
}

function renderLoginPage(_: Request, res: Response): void {
  res.render('login', {title: 'Login'})
}

async function handleLogin(
  req: Request<object, object, LoginRequestBody>,
  res: Response,
): Promise<void> {
  const {username, password} = req.body // Now correctly typed
  const result = await authenticate(username, password)

  if (result.success) {
    req.session.user = result.user
    res.redirect('/admin')
  } else {
    res.render('login', {title: 'Login', error: result.message})
  }
}

function handleLogout(req: Request, res: Response): void {
  req.session.destroy((err) => {
    if (err !== null) {
      res.redirect('/')
      return // return early if there is an error
    }
    res.clearCookie('connect.sid') // clear the session cookie
    res.redirect('/login') // return response to redirect the user to the login page
  })
}

export default Router()
  .get('/login', renderLoginPage)
  .post('/login', handleLogin)
  .get('/logout', handleLogout)
