const Koa = require('koa')
const session = require('koa-session')
const router = require('koa-route')
const app = new Koa()
app.keys = ['jincc']
//session中间件
app.use(session(app))
app.use(router.get('/',(ctx,next)=>{
    if (ctx.request.path === '/favicon.ico') return;
    let n = ctx.session.views || 0
    ctx.session.views = ++n
    ctx.response.body = n + 'views'
}))
app.listen(3000)