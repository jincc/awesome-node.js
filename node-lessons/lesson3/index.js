const Koa = require('koa')
const superagent = require('superagent')
const router = require('koa-route')
const cheerio = require('cheerio')
const ejs  = require('ejs')
const app = new Koa()
const asyncMain = async (ctx,next)=>{
   return superagent.get('https://cnodejs.org/').then((v)=>{
        var $ = cheerio.load(v.text)
        // console.log(v.text)
        var items = []
        $('#topic_list .topic_title').each((index,element)=>{
            const $element = $(element)
            console.log($element)
            items.push({
                title:$element.attr('title'),
                href:$element.attr('href')
            })
        })
        ctx.response.type = 'html'
        // const temp = '<%= items.map(v=><p>{v.title}</p>).join("<br>"); %>'
        // const html = ejs.render(temp,{items:items})
        ctx.response.body = items
    })
}

const primiseAction = (ctx,next)=>{
    return new Promise(function(resolve, reject) {//关键啊，文档中居然没有  
        setTimeout(function() {  
          ctx.body = {message: 'Hello'};         //这就是我遇到的问题啊。异步中的ctx.body赋值。  
          resolve(next());  
        }, 1);  
      });  
}

app.use(router.get('/',asyncMain))
app.use(router.get('/promise',primiseAction))
// app.use(main)
app.listen(3000)