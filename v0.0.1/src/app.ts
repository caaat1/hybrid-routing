import path from 'path'
import {fileURLToPath} from 'url'

import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import debug from 'debug'
import dotenv from 'dotenv'
import express from 'express'
import type {Request, Response} from 'express'
import session from 'express-session'

import adminRouter from './routes/admin/index.js'
import authRouter from './routes/auth/index.js'
import indexRouter from './routes/index.js'

// Load environment variables from .env file
dotenv.config()

// Get __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express app
const app = express()

// Configure view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))

// Serve static files
app.use(express.static(path.join(__dirname, '../public')))

// Middleware to parse request body
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()) // For parsing JSON request bodies

// Session middleware
app.use(sessionMiddleware())

// Setup routes
app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/admin', adminRouter)

// 404 handler
app.use(handle404)

// Export Express app
export default app

// Named function for session middleware
function sessionMiddleware(sessionOptions = {}): express.RequestHandler {
  const defaultOptions = {
    secret: process.env.SESSION_SECRET ?? 'default_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    cookie: {maxAge: 24 * 60 * 60 * 1000}, // 1 day
  }
  return session({...defaultOptions, ...sessionOptions})
}

// Named function for 404 handler
function handle404(req: Request, res: Response): void {
  const log404 = debug('app:404')
  log404(`404 - ${req.originalUrl} not found`)

  res.status(404).render('404', {
    title: 'Page Not Found',
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  })
}
