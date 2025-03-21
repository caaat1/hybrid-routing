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

import Initial from './RequestHandler/Initial/index.js'
import Next from './RequestHandler/Next/index.js'

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
// TODO: move all named files to FolderName/index.ts where possible
// TODO: cast all routes to the view paths
// TODO: inquire about controllers

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

// Unified request handling
const initialHandler = new Initial(app)
const nextHandler = new Next(app)

// app.get('*', (req: Request, res: Response, next: NextFunction) => {
//   // Serve the client-side renderer for initial requests
//   if (isInitialRequest(req)) {
//     initialHandler.handle(req, res, next)
//   } else {
//     // Delegate proto-DOM requests to the router
//     nextHandler.handle(req, res, next)
//   }
// })
// // Named function to determine if request is an initial load
// function isInitialRequest(req: Request): boolean {
//   // Check if the request is for a proto-DOM path or static asset
//   const staticExtensions = [
//     '.js',
//     '.css',
//     '.png',
//     '.jpg',
//     '.gif',
//     '.svg',
//     '.ico',
//   ]
//   const requestPath = req.path

//   // If path matches a static resource, it's not an initial request
//   if (staticExtensions.some((ext) => requestPath.endsWith(ext))) {
//     return false
//   }

//   // If the path starts with "/view/", it's a proto-DOM request
//   if (requestPath.startsWith('/view/')) {
//     return false
//   }

//   // Otherwise, treat it as an initial page load
//   return true
// }
app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  const viewDirectory = path.join(app.get('view'), req.path)

  // Check if a view exists
  if (await isDirectory(viewDirectory)) {
    const protoDomPath = path.join(viewDirectory, 'proto-dom.json')
    if (await fileExists(protoDomPath)) {
      const protoDom = require(protoDomPath)
      res.json(protoDom) // Serve the proto-DOM
      return
    }
  }

  // Fallback to static file
  const staticFilePath = path.join(__dirname, '../public', req.path)
  if (await fileExists(staticFilePath)) {
    res.sendFile(staticFilePath) // Serve static file
    return
  }

  // Serve 404 for unmatched requests
  res.status(404).send('Resource not found')
})

function isDirectory(directoryPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.stat(directoryPath, (err, stats) => {
      resolve(!err && stats.isDirectory())
    })
  })
}

function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err)
    })
  })
}
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
