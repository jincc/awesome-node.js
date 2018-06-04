
var path = require('path')
var http = require('http')
// var server = http.createServer((req,res)=>{
//     console.log('request')
//     var body = 'hello world'
//     //设置响应头，添加和移除响应头的顺序可以随意，但一定要在调用res.write()或 res.end()之前。在 响应主体的第一部分写入之后，Node会刷新已经设定好的HTTP头。
//     res.setHeader('Content-Length',body.length)
//     res.setHeader('Content-Type','text/plain')
//     //状态码
//     res.statusCode = 200
//     res.write('hello world')
//     res.end()
//     console.log(res)
// })
// server.listen(3000)

require('./restful')