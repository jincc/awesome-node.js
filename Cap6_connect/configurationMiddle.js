var connect = require('connect')
var app = connect()

function logger(format){
    var regexp = /:(\w+)/g
    return function(req,res,next){
        var str = format.replace(regexp,function(match,property){
            return req[property]
        })
        console.log(str)
        next()
    }
}

function helloworld(req,res,next){
    res.end('hello world')
}
app.use(logger(':url :method'))
app.use(he)
app.listen(3000)