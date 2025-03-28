// src/app.ts

import path from 'path'
import {fileURLToPath} from 'url'

import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import type {Request, Response} from 'express'

import {Session} from './middleware/Session/index.js'
import NotFound from './RequestHandler/NotFound/index.js'
import StaticFile from './RequestHandler/StaticFile/index.js'
import View from './RequestHandler/View/index.js'

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
// TODO: succeed in attempts to implement tsconfig paths
// TODO: try implementing a no-empty-line-except-in-import-block rule (made up myself)
// TODO: continue perfecting the eslint configuration
// TODO: revise all error handling in the project
// TODO: move all named files to FolderName/index.ts where possible
// TODO: cast all routes to the view paths
// TODO: inquire about controllers

// Configure view engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, '../src/view'))

// Serve static files
app.use(express.static(path.resolve(__dirname, '../public')))

// Middleware to parse request body
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()) // For parsing JSON request bodies

// Session middleware
app.use(Session.create())

// Unified request handling
const viewHandler = new View(app)
const staticFileHandler = new StaticFile(app)
const notFoundHandler = new NotFound(app)

app.get('*', handleRequest)
async function handleRequest(req: Request, res: Response): Promise<void> {
  try {
    const handler =
      (await viewHandler.isTheCase(req).catch(() => null)) ??
      (await staticFileHandler.isTheCase(req).catch(() => null)) ??
      notFoundHandler
    console.log(
      `Handler selected (${req.method} ${req.url}):`,
      handler.constructor.name,
    )
    handler.handle(req, res)
  } catch (err) {
    console.error('Unexpected error:', err)
    const INTERNAL_SERVER_ERROR = 500
    res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error')
  }
}
export default app
