import type {Request /* , Response, NextFunction */} from 'express'

import RequestHandler from '../index.js'

export default class StaticFile extends RequestHandler {
  public override handle(
    req: Request,
    // res: Response,
    // next: NextFunction,
  ): void {
    // void next
    void req
    // void res
    console.log('StaticFile handler')
  }
  public isTheCase(
    req: Request,
    // res: Response,
    // next: NextFunction,
  ): Promise<RequestHandler> {
    return new Promise((resolve, reject) => {
      if (req.headers['x-custom-header'] !== undefined) {
        // Custom header exists, resolve with an instance
        this.handle(req /* , res, next */)
        resolve(this)
      } else {
        reject(new Error('Not a view request'))
      }
    })
  }
}
