var fs = require('fs')
process.stdout.write('    \033[31m  Enter your choic: /\033[39m')
//process.cwd()当前路径
fs.readdir(process.cwd(),function(err,files){
    console.log(process.cwd())
    if(!files.length){
        return console.log('\033[31m No files to show!\033[39m\n')
    }
    console.log('Select which file or directory you want to see\n')

    function file(i){
        var fileName = files[i]
        fs.stat(__dirname+'/'+fileName,function(err,stat){
            if (stat.isDirectory()){
                console.log('      '+i+'      \033[36m' + fileName + '/\033[39m')
            }else{
                console.log('      '+i+'      \033[90m' + fileName + '/\033[39m')
            }
            i++;
            if(i == files.length){
                console.log('')
                process.stdout.write('    \033[31m  Enter your choic: /\033[39m')
                //等待用户输入
                process.stdin.resume()
                process.stdin.setEncoding('utf8')
            }else{
                file(i)
            }
        })
    }
    file(0)
})