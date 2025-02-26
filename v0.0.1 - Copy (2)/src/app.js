import {join} from 'path';
import path from 'path';
import {fileURLToPath} from 'url';

import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';

import adminRouter from './routes/admin/index.js';
import authRouter from './routes/auth/index.js';
import indexRouter from './routes/index.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Serve static files
app.use(express.static(join(__dirname, 'public')));

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

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/admin', adminRouter);

// Handle 404 - Keep this as the last middleware
app.use((req, res) => {
  res.status(404).render('404', {title: 'Page Not Found'});
});

export default app;
