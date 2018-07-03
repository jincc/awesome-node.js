var fs = require('fs'),
stdin = process.stdin,
stdout = process.stdout,
files = [],
stats = []

function file(i){
    var fileName = files[i]
    fs.stat(__dirname+'/'+fileName,function(err,stat){
        //保存stats
        stats[i] = stat
        if (stat.isDirectory()){
            console.log('      '+i+'      \033[36m' + fileName + '/\033[39m')
        }else{
            console.log('      '+i+'      \033[90m' + fileName + '/\033[39m')
        }
        if(++i == files.length){
            read()
        }else{
            file(i)
        }
    })
}

function read(){
    console.log('')
    stdout.write('    \033[31m  Enter your choic: /\033[39m')
    //等待用户输入
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data',option)
}
function option(data){
    var fileName =  files[parseInt(data)]
    if (!fileName){
        stdout.write('   \033[31mEnter your choice: \033[39m')
    }else{
        //回到默认状态
        stdin.pause()
        if (stats[parseInt(data)].isDirectory()){
            //目录
            fs.readdir(__dirname+'/'+fileName,(err,files)=>{
                console.log(`(${files.length} files)`)
                files.forEach(ele=>{
                    console.log(`   -  ${ele}`)
                })
            })
        }else{
            fs.readFile(__dirname + '/' + fileName,{encoding:'utf8'},(err,data)=>{
                //添加一些辅助缩进
                // data = data.replace(/(.*)/g,'$1')
                console.log(data)
            })
        }
    }
}

// stdout.write('    \033[31m  Enter your choic: /\033[39m')
// //process.cwd()当前路径
// fs.readdir(process.cwd(),function(err,filedatas){
//     // console.log(process.cwd())
//     files = filedatas
//     if(!files.length){
//         return console.log('\033[31m No files to show!\033[39m\n')
//     }
//     console.log('Select which file or directory you want to see\n')
//     file(0)
// })

//_______________api-________________
//第一元素为node，第二个为路径，后面的为参数
console.log(process.argv)
console.log(process.argv.slice(2))

//程序运行时的当前工作目录,__dirname是执行文件时该文件在文件系统中所在的目录.
console.log(process.cwd())
//node还提供了process.chdir方法来更改工作目录
process.chdir('/')
console.log(process.cwd())