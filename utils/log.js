/**
 * @file 框架本身使用的 utils 方法，和业务逻辑分开
 */

import chalk from 'chalk'
import log4js from 'log4js'

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: `logs/${new Date().toLocaleDateString()}.log` }
  },
  categories: {
    default: { appenders: ['everything'], level: 'info' }
  }
})

const log = console.log
const logger = log4js.getLogger()
// 带颜色的日志打印
module.exports = {
  trace () {
    log(chalk.green('[Trace]'), ...arguments)
  },

  info () {
    log(chalk.green('[Info]'), ...arguments)
    if (arguments.length > 1) {
      logger.info(...arguments)
    }
  },

  warn () {
    log(chalk.yellow('[Warn]'), ...arguments)
  },

  error () {
    log(chalk.red('[Error]'), ...arguments)
    logger.error(...arguments)
  }
}
