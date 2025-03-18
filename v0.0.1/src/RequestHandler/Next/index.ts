// filepath: /src/RequestHandler/Next/index.ts

import fs from 'fs'
import path from 'path'

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
    console.log('Next router')

    const viewsDirectory: unknown = this.app.get('views') // Retrieve the value
    if (typeof viewsDirectory !== 'string') {
      const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR) // Internal Server Error
        .send('Views directory is not properly configured.')
      return
    }

    const requestedPath = path.join(viewsDirectory, req.path)

    // Check if the file or directory exists
    const HTTP_STATUS_NOT_FOUND = 404

    fs.access(requestedPath, fs.constants.F_OK, (err) => {
      console.log(requestedPath)
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
  public override getNextHandler(): RequestHandler {
    return this
  }
}
