var Koa = require('koa')
var send = require('koa-send')
var app = new Koa()
app.use(async ctx=>{
    await send(ctx,'index.js')
})
// app.use(async (ctx) => {
//     if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
//     await send(ctx, ctx.path);
//   })
app.listen(3000)
