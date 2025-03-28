// filepath: /src/RequestHandler/Next/index.ts

import fs from 'fs'
import path from 'path'
import {pathToFileURL} from 'url'

import type {Request, Response} from 'express'

import ProtoDocument from '../../DOM/Document/index.js'
import RequestHandler from '../index.js'

export default class View extends RequestHandler {
  // public override handle(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): void {
  //   void next
  //   void res
  //   console.log('Next router')

  //   const viewsDirectory: unknown = this.app.get('views') // Retrieve the value
  //   if (typeof viewsDirectory !== 'string') {
  //     const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
  //     res
  //       .status(HTTP_STATUS_INTERNAL_SERVER_ERROR) // Internal Server Error
  //       .send('Views directory is not properly configured.')
  //     return
  //   }

  //   const requestedPath = path.join(viewsDirectory, req.path)

  //   // Check if the file or directory exists
  //   const HTTP_STATUS_NOT_FOUND = 404

  //   fs.access(requestedPath, fs.constants.F_OK, (err) => {
  //     console.log(requestedPath)
  //     if (err) {
  //       // Path does not exist
  //       res
  //         .status(HTTP_STATUS_NOT_FOUND)
  //         .send('The requested resource does not exist.')
  //     } else {
  //       // Path exists
  //       res.send(`The requested resource "${req.path}" exists on the server.`)
  //     }
  //   })
  // }
  public override handle(
    req: Request,
    // res: Response,
    // next: NextFunction,
  ): void {
    void req
    console.log('Next router')
  }
  public isTheCase(
    req: Request,
    res: Response,
    // next: NextFunction,
  ): Promise<RequestHandler> {
    return new Promise((resolve, reject) => {
      const viewsDirRetrieved: unknown = this.app.get('views') // Retrieve the value
      if (typeof viewsDirRetrieved !== 'string') {
        const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
        res
          .status(HTTP_STATUS_INTERNAL_SERVER_ERROR) // Internal Server Error
          .send('Views directory is not properly configured.')
        return
      }
      const viewsDir = viewsDirRetrieved
      const viewPath = path.join(viewsDir, req.path)
      if (await this.isDirectory(viewPath)) {
        const viewIndex = path.join(viewPath, 'index.js')
        console.log('Full path to view index: ', viewIndex)
        type ImportClassType = new (...args: unknown[]) => ProtoDocument
        if (await this.fileExists(viewIndex)) {
          const moduleUrl = pathToFileURL(viewIndex)
          await import(moduleUrl.href)
            .then((mod) => {
              const defaultExport = (mod as {default: unknown}).default
              // Confirm it's a function (which a class constructor would be)
              if (typeof defaultExport !== 'function') {
                throw new Error('Default export is not a constructor function.')
              }
              // Check if it's exactly the expected class or a subclass thereof.
              if (defaultExport.prototype instanceof ProtoDocument) {
                console.log('The default export is the expected class!')
                const viewClass: ImportClassType = (
                  mod as {default: ImportClassType}
                ).default
                console.log('View class: ', viewClass)
                console.log('View object: ', new viewClass())
                res.json(new viewClass()) // Serve the proto-DOM
              } else {
                throw new Error(
                  'Default export is not of the expected class type.',
                )
              }
            })
            .catch((err) => {
              console.error('Error importing module:', err)
            })
          return
        }
        console.log('View index not found')
        const HTTP_STATUS_NOT_FOUND = 404
        res.status(HTTP_STATUS_NOT_FOUND).send('View index not found')
        return
      }

      if (req.headers['x-custom-header'] !== undefined) {
        // Custom header exists, resolve with an instance
        this.handle(req /* , res, next */)
        resolve(this)
      } else {
        reject(new Error('Not a view request'))
      }
    })
  }

  // handleRequest(response) {
  //   const protoDom = {data: 'Serialized protoDom data'}
  //   response.json(protoDom)
  // }
  private async fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err)
      })
    })
  }
  private async isDirectory(directoryPath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.stat(directoryPath, (err, stats) => {
        resolve(!err && stats.isDirectory())
      })
    })
  }
}
//   // // Fallback to static file
//   // const staticFilePath = path.join(__dirname, '../public', req.path)
//   // if (await fileExists(staticFilePath)) {
//   //   res.sendFile(staticFilePath) // Serve static file
//   //   return
//   // }

//   // // Serve 404 for unmatched requests
//   // res.status(404).send('Resource not found')
// })
