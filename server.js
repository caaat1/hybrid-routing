// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router modules
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
app.use('/', indexRouter);
app.use('/', authRouter);

// Handle 404 - Keep this as the last middleware
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
