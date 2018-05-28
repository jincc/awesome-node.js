const Koa = require('koa')
const koastatic = require('koa-static')
const os = require('os')
const path = require('path')
const logger = require('koa-logger')
const koabody = require('koa-body')
const fs = require('fs')
const app = new Koa()

app.use(logger())
app.use(koabody({multipart:true}))
//custom 404
app.use(async (ctx,next)=>{
    await next()
    if(ctx.body || !ctx.idempotent) return
    ctx.redirect('/404.html')
})
app.use(koastatic(path.join(__dirname,'/views')))
app.use(async(ctx,next)=>{
    console.log('enter')
    if(ctx.request.method !== 'POST') return await next()
    const file = ctx.request.body.files.file
    const targetpath = path.join(os.tmpdir(),Math.random().toString())
    const reader = fs.createReadStream(file.path)
    const writer = fs.createWriteStream(targetpath)
    reader.pipe(writer)
    const msg = 'upload '+file.name +'>>>' + targetpath
    ctx.response.body = msg
})
app.listen(3000)