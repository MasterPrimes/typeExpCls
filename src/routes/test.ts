/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express'
import logger from '../app_modules/logger'
import { Path, Post } from '../app_modules/deco'
import BaseRouter from './base'

@Path('/test')
export default class TestRouter extends BaseRouter {
  /**
   * Post処理テスト
   * @param req リクエスト
   * @param res レスポンス
   */
  @Post('/regist')
  regist(req: Request, res: Response): void {
    logger.debug('root start')
    res.status(200).send({
      message: 'Post Response for TypeScript',
    })
  }
}
