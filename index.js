/**
 * @file 开发环境主入口
 */

import Koa from 'koa'
import glob from 'glob'
import koaWebpack from 'koa-webpack'
import koaStatic from 'koa-static'
import history from 'koa2-history-api-fallback'
import session from 'koa-session'
import webpackConfig from './vue/webpack.config.js'
import routes from './actions/common'
import appConfig from './config/index'
import log from './utils/log'

const app = new Koa()

const PORT = process.env.PORT || appConfig.port

app.keys = ['hello', 'mykeys']

app.use(session({
  key: 'test',
  prefix: 'test:uid',
  maxAge: 60 * 20 * 1000, // 有效期
  renew: true // 自动续期
}, app))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = `${err.name} ${err.message}`
    // 手动释放error事件
    ctx.app.emit('error', err, ctx)
  }
})
// 继续触发error事件
app.on('error', (err, ctx) => {
  const query = ctx.query || ctx.request.body || ''
  const errCode = err.statusCode || err.status || 500
  log.error(ctx.url, JSON.stringify(query), errCode, `${err.name} ${err.message}`)
})

registerApp()

async function registerApp () {
  app.use(async (ctx, next) => {
    await next()

    const query = ctx.query || ctx.request.body || ''
    if (ctx.url.indexOf('api') < 0) {
      log.info(ctx.url)
    } else {
      log.info(ctx.url, JSON.stringify(query), ctx.status, ctx.body)
    }
  })

  try {
    // node 端中间件和路由
    await registerMiddlewares()
    // app.use(fileLog)
    app.use(routes.routes(), routes.allowedMethods())
    // 前端(vue)路由
    // 所有 navigate 请求重定向到 '/'，因为 webpack-dev-server 只服务这个路由
    if (app.env === 'development') {
      app.use(history({
        htmlAcceptHeaders: ['text/html'],
        index: '/',
        verbose: true
      }))
    } else {
      app.use(history({
        htmlAcceptHeaders: ['text/html'],
        index: '/index.html'
      }))
      app.use(koaStatic('vue-dist'))
    }
    app.use(koaStatic('public'))
    if (app.env === 'development') {
      await registerWebpack()
    }
    app.listen(PORT)
    if (app.env === 'development') {
      log.trace('开发环境服务器启动于端口号', PORT, '等待 webpack 编译中，请稍候。\n\n')
    } else {
      log.trace('生产环境服务器启动于端口号', PORT)
    }
  } catch (e) {
    log.error(e)
    if (app.env === 'development') {
      log.error('开发环境服务器启动失败\n\n')
    } else {
      log.error('生产环境服务器启动失败\n\n')
    }
  }
}

async function registerMiddlewares () {
  return new Promise((resolve, reject) => {
    glob('middlewares/**/*.js', (err, files) => {
      if (err) {
        log.error('读取 middlewares 失败')
        log.error(err)
        reject(new Error('读取 middlewares 失败'))
        return
      }
      files.forEach(middlewarePath => {
        const middleware = require(`./${middlewarePath}`)
        if (typeof middleware !== 'function') {
          return
        }

        app.use(middleware)
      })

      resolve()
    })
  })
}

async function registerWebpack () {
  return new Promise(resolve => {
    koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        stats: 'minimal'
      }
    }).then(middleware => {
      app.use(middleware)
      resolve()
    })
  })
}
