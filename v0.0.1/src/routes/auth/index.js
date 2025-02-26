// src/routes/auth/index.js
import {Router} from 'express';

import authenticate from '../../services/auth/mongoDB/index.js';

export default Router()
  .get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
  })
  .post('/login', async (req, res) => {
    const {username, password} = req.body;
    const result = await authenticate(username, password);

    if (result.success) {
      req.session.user = result.user;
      res.redirect('/admin');
    } else {
      res.render('login', {title: 'Login', error: result.message});
    }
  })
  .get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('/');
      }
      res.clearCookie('connect.sid');
      return res.redirect('/login');
    });
  });
