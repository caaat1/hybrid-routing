// src/routes/index.ts

import {Router} from 'express'
import type {Request, Response} from 'express'

// function renderHome(_req: Request, res: Response): void {
//   res.render('.')
// }

// function renderAbout(_req: Request, res: Response): void {
//   res.render('about', {title: 'About'})
// }

// export default Router().get('/', renderHome).get('/about', renderAbout)

// Create router instance
const router = Router()

// Catch-all route (must be at the end)
router.get('*', (req: Request, res: Response) => {
  console.log(req.originalUrl) // Full URL path
  console.log(req.path) // Only the path (no query string)
  console.log(req.query) // Parsed query parameters (as an object)
  res.render('router', {dataUrl: req.originalUrl}) // Serves 'index.ejs' (or another page) for all other routes
})

export default router
