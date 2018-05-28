const Koa = require('koa')
const koabody = require('koa-body')
const app = new Koa()
app.use(koabody())
app.use(ctx=>{
    console.log(ctx.request.body)
    // ctx.response.body = ctx.request.body
    const body = ctx.request.body
    if (!body.name){
        ctx.throw(400,'name required')
    }
    ctx.response.body = {name:body.name}
})
app.listen(3000)