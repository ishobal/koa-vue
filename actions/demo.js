import Router from 'koa-router'
import { UserModel } from '../models/index'

const router = new Router()

router.get('/', async function (ctx) {
  const user = await UserModel.create()

  ctx.session.username = '张三'
  ctx.cookies.set('userInfo', 'gouzi', {
    maxAge: 1000 * 60 * 60
  })
  ctx.body = JSON.stringify(user)
})

router.get('/child', function (ctx) {
  console.log(ctx.session.username)
  console.log(ctx.cookies.get('userInfo'))
  ctx.body = 'demo child'
})

module.exports = router
