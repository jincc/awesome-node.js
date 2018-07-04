<h3>stream</h3>
console.log内部做了这样一件事件：他在指定的字符串后面加上\n字符，并将其写入stdout流中.
process全局对象包含了三个流对象：
 + stdin 可读流，暂停等待用户输入
 + stdout
 + stderr 

<pre>
    //等待用户输入，暂停
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data',option)
    //回到默认状态
    stdin.pause()
    //添加一些辅助缩进
     data = data.replace(/(.*)/g,'$1')
     //_______________api-________________
    //第一元素为node，第二个为路径，后面的为参数
    console.log(process.argv)
    console.log(process.argv.slice(2))

    //程序运行时的当前工作目录,__dirname是执行文件时该文件在文件系统中所在的目录.
    console.log(process.cwd())
    //node还提供了process.chdir方法来更改工作目录
    process.chdir('/')
    console.log(process.cwd())
    //Node允许通过process.env来轻松访问shell环境下的变量
    // NODE_ENV="production" node index.js
    console.log(process.env.NODE_ENV)
    //退出程序
    console.error('An error occerred')
    process.exit(1)
    //信号 进程与操作系统进行通信的一种方式就是通过信号。比如，要让进程终止，可以发送SIGKILL信号.
    process.on('SIGKILL',()=>{
    //收到终止信号
    })
</pre>

<h3>输出字体的颜色</h3>
要在文本终端下控制格式，颜色以及其他输出选项，可以使用ANSI转义码.比如
<pre>
console.log('      '+i+'      \033[36m' + fileName + '/\033[39m')
</pre>

[参见wiki](https://en.wikipedia.org/wiki/ANSI_escape_code)

+ \033表示转义的开始
+ [表示开始设置颜色
+ 36表示前景色为亮灰色
+ m表示颜色设置结束
+ 最后面用的39是把颜色设置为了原本的颜色.

<h3>非阻塞api</h3>
<h4>stream</h4>
传统的readFile函数要等到整个文件读取完毕，加载到RAM，可用的情况下才会触发.而使用strea每次读取可变大小的内容块都会触发data事件.
<pre>
var steam = fs.createReadStream('myfile.text')
steam.on('data',(chunk)=>{

})
steam.on('end',()=>[

])
</pre>