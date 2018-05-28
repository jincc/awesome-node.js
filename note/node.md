<h3>Node优点</h3>
Node所针对的应用程序有一个专门的简称：DIRT。它表示<s>数据密集型实时(data-intensive real-time)程序</s>。因为Node自身在I/O上非常轻量，它善于将数据从一个管道混排 或代理到另一个管道上，这能在处理大量请求时持有很多开放的连接，并且只占用一小部分内存。


<h3>Node缺点</h3>
Node.js擅长IO密集任务,经常被人们吐槽的一点就是：回调太多难于控制（俗称回调地狱）和 CPU 密集任务处理的不是很好。从Callback、Promise 到 Async函数，可以轻松的满足所有开发需求。如果大家想使 JavaScript 做 CPU 密集任务，推荐 Node.js 的兄弟项目 [fibjs](http://fibjs.org/) 基于纤程(fiber，可以简单理解为更轻量级的线程)，效率非常高，兼容npm，同时没有异步回调烦恼。<br>

<h3>Node基本原理</h3>
下面是一张 Node.js 早期的架构图，来自 Node.js 之父 Ryan Dahl 的演讲稿，在今天依然不过时，它简要的介绍了 Node.js 是基于 Chrome V8引擎构建的，由事件循环（Event Loop）分发 I/O 任务，最终工作线程（Work Thread）将任务丢到线程池（Thread Pool）里去执行，而事件循环只要等待执行结果就可以了。
![架构](https://pic3.zhimg.com/v2-0e1234a12265cb9662b6bf2c05ae0cf5_b.jpg)
![xx](https://pic4.zhimg.com/v2-d5ae0c45be8b2a0037f08fa20bf0c4af_b.jpg)
核心

- Chrome V8 解释并执行 JavaScript 代码（这就是为什么浏览器能执行 JavaScript 原因）
- `libuv` 由事件循环和线程池组成，负责所有 I/O 任务的分发与执行

- JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事
- 单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
- 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 I/O 很慢，不得不等着结果出来，再往下执行
- CPU 完全可以不管 I/O 设备，挂起处于等待中的任务，先运行排在后面的任务
- 将等待中的 I/O 任务放到 Event Loop 里
- 由 Event Loop 将 I/O 任务放到线程池里
- 只要有资源，就尽力执行
<br>
之所以说 Node.js 是单线程，就是因为在接受任务的时候是单线程的，它无需进程/线程切换上下文的成本，非常高效，但它在执行具体任务的时候是多线程的。

<h3>权限问题</h3>

在Linux系统下，使用NodeJS监听80或443端口提供HTTP(S)服务时需要root权限，有两种方式可以做到。
<pre>
sudo node server.js
</pre>
<pre>
sudo chown root /usr/local/bin/node
sudo chmod +s /usr/local/bin/node
</pre>



<h3>基于事件驱动的回调</h3>
为了避免一些阻塞任务，一般要采用callback的方式来处理这些任务.

<h3>流程</h3>
<ul>
<li>server 接受完请求数据后，把任务转交给router</li>
<li>router根据不同的subpath，转交给具体的requestHandles</li>
<li>根据url，postData进行实际的任务处理</li>
</ul>

<h3>常用的模块</h3>
<ul>
<li>url,querystring模块，解析request对象</li>
<li>fs文件模块</li>
<li>process描述当前进程状态的对象，写脚本的时候会用到</li>
<li>util模块<li>
</ul>


<h3>Node.js EventEmitter</h3>
node.js所有的异步io操作在完成时都会发送一个事件到事件队列.这些产生事件的对象就是events.EventEmitter ,类似于我们的kvo
<h3>Buffer</h3>
该类用来创建一个专门存放二进制数据的缓存区.
<h3>Stream</h3>
文件流,获取文件流数据，或者写入文件数据
<h4>管道流</h4>
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
<pre>
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
</pre>
<h3>Node.js GET/POST请求</h3>
处理get请求的时候,通过url、util等模块来获取请求的信息.

<h3>《测试用例：mocha，should，istanbul》</h3>
利用require.main就可以判断, 本文件是作为脚本直接执行的, 还是作为包载入的.
<pre>
if(require.main === module)
  // loaded as script
}else{
  // loaded as module
}
</pre>
<h1>学习路线</h1>
<h3>js语法必须会</h3>

1. js基本语法，都是c语系的，有其他语言背景学习起来相对更简单
2. 常见用法，比如正则，比如数据结构，尤其是数组的几种用法。比如bind/call/apply等等
3. 面向对象写法。js是基于对象的，所以它的oo写起来非常诡异。参见红皮书JavaScript高级编程，很多框架都是自己实现oo基础框架，比如ext-core等。
犀牛书，《JavaScript权威指南》，没事就多翻翻，看少多少遍都不为过。

<h3>个人学习和技术选型都要循序渐进</h3>
先能写，然后再追求更好的写法，比如面向对象。等团队水平到一定程度了，并且稳定的时候，可以考虑更加极致的函数式写法。

<h3>安装Node.js环境</h3>
3m安装法
- nvm（node version manager）【需要使用npm安装，替代品是yrm（支持yarn）】
- nrm（node registry manager）【需要使用npm安装，替代品是yrm（支持yarn）】
- npm（node packages manager）【内置，替代品是n或nvs（对win也支持）】

<h3>常用软件</h3>

- 1）oh my zsh是我最习惯的shell，终端下非常好用
配合iterm2分屏 + spectacle全屏，几乎无敌
- 2）brew是mac装软件非常好的方式，和apt-get、rpm等都非常类似

安装4个必备软件

- brew install git 最流行的SCM源码版本控制软件
- brew install wget 下载、扒站神器
- brew install ack  搜索代码神器
- brew install autojump 终端下多目录跳转神器

- 3）vim

我虽然不算vim党，但也深爱着。janus是一个非常好用的vim集成开发环境。比如ctrl-p、nerdtree等插件都集成了，对我这种懒人足够了。

<h3>Node核心：异步流程控制</h3>
Node.js是为异步而生的，它自己把复杂的事儿做了（高并发，低延时），交给用户的只是有点难用的Callback写法。也正是坦诚的将异步回调暴露出来，才有更好的流程控制方面的演进。也正是这些演进，让Node.js从DIRT（数据敏感实时应用）扩展到更多的应用场景，今天的Node.js已经不只是能写后端的JavaScript，已经涵盖了所有涉及到开发的各个方面，而Node全栈更是热门种的热门。

直面问题才能有更好的解决方式，Node.js的异步是整个学习Node.js过程中重中之重。

- 1) 异步流程控制学习重点
- 2）Api写法：Error-first Callback 和 EventEmitter
- 3）中流砥柱：Promise 
- 4）终极解决方案：Async/Await

<h3>移动端转全栈</h3>
所以移动端转全栈的方法，最好是从 cordova（以前叫 phonegap）开始做 hybrid 开发。

只要关注 www 目录里的 H5 即可，比较简单
如果 H5 不足以完成的情况下，可以编写 cordova 插件，即通过插件让 js 调用原生 sdk 里功能
cordova 的 cli 可以通过 npm 安装，学习 npm 的好方法
学习 gulp 构建工具
只要入了 H5 的坑，其实就非常好办了。

然后 h5、zeptojs、iscroll、fastclick 等
然后微信常用的，如 weui、vux（vue+weui）、jmui（react+weui）
然后可以玩点框架，比如 jquery mobile，sencha touch
然后可以玩点高级货，ionicframework（基于 angularjs、cordova）
然后前端4阶段，依次打怪升级
然后 node
