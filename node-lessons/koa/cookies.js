const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

app.use(route.get('/',(ctx,next)=>{
    //利用符号进行的类型转换,转换成数字类型
    const n = ~~ctx.cookies.get('view') + 1
    console.log(ctx.cookies.get('view'))
    ctx.cookies.set('view',n)
    ctx.response.body = n + 'views'
 }))
app.listen(3000)
