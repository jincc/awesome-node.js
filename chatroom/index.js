var http = require('http')
var path = require('path')
var fs = require('fs')
var mime = require('mime')
//处理基于socket。io服务端聊天功能的模块
var chatServer = require('./libs/chat_server')

var CACHES = {}
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'})
    response.write('Error 404:resource not found')
    response.end()
}

function sendFile(response,filePath,fileContents){
    const mimeType = mime.getType(path.basename(filePath))
    response.writeHead(200,{'Content-Type':mimeType})
    response.end(fileContents)
}
//冲缓存里获取文件
function serveStatic(response,cache,absPath){
    console.log(absPath)
    if (cache[absPath]){
        sendFile(response,absPath,cache[absPath])
    }else{
        fs.exists(absPath,(exist) => {
            if (exist){
                //读取
                fs.readFile(absPath,(err,contents)=>{
                    if(err){
                        send404(response)
                    }else{
                        cache[absPath] = contents
                        sendFile(response,absPath,cache[absPath])
                    }
                })
            }else{
                send404(response)
            }
        })
    }
}

var server = http.createServer((request,response)=>{
    var filePath = null
    if (request.url == '/'){
        filePath = '/public/index.html'
    }else{
        if (request.url.endWith(''))
        filePath =  request.url
    }
    serveStatic(response,CACHES,path.join(__dirname,filePath))
})
//启动socket.io
chatServer.listen(server)

server.listen(3000,()=>{
    console.log('server start listen 3000')
})

String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d);
}