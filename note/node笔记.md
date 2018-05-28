<h3>包(package)</h3>
我们已经知道了JS模块的基本单位是单个JS文件，但复杂些的模块往往由多个子模块组成。为了便于管理和使用，我们可以把由多个子模块组成的大模块称做包，并把所有子模块放在同一个目录里。然后把index.js作为包的主入口.比如下面两句是等价的：
<pre>
var cat = require('express');
var cat = require('express/index');
</pre>
如果我们想自定义入口文件,需要修改package.json文件。
<pre>
{
    "name": "cat",
    "main": "./lib/main.js"
}
</pre>

<h3>命令行程序</h3>

例如我们用NodeJS写了个程序，可以把命令行参数原样打印出来。该程序很简单，在主模块内实现了所有功能。并且写好后，我们把该程序部署在/home/user/bin/node-echo.js这个位置。为了在任何目录下都能运行该程序，我们需要使用以下终端命令。

$ node /home/user/bin/node-echo.js Hello World
Hello World
这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。

$ node-echo Hello World

在Linux系统下，我们可以把JS文件当作shell脚本来运行，从而达到上述目的，具体步骤如下：

在shell脚本中，可以通过#!注释来指定当前脚本使用的解析器。所以我们首先在node-echo.js文件顶部增加以下一行注释，表明当前脚本使用NodeJS解析。

 #! /usr/bin/env node
NodeJS会忽略掉位于JS模块首行的#!注释，不必担心这行注释是非法语句。

然后，我们使用以下命令赋予node-echo.js文件执行权限。

 $ chmod +x /home/user/bin/node-echo.js
最后，我们在PATH环境变量中指定的某个目录下，例如在/usr/local/bin下边创建一个软链文件，文件名与我们希望使用的终端命令同名，命令如下：

 $ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
这样处理后，我们就可以在任何目录下使用node-echo命令了。

<h3>工程目录</h3>
以编写一个命令行程序为例，一般我们会同时提供命令行模式和API模式两种使用方式，并且我们会借助三方包来编写代码。除了代码外，一个完整的程序也应该有自己的文档和测试用例。因此，一个标准的工程目录都看起来像下边这样。
<pre>
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
</pre>

<h3>npm</h3>
常用命令
<pre>
npm install argv
npm install argv@0.0.1
//安装命令行
$ npm install node-echo -g  (-g表示全局安装)
</pre>
<h4>发布代码</h4>
第一次使用NPM发布代码前需要注册一个账号。终端下运行npm adduser，之后按照提示做即可。账号搞定后，接着我们需要编辑package.json文件，加入NPM必需的字段。之后，我们就可以在package.json所在目录下运行npm publish发布代码了。

NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。

+ 使用npm help <command>可查看某条命令的详细帮助，例如npm help install。

+ 在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。

+ 使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。

+ 使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。

+ 使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

+ 使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。

<h3>HTTP</h3>
http请求本质是上一个数据流，由请求头和请求体组成.除了可以使用request对象访问请求头数据外，还能把request对象当作一个只读数据流来访问请求体数据.
<a href='./study/node_demo/http.ts'>看demo</a>
HTTP响应本质上也是一个数据流，同样由响应头（headers）和响应体（body）组成
<pre>
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: */*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World
</pre>

<h3>https</h3>
NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名提供服务。接着上例，可以使用以下方法为HTTPS服务器添加多组证书。
<pre>
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
</pre>

使用NodeJS操作网络，特别是操作HTTP请求和响应时会遇到一些惊喜，这里对一些常见问题做解答。

+ 问： 为什么通过headers对象访问到的HTTP请求头或响应头字段不是驼峰的？

    答： 从规范上讲，HTTP请求头和响应头字段都应该是驼峰的。但现实是残酷的，不是每个HTTP服务端或客户端程序都严格遵循规范，所以NodeJS在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以便开发者能使用统一的方式来访问头字段，例如headers['content-length']。

+ 问： 为什么http模块创建的HTTP服务器返回的响应是chunked传输方式的？

    答： 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，并使用.end方法结束一个响应。由于响应体数据长度不确定，因此NodeJS自动在响应头里添加了Transfer-Encoding: chunked字段，并采用chunked传输方式。但是当响应体数据长度确定时，可使用.writeHead方法在响应头里加上Content-Length字段，这样做之后NodeJS就不会自动添加Transfer-Encoding字段和使用chunked传输方式。

+ 问： 为什么使用http模块发起HTTP客户端请求时，有时候会发生socket hang up错误？

    答： 发起客户端HTTP请求前需要先创建一个客户端。http模块提供了一个全局客户端http.globalAgent，可以让我们使用.request或.get方法时不用手动创建客户端。但是全局客户端默认只允许5个并发Socket连接，当某一个时刻HTTP客户端请求创建过多，超过这个数字时，就会发生socket hang up错误。解决方法也很简单，通过http.globalAgent.maxSockets属性把这个数字改大些即可。另外，https模块遇到这个问题时也一样通过https.globalAgent.maxSockets属性来处理。

<h3>URL</h3>
<pre>

                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query

</pre>

+ .parse(),将一个URL字符串转换为URL对象
+ .format(),方法允许将一个URL对象转换为URL字符串
+ .resolve方法可以用于拼接URL

<h3>异步编程</h3>
JS本身是单线程的，无法异步执行。因此我们可以认为setTimeOut这类JS规范之外的由运行环境提供的特殊函数做的事情就是创建一个平行线程后立即返回，让js主线程可以执行后续的代码，并在收到平行线程的通知后执行回调函数。这类函数包括了诸如readFile之类的异步API。

另外，我们仍然回到JS是单线程运行的这个事实上，这决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。以下就是这么一个例子。
<pre>
function heavyCompute(n) {
    var count = 0,
        i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            count += 1;
        }
    }
}
var t = new Date();
setTimeout(function () {
    console.log(new Date() - t);
}, 1000);
heavyCompute(50000);
-- Console ------------------------------
8520
</pre>

<h3>异步串行</h3>
<pre>
(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // All array items have processed.
}));
</pre>

异步并行
<pre>
(function (i, len, count, callback) {
    for (; i < len; ++i) {
        (function (i) {
            async(arr[i], function (value) {
                arr[i] = value;
                if (++count === len) {
                    callback();
                }
            });
        }(i));
    }
}(0, arr.length, 0, function () {
    // All array items have processed.
}));
</pre>
<h3>Domain域</h3>
<a href='http://nqdeng.github.io/7-days-nodejs/#6.3'>Domain域</a>

一个域就是一个JS运行环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出


<h3>需要看的模块</h3>
 + Buffer,stream
 + fs
 + path
 + http，https
 + url,解析URL、生成URL，以及拼接URL
 + querystring
 + zlib 数据压缩和解压的功能
 + net 创建socket服务器或客户端.
 + process进程

看到了这里:API走马观花



