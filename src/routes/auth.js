// src/routes/auth.js
const express = require('express');
const { authenticate } = require('../services/auth/mock'); // Use the mock authentication service for testing
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authenticate(username, password);

    if (result.success) {
        res.redirect('/');
    } else {
        res.render('login', { title: 'Login', error: result.message });
    }
});

module.exports = router;
