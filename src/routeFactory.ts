import express from 'express'
import TestRouter from './routes/test'
import IndexRouter from './routes/index'

/**
 * ルータ処理の実施を行う
 */
export default class RouteFactory {
  express: express.Application

  /**
   * コンストラクタ
   * @param exp Expressアプリケーション
   */
  public constructor(exp: express.Application) {
    this.express = exp
  }

  /**
   * ルーティング処理を行う
   */
  public routerInit(): void {
    const indexRouter = new IndexRouter()
    this.express.use(indexRouter.router)
    const testRouter = new TestRouter()
    this.express.use(testRouter.router)
  }
}
