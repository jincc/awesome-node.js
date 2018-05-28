<h3>流数据</h3>
你可以把数据流看成特殊的数组，只不过数组中的数据分散在空间上，而数据流中的数据是分散在时间上的。通过将数据一块一块地传送，开发人员可以每收到一块数据就开始处理，而不用等所有数据都到全了再做处理。下面我们用数据流的方 式来处理resource.json:
<pre>
    var stream = fs.creatReadStream('./koa.md')
    stream.on('data',(chunk)=>{
        console.log(chunk)
    })
    stream.on('end',()->{
        console.log('finished')
    })
</pre>
<s>程序就可以边读取边处理</s>，这要比等着所有数据都缓存到内存中再处理效率高得多.这是一种高效的数据处理方式，只要有数据准备好就可以处理，不用等着读取完整个资源再把它写出去。
res对象也是可写数据流中的一种.
<pre>
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'image/png'})
    //设置一个读取流到写入流的管道
    fs.createReadStream('./image.png').pipe(res)
}).listen(3000)
</pre>

<h3>char rooms</h3>

访问内存(RAM)要比访问文件系统快得多，所以Node程序通常会把常用的数据缓存到内存里

<h3>模块</h3>
Node模块允许你从被引入文件中选择要暴露给程序的函数和变量。如果模块返回的函数或变 量不止一个，那它可以通过设定exports对象的属性来指明它们。但如果模块只返回一个函数或变量，则可以设定module.exports属性.<br>

如果你创建了一个既有exports又有module.exports 的模块，那它会返回module.exports，而exports会被忽略。<br>
> 最终在程序里导出的是module.exports。exports只是对module.exports的一个全局引用，最初被定义为一个可以添加属性的空对象。所以exports.myFunc只是 module.exports.myFunc的简写。

> 模块的引入使用`require`关键字，它是Node中少数几个同步I/O的操作之一.I/O密集的地方劲量不要使用required，因为他会阻塞node.
<h4>用node_modules重用模块</h4>
***看Node.js实战第57页****
> 如果是需要导出的模块是目录,在模块目录中定义模块的文件必须被命名为index.js，除非你在这个目录下一个叫package.json的文件里main里面有特别指明

<h3>EventEmitter</h3>
在错误处理上有个常规做法，你可以创建发出error类型事件的事件发射器，而不是直接 抛出错误。这样就可以为这一事件类型设置一个或多个监听器，从而定义定制的事件响应逻辑。
  下面的代码显示的是一个错误监听器如何将被发出的错误输出到控制台中:
 <pre>
var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('error', function(err) {
  console.log('ERROR: ' + err.message);
});
myEmitter.emit('error', new Error('Something is wrong.'));
 </pre>
如果这个error事件类型被发出时没有该事件类型的监听器，事件发射器会输出一个堆栈 跟踪(到错误发生时所执行过的程序指令列表)并停止执行。堆栈跟踪会用emit调用的第二 个参数指明错误类型。这是只有错误类型事件才能享受的特殊待遇，在发出没有监听器的其他 事件类型时，什么也不会发生。
如果发出的error类型事件没有作为第二个参数的error对象，堆栈跟踪会指出一个“未 捕获、未指明的‘错误’事件”错误，并且程序会停止执行。你可以用一个已经被废除的方法处 理这个错误，用下面的代码定义一个全局处理器实现响应逻辑:
 <pre>
process.on('uncaughtException', function(err){
  console.error(err.stack);
  process.exit(1);
});
</pre>
 