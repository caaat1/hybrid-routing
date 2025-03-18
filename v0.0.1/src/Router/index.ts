import type {Request, Response, NextFunction} from 'express'

import type RequestHandler from '../RequestHandler/index.js'
import Initial from '../RequestHandler/Initial/index.js'
import Next from '../RequestHandler/Next/index.js'

export default class Router {
  private currentHandler: RequestHandler = new Initial()
  public handleRequest(req: Request, res: Response, next: NextFunction): void {
    this.currentHandler.handle(req, res, next)
    if (this.currentHandler instanceof Initial) {
      this.currentHandler = new Next()
    }
  }
}
