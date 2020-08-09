/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import logger from '../app_modules/logger'
import { Path, Get } from '../app_modules/deco'
import BaseRouter from './base'

@Path('/')
export default class IndexRouter extends BaseRouter {
  @Get('/')
  root(req: Request, res: Response): void {
    logger.debug('root start')
    res.status(200).send({
      message: 'Hello Express for TypeScript',
    })
  }
}
