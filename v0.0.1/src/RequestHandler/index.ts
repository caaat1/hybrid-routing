import type {Request, Response, /* NextFunction,  */ Express} from 'express'

export default abstract class RequestHandler {
  public constructor(protected app: Express) {}
  public abstract handle(
    req: Request,
    res: Response /* , next: NextFunction */,
  ): void
}
