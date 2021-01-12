import Koa, { Context } from 'koa'
import KoaRouter from '@koa/router'
import { loggingMiddleware } from './middlewares/logger.middleware'
import { logger } from './logger'
import { errorMiddleware } from './middlewares/error.middleware'

const router = new KoaRouter()
  .get('/first', (ctx: Context) => {
    logger.info('Log from first router')
    ctx.body = { message: 'First router' }
  })
  .get('/second', (ctx: Context) => {
    logger.info('Log from first router')
    ctx.body = { message: 'Second router' }
  })
  .get('/error', (ctx: Context) => {
    // ctx.throw(500)
    throw new Error('Ops!')
  })


const app = new Koa()
  .use(loggingMiddleware)
  .use(errorMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())


async function bootstrap() {
  app.listen(3000, '0.0.0.0', () => {
    logger.info('Server started, port 3000')
  })
}


bootstrap()