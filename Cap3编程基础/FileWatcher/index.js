import { EventEmitter } from "events";
import * as fs from 'fs'
/**
 * 1.文件监听器,主要做两件事情,当转换所有目录里面的文件名为小写
 * 2.当文件有改动的时候，再次转换
 */
export default class Watcher extends EventEmitter{
    constructor (originPath,processedPath){
        super()
        this.originPath = originPath
        this.processedPath = processedPath
    }
    watch(){
        fs.readdir(this.originPath,(err,files)=>{
            if(err){
                console.error(err)
                return;
            }
            //监测每一个文件
            files.forEach(element=>{
                // this.realCheck(file)
                this.emit('process',element)
            })
        })
    }
    start(){
        fs.watchFile(this.originPath,()=>{
            this.watch()
        })
    }
}
