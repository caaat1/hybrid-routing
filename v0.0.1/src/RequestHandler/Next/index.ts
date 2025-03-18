// import debug from 'debug'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import type {Request, Response, NextFunction} from 'express'

import RequestHandler from '../index.js'

export default class Next extends RequestHandler {
  public override handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    void next
    void res
    // const viewName = req.path.slice(1) || '.'
    // console.log(`View name: ${viewName}`)
    // res.render(viewName, {}, (err: Error | null, html: string | false) => {
    //   void err
    //   void html
    //   console.log(html)
    //   res.end()
    //   // if (err) {
    //   //   this.handle404(req, res)
    //   // } else {
    //   //   console.log(html)
    //   //   res.send(html)
    //   // }
    // })

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const requestedPath = path.join(__dirname, req.path)

    // Check if the file or directory exists
    const HTTP_STATUS_NOT_FOUND = 404

    fs.access(requestedPath, fs.constants.F_OK, (err) => {
      if (err) {
        // Path does not exist
        res
          .status(HTTP_STATUS_NOT_FOUND)
          .send('The requested resource does not exist.')
      } else {
        // Path exists
        res.send(`The requested resource "${req.path}" exists on the server.`)
      }
    })
  }
  // private handle404(req: Request, res: Response): void {
  //   // const log404 = debug('app:404')
  //   // log404(`404 - ${req.originalUrl} not found`)
  //   console.log(`404 - ${req.originalUrl} not found`)

  //   // const HTTP_STATUS_NOT_FOUND = 404
  //   // res.status(HTTP_STATUS_NOT_FOUND).render('404', {
  //   //   title: 'Page Not Found!',
  //   //   message: `The requested URL ${req.originalUrl} was not found on this server.`,
  //   // })
  //   res.render(
  //     '404',
  //     {
  //       title: 'Page Not Found!',
  //       message: `The requested URL ${req.originalUrl} was not found on this server.`,
  //     },
  //     (err: Error | null, html: string | false) => {
  //       if (err) {
  //         console.error(err)
  //         res.send('Server Error')
  //       } else {
  //         console.log('404 page rendered')
  //         res.send(html)
  //       }
  //     },
  //   )
  // }
}
