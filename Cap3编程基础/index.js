
const currency = require('./currency')
const custom = require('./customPackage')
const es6  = require('./es6')
const path = require('path')
const fs = require('fs')

import Watcher from './FileWatcher/index'

// require('./demo/index')
// require('./eventEmitter')


//同步控制测试
// require('./random_story/index')
//异步控制测试
import Start from './word_count/index'
Start()

//emitter测试
// (function(){
//     const origin = path.join(__dirname,'./FileWatcher/origin')
//     const target = path.join(__dirname,'./FileWatcher/target')

//     const watcherFile = new Watcher(origin,target)
//     watcherFile.watch()
//     watcherFile.start()

//     watcherFile.on('process',(file)=>{
//         console.log(file)
//         const path1 = path.join(origin,file)
//         const path2 = path.join(target,file.toLowerCase())
//         fs.rename(path1,path2,err=>{
//             console.log(err)
//         })
//     })
// })()
