// src/routes/admin/index.ts

import {Router, Request, Response} from 'express';
import isAuthenticated from '../../middleware/auth/index.js';
import Product from '../../models/mongoDB/Product.js';

function handleAdminDashboard(_: Request, res: Response): void {
  res.render('admin', {title: 'Admin Dashboard'});
}

async function handleGetProducts(_: Request, res: Response): Promise<void> {
  try {
    const products = await Product.find();
    res.render('admin/products', {products});
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

async function handleCreateProduct(req: Request, res: Response): Promise<void> {
  try {
    const {name, description, price} = req.body;
    const newProduct = new Product({name, description, price});
    await newProduct.save();
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

function handleNewProduct(_: Request, res: Response): void {
  res.render('admin/new-product');
}

async function handleEditProduct(req: Request, res: Response): Promise<void> {
  try {
    const product = await Product.findById(req.params.id);
    res.render('admin/edit-product', {product});
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

async function handleUpdateProduct(req: Request, res: Response): Promise<void> {
  try {
    const {name, description, price} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

export default Router()
  .use(isAuthenticated)
  .get('/', handleAdminDashboard)
  .get('/products', handleGetProducts)
  .post('/products', handleCreateProduct)
  .get('/products/new', handleNewProduct)
  .get('/products/:id/edit', handleEditProduct)
  .post('/products/:id', handleUpdateProduct);
