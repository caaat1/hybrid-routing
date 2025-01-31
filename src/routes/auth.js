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
        req.session.user = result.user; // Save user info in session
        res.redirect('/');
    } else {
        res.render('login', { title: 'Login', error: result.message });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

module.exports = router;
