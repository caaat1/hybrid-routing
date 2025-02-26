// src/routes/index.js
import {Router} from 'express';

export default Router()
  .get('/', (req, res) => {
    res.render('index', {title: 'Home'});
  })
  .get('/about', (req, res) => {
    res.render('about', {title: 'About'});
  });
