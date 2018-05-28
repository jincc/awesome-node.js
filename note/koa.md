
<a href="http://www.ruanyifeng.com/blog/2017/08/koa.html">Koa框架</a>

<a href="https://koa.bootcss.com/">Koa doc</a>

<h3>Context 对象</h3>
Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。ctx.response代表 HTTP Response。同样地，ctx.request代表 HTTP Request

<h3>HTTP Response 的类型</h3>
koa默认的返回类型是text/plain,如果想返回其他类型的内容，可以先用ctx.request.accepts判断一下，客户端希望接受什么数据（根据 HTTP Request 的Accept字段），然后使用ctx.response.type指定返回类型<br><br>
<a href='./node-lessons/koa/demo.ts'>demo使用</a>
<pre>
类型格式：
type/subtype(;parameter)? type  
主类型，任意的字符串，如text，如果是*号代表所有；   
subtype 子类型，任意的字符串，如html，如果是*号代表所有；   
parameter 可选，一些参数，如Accept请求头的q参数， Content-Type的 charset参数。  
常见的媒体格式类型如下：
text/html ： HTML格式
text/plain ：纯文本格式      
text/xml ：  XML格式
image/gif ：gif图片格式    
image/jpeg ：jpg图片格式 
image/png：png图片格式
以application开头的媒体格式类型：
application/xhtml+xml ：XHTML格式
application/xml     ： XML数据格式
application/atom+xml  ：Atom XML聚合格式    
application/json    ： JSON数据格式
application/pdf       ：pdf格式  
application/msword  ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
</pre>
<h3>网页模板</h3>
//实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户
const ExamplesPSD = ctx =>{
    let x = fs.createReadStream('../../..//views/express.html');
    ctx.response.type = 'html';
    ctx.response.body = x;
}
<h3>重定向</h3>
// demos/13.js
const redirect = ctx => {
  ctx.response.redirect('/');
  ctx.response.body = '<a href="/">Index Page</a>';
};

app.use(route.get('/redirect', redirect));

<h3>koa中的异步加载数据</h3>
看lesson3里面的例子,需要返回一个promise对象.

<h3>用户权限koa-basic-auth</h3>
用<strong>koa-basic-auth</strong>如果user，pass输入错误，抛出401，设置header头:`ctx.set('WWW-Authenticate', 'Basic');`弹出验证框,否则进入下一个中间件.<br>看<a href='https://github.com/koajs/examples/blob/master/base-auth/app.js'>demo</a>

<h3>koa-route</h3>
<a href='https://www.npmjs.com/package/koa-route'>koa-route</a>
<a href='https://github.com/alexmingoia/koa-router'>koa-router</a>
<h3>koa-static</h3>
如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。koa-static模块封装了这部分的请求。请看下面的例子（完整代码看这里）。

<h3>可选中间件</h3>
https://github.com/koajs/examples/tree/master/conditional-middleware


<h3>看到了哪里</h3>
koa-examples:
