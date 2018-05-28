
import * as fs from 'fs'
import * as path from 'path'
import { worker } from 'cluster';
const dirpath = path.join(__dirname,'text')

var word = {}
var needTask = 0
var ctTask = 0
export default function start(){
    fs.readdir(dirpath,(err,files)=>{
        if(err){
           return handleError(err)
        }
        needTask = files.length
        files.forEach(element=>{
            //read
            readTxt(path.join(__dirname,'text/'+element))
        })
    })
}

function readTxt(file){
    console.log(file)
    fs.readFile(file,(err,data)=>{
        if(err){
            return handleError(err)
        }
        data = data.toString().toLowerCase().split(/\W+/).sort()
        data.forEach(element=>{
            if(element){
                word[element] = (word[element]|| 0) + 1
            }
        })
        ctTask+=1;
        ifComplete()
    })
}


function ifComplete(){
    if (ctTask == needTask){
        console.log('finished')
        console.log(JSON.stringify(word))
    }
}

function handleError(err){
    console.error(err)
}

start()

