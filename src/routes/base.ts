import { Router } from 'express'

/**
 * ベースクラス
 */
export default abstract class BaseRouter {
  /**
   * ルータ
   */
  router!: Router
}
