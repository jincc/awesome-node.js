
//'/'所以文中列表
//'/post/new',添加新文章
//'/post/:id 展示文章详情

import Koa from 'koa'
const router = require('koa-router')()
const views = require('koa-views')
const path = require('path')
const db = require('./db')
const app = new Koa()
//列出所以得文章
router.get('/',async (ctx,next)=>{    
    const list = db.list()
    await ctx.render('article',{list})
})
//新增文章
router.get('/post/new',async(ctx,next)=>{
    await ctx.render('new')
})
//展示文章详情
router.get('/post/:id',(ctx,next)=>{
    const id = ctx.params.id
    const article = db.getElem(id)
    ctx.body = article.details
})

console.log(__dirname)
app.use(views(path.join(__dirname,'/views'),{extension:'ejs'}))
app.use(router.routes())
// app.use(async(ctx,next)=>{
//     const list = db.list()
//     await ctx.render('article',{list})
//  })
app.listen(3000)