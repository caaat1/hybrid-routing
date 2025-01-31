// src/routes/admin.js
const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user.username === 'admin') {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.use(isAuthenticated); // Apply the middleware to all admin routes

router.get('/', (req, res) => {
    res.render('admin', { title: 'Admin Dashboard' });
});

// Add more admin routes here as needed

module.exports = router;
