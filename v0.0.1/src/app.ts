// FILE: src/app.ts

import path from 'path'
import {fileURLToPath} from 'url'

import bodyParser from 'body-parser'
import express from 'express'
import type {Request, Response} from 'express'

import BaseController from './controller/Base/index.js'
import SessionMiddleware from './middleware/Session/index.js'

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

// Middleware ...
app.use(bodyParser.urlencoded({extended: true})) // ... to parse request body
app.use(express.json()) // ... for parsing JSON request bodies
app.use(SessionMiddleware.create()) // Session ...

// Unified request handling
const baseController = new BaseController(app)

app.get('*', async (req: Request, res: Response) => {
  const handler = await baseController.getRequestHandler(req, res)
  if (handler) {
    handler.handle(req, res)
  }
})
export default app
