import pino, { LoggerOptions, stdTimeFunctions } from 'pino'

const baseOptions: LoggerOptions = { timestamp: stdTimeFunctions.isoTime, base: null }

const devOptions: LoggerOptions = Object.assign({ prettyPrint: { levelFirst: true } } as LoggerOptions, baseOptions)
const prodOptions: LoggerOptions = Object.assign({} as LoggerOptions, baseOptions)

export const logger = pino(prodOptions)