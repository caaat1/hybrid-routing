// src/routes/admin.js
import {Router} from 'express';

import isAuthenticated from '../middleware/auth';
import Product, {
  find,
  findById,
  findByIdAndUpdate,
} from '../models/mongoDB/Product';

export default Router()
  .use(isAuthenticated)
  .get('/', (req, res) => {
    res.render('admin', {title: 'Admin Dashboard'});
  })
  .get('/products', async (req, res) => {
    try {
      const products = await find();
      res.render('admin/products', {products});
    } catch (err) {
      res.status(500).send('Server Error');
    }
  })
  .post('/products', async (req, res) => {
    try {
      const {name, description, price} = req.body;
      const newProduct = new Product({name, description, price});
      await newProduct.save();
      res.redirect('/admin/products');
    } catch (err) {
      res.status(500).send('Server Error');
    }
  })
  .get('/products/new', (req, res) => {
    res.render('admin/new-product');
  })
  .get('/products/:id/edit', async (req, res) => {
    try {
      const product = await findById(req.params.id);
      res.render('admin/edit-product', {product});
    } catch (err) {
      res.status(500).send('Server Error');
    }
  })
  .post('/products/:id', async (req, res) => {
    try {
      const {name, description, price} = req.body;
      await findByIdAndUpdate(req.params.id, {name, description, price});
      res.redirect('/admin/products');
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
