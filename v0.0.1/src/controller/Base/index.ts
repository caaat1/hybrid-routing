// pathName: src/controller/Base/index.ts

import type {Express, Request, Response} from 'express'

import type RequestHandler from '../../Request/Handler/index.js'
import NotFound from '../../Request/Handler/NotFound/index.js'
import StaticFile from '../../Request/Handler/StaticFile/index.js'
import View from '../../Request/Handler/View/index.js'

export default class Base {
  private readonly handler: {
    view: RequestHandler
    staticFile: RequestHandler
    notFound: RequestHandler
  }
  public constructor(private readonly app: Express) {
    this.handler = {
      view: new View(app),
      staticFile: new StaticFile(app),
      notFound: new NotFound(app),
    }
  }
  public async getRequestHandler(
    req: Request,
    res: Response,
  ): Promise<RequestHandler | null> {
    try {
      const handler: RequestHandler =
        (await this.handler.view.isTheCase(req, res).catch(() => null)) ??
        (await this.handler.staticFile.isTheCase(req, res).catch(() => null)) ??
        this.handler.notFound
      console.log(
        `Handler selected (${req.method} ${req.url}):`,
        handler.constructor.name,
      )
      return handler
    } catch (err) {
      console.error('Unexpected error:', err)
      const INTERNAL_SERVER_ERROR = 500
      res.status(INTERNAL_SERVER_ERROR).send('Internal Server Error')
      return null
    }
  }
}
