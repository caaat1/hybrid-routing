const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const mongoose = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware to parse request body
app.use(bodyParser.urlencoded({extended: true}));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 24 * 60 * 60 * 1000}, // 1 day
  }),
);

// Use the router modules
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const adminRouter = require('./src/routes/admin');
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/admin', adminRouter);

// Handle 404 - Keep this as the last middleware
app.use((req, res, next) => {
  res.status(404).render('404', {title: 'Page Not Found'});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
