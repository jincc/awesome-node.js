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

<h3>chat rooms</h3>

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
<h3>异步</h3>
<h4>串行话流程控制</h4>
<s>看Node in action第75页</s><br>
<a href='/Users/junl/Documents/Github/awesome-node.js/Cap3编程基础/random_story'>demo</a><br>

> 串行话流程控制的本质是在需要时让回调进场。把所以任务放进一个数组里面，让每个任务执行完成以后调取下一个继续执行。

<h4>异步流程控制</h4>
<s>看Node in action第77页</s>
<a href='/Users/junl/Documents/Github/awesome-node.js/Cap3编程基础/word_count'>demo</a><br>

> 用一个记步数来记录当前以及完成的任务数,然后比较

<h3>构建Node web程序</h3>
调用setHeader(),statusCode等api时，需要是在第一次调用res.write()或res.end()之前就行。在响应主体的第一部分写入之后，Node会刷新已经设定好的HTTP头。
<pre>
var server = http.createServer((req,res)=>{
    console.log('request')
    var body = 'hello world'
    //设置响应头，添加和移除响应头的顺序可以随意，但一定要在调用res.write()或 res.end()之前。在 响应主体的第一部分写入之后，Node会刷新已经设定好的HTTP头。
    res.setHeader('Content-Length',body.length)
    res.setHeader('Content-Type','text/plain')
    //状态码
    res.statusCode = 200
    res.write('hello world')
    res.end()
    console.log(res)
})
server.listen(3000)
</pre>

<h3>构建RESTful web服务</h3>

<a href='/Users/junl/Documents/Github/awesome-node.js/Cap4构建web程序/restful.js'>代码地址</a><br>
REST服务指定了GET、POST、PUT和DELETE，分别跟由URL指定的资源的获取、创建、更新和移除相对应
+ GET 获取
+ POST 创建
+ PUT 更新
+ DELETE 删除

<h4>设定Content-Length头</h4>

<s>为了提高响应速度，如果可能的话，应该在响应中带着Content-Length域一起发送</s>。设定Content-Length域会隐含禁用Node的块编码，因为要传输的数据更少 所以能提升性能。Content-Length的值应该是<s>字节长度</s>，不是字符长度，并且如果字符串中有多字节字符，两者的长度是不一样的。为了规避这 个问题，Node提供了一个<s>Buffer.byteLength()</s>方法

<h3>静态文件服务</h3>
<h4>用pipe优化代码</h4>
READSTREAM继承eventEmitter，拥有`data`和`end`事件,一般我们会在data里面凭借数据流，end里面发送或者处理数据，这样效率是很低效的。使用pipe管道,开发人员可以每收到一块数据就开始处理，而不用等所有数据都到全了再做处理.

所有ReadableStream都能接入任何一个WritableStream。比如HTTP请求(req)对象就是ReadableStream，你可以让其中的内容流动到文件中:
req.pipe(fs.createWriteStream('./req-body.txt'))

<h4>处理服务器错误</h4>
当我们在请求某些不存在的文件时,如果没有设置监听器，error事件会被抛出。也就是说如果你不监听这些错误，那它们 就会搞垮你的服务器。
<pre>
var server = http.createServer((req,res)=>{
    var pathname = url.parse(req.url).pathname
    //req
    req.setEncoding('utf-8')
    var readStream = fs.createReadStream(path.join(__dirname,pathname))
    readStream.pipe(res)
    readStream.on('error',(err)=>{
        console.log(`读取文件失败`,err)
    })
})
</pre>
<h3>从表单中接受用户输入</h3>

表单提交请求带的Content-Type值通常有两种:
+ application/x-www-form-urlencoded:这是HTML表单的默认值;
+ multipart/form-data:在表单中含有文件或非ASCII或二进制数据时使用。

<h3>Connect</h3>
中间件组件是一个函数，它拦截HTTP服务器提供的请求和响应对象，执行逻辑，然后或者结束响应，或者把它传递给下一个中间件组件

<h3>express</h3>
Express构建在Connect之上，致力于打造出更小的，模块化更高的功能实现.

要在UNIX中设置环境变量，可以用这个命令:
$ NODE_ENV=production node app 在Windows中用这个:
这些环境变量会出现在你程序里的process.env对象中。