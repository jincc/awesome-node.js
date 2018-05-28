https://www.cnblogs.com/kazetotori/p/6043983.html
http://www.ruanyifeng.com/blog/2015/05/async.html

promise:
Node.js最新技术栈之Promise篇 https://cnodejs.org/topic/560dbc826a1ed28204a1e7de
理解 Promise 的工作原理 https://cnodejs.org/topic/569c8226adf526da2aeb23fd
Promise 迷你书 http://liubin.github.io/promises-book/

<h3>概念</h3>
Promise是抽象异步处理对象以及对其进行各种操作的组件
<pre>
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
promise.then(onFulfilled, onRejected)
</pre>
![promise states](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-states.png)