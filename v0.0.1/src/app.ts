// src/app.ts

// import {createRequire} from 'module'
import path from 'path'
import {fileURLToPath} from 'url'

import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import express from 'express'
import type {Request, Response, NextFunction} from 'express'
import session from 'express-session'

import Router from './Router/index.js'

// const require = createRequire(import.meta.url)
// console.log(require.resolve('@/routes/admin/index.js'))

// Load environment variables from .env file
dotenv.config()

// Get __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Express app
const app = express()

// TODO: consider chaining the method calls
// TODO: consider using the `set` method to set multiple values at once (AI suggestion)
// TODO: consider moving all string literals to constants
// TODO: consider using path.resolve method to resolve the path (AI suggestion)
// TODO: succeed in attempts of implementing tsconfig paths
// TODO: try implementing a no-empty-line-except-in-import-block rule
// TODO: continue perfecting the eslint configuration
// TODO: revise all error handling in the project
// TODO: refactor filename/dirname block
// TODO: Move route handlers to separate files
// TODO: move all named files to FolderName/index.ts where possible
// TODO: cast all routes to the view paths
// TODO: inquire about controllers
// TODO: move all routes to separate files

// Configure view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/view'))

// Serve static files
app.use(express.static(path.join(__dirname, '../public')))

// Middleware to parse request body
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()) // For parsing JSON request bodies

// Session middleware
app.use(sessionMiddleware())

// Initial router handler
const router = new Router()
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  router.handleRequest(req, res, next)
})

// Export Express app
export default app

// Named function for session middleware
function sessionMiddleware(sessionOptions = {}): express.RequestHandler {
  const HOURS_IN_A_DAY = 24
  const MINUTES_IN_AN_HOUR = 60
  const SECONDS_IN_A_MINUTE = 60
  const MILLISECONDS_IN_A_SECOND = 1000
  const ONE_DAY_IN_MS =
    HOURS_IN_A_DAY *
    MINUTES_IN_AN_HOUR *
    SECONDS_IN_A_MINUTE *
    MILLISECONDS_IN_A_SECOND
  const defaultOptions = {
    secret: process.env['SESSION_SECRET'] ?? 'default_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/default', // TODO: throw an error if not set
    }),
    cookie: {maxAge: ONE_DAY_IN_MS}, // 1 day
  }
  return session({...defaultOptions, ...sessionOptions})
}
