const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const router = require('koa-route')
const app = new Koa()
const user = {
    name:'jincc',
    age:18,
    sex:'male'
}
app.use(views(path.join(__dirname,'/views'),{extension:'ejs'}))
app.use(async(ctx,next)=>{
   await ctx.render('user',{user})
})
app.listen(3000)