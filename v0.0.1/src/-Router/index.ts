import type {Express, NextFunction, Request, Response} from 'express'

import type RequestHandler from '../RequestHandler/index.js'
import Initial from '../RequestHandler/Initial/index.js'
import Next from '../RequestHandler/View/index.js'

export default class Router {
  private currentHandler: RequestHandler | undefined
  public constructor(private readonly app: Express) {}
  public handleRequest(req: Request, res: Response, next: NextFunction): void {
    if (this.isInitial(req)) {
      this.currentHandler = new Initial(this.app)
    } else if (this.currentHandler instanceof Initial) {
      this.currentHandler = new Next(this.app)
    }
    if (this.currentHandler) {
      this.currentHandler.handle(req, res/* , next */)
    } else {
      next(new Error('No handler available'))
    }
  }
  private isInitial(req: Request): boolean {
    return req.path === '/'
  }
  // private getHandlerType(req: Request): string {
  //   if (this.isInitial(req)) {
  //     return 'initial'
  //   }
  //   if (this.isView(req.path)) {
  //     return 'view'
  //   }
  //   if (this.isStatic(req.path)) {
  //     return 'static'
  //   }
  //   return 'unknown'
  // }
}
