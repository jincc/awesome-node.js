var fs = require('fs')
var path = require('path')
var args = process.argv.splice(2)
console.log(args)
//命令
var command = args.shift()
var taskDescription = args.join(' ')

var file = path.join(process.cwd(),'./tasks')

switch (command){
    case 'list':
    listTask()
    break;
    case 'add':
    writeTask()
    break;
}
function listTask(){
    loadOrInitializeTaskArray(file,(data)=>{
        data.forEach(console.log)
    })
}
function writeTask(){
    loadOrInitializeTaskArray(file,data=>{
        data.push(taskDescription)
        //write
        fs.writeFile(file,JSON.stringify(data),(err)=>{
            if(err){
                console.log(err)
            }
        })
    })
}
function loadOrInitializeTaskArray(file,cb){
    fs.readFile(file,(err,data)=>{
        if(err){
            console.error(err)
            cb([])
        }else{
            //fomatter
            data = data.toString()
            data = JSON.parse(data || '[]')
            cb(data)
        }
    })
}

// console.log(file,command,taskDescription)