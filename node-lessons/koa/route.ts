import * as Koa from 'koa'
import * as fs from 'fs'
import * as route from 'koa-route'
import * as koastatic from 'koa-static'
const app = new Koa()

const main = ctx =>{
    ctx.response.body = 'hello wolrd'
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
}
const start = ctx =>{
    ctx.response.body = 'start'
}

app.use(route.get('/',main))
app.use(route.get('/start',start))
app.listen(3000)