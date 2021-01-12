import { performance } from 'perf_hooks'
import { Context, Next } from "koa";
import { logger } from '../logger'

export async function loggingMiddleware(ctx: Context, next: Next) {
  const startPerfomanceMark = performance.now()
  logger.info(`> ${ctx.method} ${ctx.url}`)

  await next()

  const responseTime = performance.now() - startPerfomanceMark
  const logMessage = `< ${ctx.method} ${ctx.url} [${ctx.response.status}] - ${responseTime}ms`
  if (ctx.status >= 500) {
    return logger.error(logMessage)
  } else if (ctx.status >= 400) {
    return logger.warn(logMessage)
  }
  logger.info(logMessage)
}