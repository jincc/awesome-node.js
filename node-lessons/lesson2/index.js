const Koa = require('koa')
const utility = require('utility')
const app = new Koa()

app.use(ctx=>{
    console.log(ctx.request.query)
    ctx.response.body = utility.md5(ctx.request.query)
})
app.listen(3000)