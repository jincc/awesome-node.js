var http = require('http')
var url = require('url')
var cache = []
var server = http.createServer((req,res)=>{
    switch (req.method){
        case 'POST':
            handlePostData(req,res)
        break;
        case 'GET':
            handleGet(req,res)
        break
        case 'DELETE':
            handleDelete(req,res)
        break
    }
})
//curl -I -X DELETE http://localhost:3000/2
function handleDelete(req,res){
    let pathname = url.parse(req.url).pathname
    //去掉'/'并转换为number
    let index = parseInt(pathname.slice(1))
    if(isNaN(index) || !index || !cache[index]){
        res.statusCode = 404
        res.end('参数无效')
    }else {
        cache.splice(index,1)
        res.end('删除成功')
    }
}

//curl  http://localhost:3000
function handleGet(req,res){
    var body = cache.map((element,i)=>{
        return `第${i}列:${element}\n`
    }).join('\n')
    //Content-Length的值应该是字 节长度，不是字符长度，并且如果字符串中有多字节字符，两者的长度是不一样的。为了规避这 个问题，Node提供了一个Buffer.byteLength()方法
    res.setHeader('Content-Length',Buffer.byteLength(body))
    res.setHeader('Content-Type','text/plain')
    res.end(body)
}
//curl -d 'i am student' http://localhost:3000
function handlePostData(req,res){
    var item = ''
    req.on('data',(chunk)=>{
        item+=chunk
    })
    req.on('end',()=>{
        //finsiehd
        cache.push(item)
        res.end('添加成功')
    })
}

server.listen(3000)