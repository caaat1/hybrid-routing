// // server.js
// import {join} from 'path';

// import {urlencoded} from 'body-parser';
// import {create} from 'connect-mongo';
// import express from 'express';
// import session from 'express-session';

// require('dotenv').config();
// // import mongoose from './src/config/db';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Set the view engine
// app.set('view engine', 'ejs');
// app.set('views', join(__dirname, 'src/views'));

// // Serve static files
// app.use(express.static(join(__dirname, 'src/public')));

// // Middleware to parse request body
// app.use(urlencoded({extended: true}));

// // Session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: create({mongoUrl: process.env.MONGO_URI}),
//     cookie: {maxAge: 24 * 60 * 60 * 1000}, // 1 day
//   }),
// );

// // Use the router modules
// import adminRouter from './src/routes/admin';
// import authRouter from './src/routes/auth';
// import indexRouter from './src/routes/index';

// app.use('/', indexRouter);
// app.use('/', authRouter);
// app.use('/admin', adminRouter);

// // Handle 404 - Keep this as the last middleware
// app.use((req, res) => {
//   res.status(404).render('404', {title: 'Page Not Found'});
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
