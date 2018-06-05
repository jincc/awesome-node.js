var connect = require('connect')
var app = connect()

const logger = (req,res,next)=>{
    console.log(`%s %s`,req.method,req.url)
    //完成工作，转交给下一个中间件
    next()
}

const mount = (req,res,next)=>{
    res.setHeader('Content-Type','text/plain')
    // res.setEncoding('utf8')
    res.end('挂载路径才能访问')
    // next()
}
const mount2 = (req,res,next)=>{
    res.setHeader('Content-Type','text/plain')
    // res.setEncoding('utf8')
    res.end('挂载路径才能访问22')
    // next()
}
const hello = (req,res,next)=>{
    res.setHeader('Content-Type','text/plain')
    res.end('hello world')
}

//使用logger
app.use(logger)
app.use('/',mount)
app.use(hello)
app.listen(3000)
