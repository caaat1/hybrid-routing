// src/routes/auth/index.ts

import {Router, Request, Response} from 'express';
import authenticate from '../../services/auth/mongoDB/index.js';

declare module 'express-session' {
  interface SessionData {
    user: any;
  }
}

function renderLoginPage(_: Request, res: Response) {
  res.render('login', {title: 'Login'});
}

async function handleLogin(req: Request, res: Response) {
  const {username, password} = req.body;
  const result = await authenticate(username, password);

  if (result.success) {
    req.session.user = result.user;
    res.redirect('/admin');
  } else {
    res.render('login', {title: 'Login', error: result.message});
  }
}

function handleLogout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
}

export default Router()
  .get('/login', renderLoginPage)
  .post('/login', handleLogin)
  .get('/logout', handleLogout);
