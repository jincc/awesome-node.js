const koa = require('koa')
const route = require('koa-route')
const app = new koa()
const redirect = ctx=>{
    ctx.response.redirect('/')
}
const main = ctx=>{
    ctx.response.body = 'hello world'
}
app.use(main)
app.use(route.get('/',main))
app.use(route.get('/redirect',redirect))
app.listen(3000)