// src/routes/admin.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.username === 'admin') {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.use(isAuthenticated); // Apply the middleware to all admin routes

// Admin Dashboard
router.get('/', (req, res) => {
    res.render('admin', { title: 'Admin Dashboard' });
});

// Display all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/products', { products });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Display form to add a new product
router.get('/products/new', (req, res) => {
    res.render('admin/new-product');
});

// Add a new product
router.post('/products', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newProduct = new Product({ name, description, price });
        await newProduct.save();
        res.redirect('/admin/products');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Display form to edit a product
router.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/edit-product', { product });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a product
router.post('/products/:id', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, description, price });
        res.redirect('/admin/products');
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
