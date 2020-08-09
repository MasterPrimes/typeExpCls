// import { Router, Request, Response } from 'express'
import 'reflect-metadata'
import * as express from 'express'

type HttpMethod = 'get' | 'post' | 'put'
interface ActionMetadata {
  path: string
  method: HttpMethod
  action?: any
}

const ACTION_KEY = Symbol('action')

/**
 * pathクラスデコレータ
 * @param path パス
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Path = (path: string) => {
  console.log('-- decorator factory invoked --')
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    console.log('constrructor: called')
    return class extends target {
      router: express.Router

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      constructor(...args: any[]) {
        super()
        const childRouter = express.Router()
        const list: ActionMetadata[] = Reflect.getMetadata(
          ACTION_KEY,
          target.prototype
        )
        if (list) {
          list.forEach((meta) => {
            childRouter[meta.method](meta.path, meta.action)
          })
        }
        this.router = express.Router()
        this.router.use(path, childRouter)
      }
    }
  }
}

/**
 * HTTPメソッドごとのデコレータ処理を行う
 * @param method HTTPメソッド
 * @param path パス
 */
function httpMethodDecorator(
  method: HttpMethod,
  path: string
): MethodDecorator {
  const ret: MethodDecorator = (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    console.log(`${method}(): called`)
    const meta: ActionMetadata = { path, method, action: descriptor.value }
    const list = Reflect.getMetadata(ACTION_KEY, target)
    if (list) {
      list.push(meta)
      return
    }
    Reflect.defineMetadata(ACTION_KEY, [meta], target)
  }
  return ret
}

/**
 * Getメソッドデコレータ
 * @param path パス
 */
export const Get = (path: string): MethodDecorator => {
  console.log('get(): evaluated')
  return httpMethodDecorator('get', path)
}

/**
 * Postメソッドデコレータ
 * @param path パス
 */
export const Post = (path: string): MethodDecorator => {
  console.log('post(): evaluated')
  return httpMethodDecorator('post', path)
}

const deco = {}
export default deco
