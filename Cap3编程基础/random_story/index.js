import * as fs  from 'fs'
import * as path from 'path'
import * as superagent from 'superagent'
import * as htmlparser from 'htmlparser'
function checkFileExist(){
    const configFile = path.join(__dirname,'rss_feeds.txt')
    fs.exists(configFile,(exists)=>{
        if (!exists){
            //error
            next(new Error('文件不存在'))
            return;
        }
        //交付给下一个任务
        console.log('checkFile success')
        next(null,configFile)
    })
}
function getRandomURL(configFile){
    fs.readFile(configFile,(err,data)=>{
        if (err){
            //error
            next(err)
            return;
        }
        data = data.toString().replace(/^\s+|\s+$/g,'').split('\n')
        var random = Math.floor(Math.random()*data.length)
        data = data[random]
        //next
        next(null,data)
    })
}

function download(configURL){
    superagent.get(configURL).end((err,data)=>{
        if (err){
            //error
            next(err)
            return;
        }
        //data
        next(null,data)
    })
}

function parseRSSFeed(rss){
    // console.log(rss)
    const handler = new htmlparser.RssHandler()
    const parser = new htmlparser.Parser(handler)
    parser.parseComplete(rss)
    console.log(handler.dom.items)
    if(!handler.dom.items.length){
        return next(new Error('No RSS items found'))
    }
    const item = handler.dom.items.shift()
    console.log(item.link)
    console.log(item.title)
}


var tasks = [checkFileExist,
             getRandomURL,
             download,
             parseRSSFeed]


function next(err,result){
    if(err){
        console.error(err)
    }
    const task = tasks.shift()
    if(task){
        task(result)
    }
}

next()