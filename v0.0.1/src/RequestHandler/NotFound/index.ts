import type {Request, Response /* , NextFunction */} from 'express'

import RequestHandler from '../index.js'

export default class NotFound extends RequestHandler {
  public override handle(
    req: Request,
    res: Response,
    // next: NextFunction,
  ): void {
    // void next
    void req
    void res
    console.log('Next router')
  }
}
