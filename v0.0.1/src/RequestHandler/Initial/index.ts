import type {Request, Response, NextFunction} from 'express'

import RequestHandler from '../index.js'
import Next from '../Next/index.js'

export default class Initial extends RequestHandler {
  public override handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    void next
    console.log('Initial router')
    res.render('router', {dataUrl: req.originalUrl})
  }
  public override getNextHandler(): RequestHandler {
    return new Next(this.app)
  }
}
