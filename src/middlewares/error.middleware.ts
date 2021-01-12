import { Context, Next } from "koa";
import { logger } from '../logger'

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || error.statusCode || 500
    ctx.body = 'Internal Server Error'
    logger.error(error, error.name)
  }
}