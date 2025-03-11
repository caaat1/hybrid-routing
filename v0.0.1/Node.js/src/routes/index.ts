// src/routes/index.ts

import {exec} from 'child_process'
import path from 'path'
import {fileURLToPath} from 'url'

import {Router} from 'express'
import type {Request, Response} from 'express'

// import View from '../view/index.js'

function renderHome(_req: Request, res: Response): void {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const scriptPath = path.resolve(__dirname, '../../../PHP/index.php')
  console.log(scriptPath)
  // exec(`php ${scriptPath}`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error: ${error.message}`)
  //     return
  //   }
  //   if (stderr) {
  //     console.error(`Stderr: ${stderr}`)
  //     return
  //   }
  //   const result: unknown = JSON.parse(stdout)
  //   console.log(result)
  //   res.send(result)
  // })

  // res.render('.', {title: 'Home'})

  // const view = View.create()
}

function renderAbout(_req: Request, res: Response): void {
  res.render('about', {title: 'About'})
}

export default Router().get('/', renderHome).get('/about', renderAbout)
