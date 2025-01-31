// src\services\auth\mongoDB\index.js
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as needed

async function authenticate(username, password) {
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            return { success: true, user };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}

module.exports = { authenticate };
