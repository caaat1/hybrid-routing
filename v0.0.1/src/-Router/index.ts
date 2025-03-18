import type {Express, NextFunction, Request, Response} from 'express'

import type RequestHandler from '../RequestHandler/index.js'
import Initial from '../RequestHandler/Initial/index.js'

export default class Router {
  private currentHandler: RequestHandler
  public constructor(private readonly app: Express) {
    this.currentHandler = new Initial(this.app)
  }
  public handleRequest(req: Request, res: Response, next: NextFunction): void {
    this.currentHandler.handle(req, res, next)
    this.currentHandler = this.currentHandler.getNextHandler()
  }
}
