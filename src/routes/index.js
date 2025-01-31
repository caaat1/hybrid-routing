// src/routes/index.js
const express = require('express');
const isAuthenticated = require('../middleware/auth'); // Adjust the path as needed
const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
    res.render('index', { title: 'Home', user: req.session.user });
});
// About route (public)
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
module.exports = router;
