const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const DATAFILE = path.join(__dirname,'data.json')
const TEMPFILE = path.join(__dirname,'temp.ejs')
const http = require('http')
const server = http.createServer((req,res)=>{
    fs.readFile(DATAFILE,(err,data)=>{
        if (err){
            handleError(res,err)
            return
        }
        // console.log('data'+data.toString())
        var titles = JSON.parse(data.toString('utf8'))
        var s =  ejs.renderFile(TEMPFILE,{list:titles},(err,da)=>{
            if(err){
                handleError(res,err)
                return
            }
            console.log(da)
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(da)
       })
    })
})
server.listen(3000)
function handleError(res,error){
    res.end('Server error')
    console.log(error)
}
