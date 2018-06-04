var http = require('http')
var _ = require('ejs')
var qs = require('querystring')
var items = []
var server = http.createServer((req,res)=>{
    switch(req.method){
        case 'GET':
        showList(res)
        break;
        case 'POST':
        add(req,res)
        break;
        default:
        //400
        res.statusCode = 400
        res.end('暂不支持其他请求')
        break;
    }
})
async function showList(res){
    var html = require('./form')
    try {
        html = await  _.render(html,{items:items})
        res.setHeader('Content-Type','text/html')
        res.setHeader('Content-Length',Buffer.byteLength(html))
        res.end(html)
    } catch (error) {
        console.log(error)
    }

    console.log(html)
}
function add(req,res){
    var body = ''
    // req.setEncoding('utf8')
    req.on('data',(chunk)=>{
        body+=chunk
    })
    req.on('end',()=>{
        var obj = qs.parse(body)
        items.push(obj.item)
        showList(res)
    })
}
server.listen(3000)