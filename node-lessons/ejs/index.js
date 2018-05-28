const Koa = require('koa')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const app = new Koa()

const people = ['geddy','neil','alex']
const temp = '<%= people.join(", "); %>'
app.use(ctx=>{
    // const html = ejs.render(temp,{people:people})
    var  html = fs.readFileSync(path.join(__dirname,'/temp.ejs'),{encoding:'utf-8'})
    html = ejs.render(html,{title:'test',userinfo:{
        name:"jincc",
        age:"18",
        message:"<div>i'm message</div>"
    }})
    ctx.response.body = html
})
app.listen(3000)