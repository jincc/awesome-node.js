var path = require('path')
var http = require('http')
var url  = require('url')
var fs = require('fs')
var server = http.createServer((req,res)=>{
    var pathname = url.parse(req.url).pathname
    pathname = path.join(__dirname,pathname)
    //req
    req.setEncoding('utf-8')
    fs.stat(pathname,(err,stats)=>{
        console.log(stats,err)
        if (err){
            if('ENOENT' == err.code){
                res.statusCode = 400
                res.end('Not Found')
            }else{
                res.statusCode = 500
                res.end('Internal Server Error')
            }
        }else{
            var readStream = fs.createReadStream(pathname)
            readStream.pipe(res)
            readStream.on('error',(err)=>{
                console.log(`读取文件失败`,err)
                res.statusCode = 500
                res.end('Internal Server Error')
            })
        }
    })

    
})
server.listen(3000)