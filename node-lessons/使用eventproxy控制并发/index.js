const Koa = require('koa')
const request = require('superagent')
const router = require('koa-route')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const URL  = require('url')
const app = new Koa()

const cnodeUrl = 'https://cnodejs.org/';
const ep  = new eventproxy()
async function getListUrls(html) {
    return new Promise((resolve,reject)=>{
        var $ = cheerio.load(html.text)
        //获取首页链接
        var urls = []
        $('#topic_list .topic_title').each((index,element)=>{
            var $element = $(element);
            var href = $element.attr('href')
            //我们用 url.resolve 来自动推断出完整 url，变成
            href = URL.resolve(cnodeUrl,href)
            urls.push(href)
        })
        //取前三个列表数据
        resolve(urls.slice(0,3))
    })
}

async function getDetailComments(urls){
    return new Promise((resolve,reject)=>{
            //获取到了社区所有帖子的url，现在我们去获取每个的详情
            ep.after('topic_html',urls.length,(topics)=>{
                // console.log(topics)
                topics = topics.map((topic)=>{
                    const topicurl = topic[0]
                    const topichtml = topic[1]
                    const $ = cheerio.load(topichtml)
                    return ({
                        title:$('.topic_full_title').text(),
                        href : topicurl,
                        comment:$('.reply_content').eq(0).text(),
                        score:$('.big').text(),
                        anchor:$('.user_name').text()
                    })
                })
                console.log(topics)
                resolve(topics)        
            })
            // console.log(urls)
            urls.forEach(url => {
                request.get(url).end((e,v)=>{
                    if (e){
                        reject(e)
                        return;
                    }
                    console.log('successful' + url)
                    ep.emit('topic_html',[url,v.text])
                })
            })
        })
}


app.use(router.get('/',async (ctx,next)=>{
    ctx.type = 'json'
   var topics =  request
    .get(cnodeUrl)
    .then(getListUrls)
    .then(getDetailComments)

    ctx.body = await topics
}))
app.listen(3000)