https://www.cnblogs.com/kazetotori/p/6043983.html
http://www.ruanyifeng.com/blog/2015/05/async.html

promise:
Node.js最新技术栈之Promise篇 https://cnodejs.org/topic/560dbc826a1ed28204a1e7de
理解 Promise 的工作原理 https://cnodejs.org/topic/569c8226adf526da2aeb23fd
Promise 迷你书 http://liubin.github.io/promises-book/

promise的实现
https://www.cnblogs.com/dojo-lzz/p/4340897.html
https://www.jianshu.com/p/473cd754311f


<h3>概念</h3>
Promise是抽象异步处理对象以及对其进行各种操作的组件
<pre>
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
promise.then(onFulfilled, onRejected)
</pre>
<h3>promise states</h3>
![promise states](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-states.png)<br>
> promise对象的状态，从Pending转换为Fulfilled或Rejected之后， 这个promise对象的状态就不会再发生任何变化。也就是说，Promise与Event等不同，在.then 后执行的函数可以肯定地说只会被调用一次。另外，Fulfilled和Rejected这两个中的任一状态都可以表示为Settled(不变的)

<h3>then</h3>
![状态流向1](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-then-catch-flow.png)
![状态流向2](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-then-passing-value.png)

> 每次调用then都会返回一个新创建的promise对象

<h3>Promise.resolve</h3>
1. new Promise的快捷方式
2. 它能将Thenable对象(拥有的`then`方法应该和Promise所拥有的`then`方法具有同样的功能和处理过程)转换成Promise实例
<h3>Promise只能使用异步调用方式</h3>
为了避免同时使用同步、异步调用可能引起的混乱问题，Promise在规范上规定 Promise只能使用异步调用方式 。由于Promise保证了每次调用都是以异步方式进行的，所以我们在实际编码中不需要调用 setTimeout 来自己实现异步调用。


<pre>
var promise1 = new Promise((resolve,reject)=>{
    console.log('innner')
    resolve(20)
})

promise1.then(v=>{
    console.log(v)
})
console.log('outer')
</pre>
<pre>
innner
outer
20
</pre>

<h3>Promise.all .race</h3>
Promise.all 在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理
使用Promise.then同时处理多个异步请求的时候，为了简化main后面的then操作，引入了all
<pre>
var request = {
        comment: function getComment() {
            return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
        },
        people: function getPeople() {
            return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
        }
};
function main(){
    function recordValue(results,value){
        results.push(value)
        return results
    }
    //通过使用这种偏函数（Partial Function）的方式就可以减少匿名函数的使用。（如果在函数回调风格的代码能很好的做到函数分离的话，也能减少匿名函数的数量）
    var pushValue = recordValue.bind(null,[])
    return request.comment().then(pushValue).then(request.people).then(pushValue)
}
</pre>
改用all以后:
<pre>
Promise.all([request.comment(), request.people()]).then(values=>{
    //values
}).catch(error=>{
    //error
});
</pre>
这两个请求是同时开始，异步执行的。当所有请求promise状态完成以后，进入到then回调，values的顺序与入参顺序一样。当有一个发生错误的时候，进入catch代码块，不会进入values

<h4>race</h4>
与之相对的是 Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。<br>
`Promise.race` 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。
> 在 ES6 Promises 规范中，也没有取消（中断）promise对象执行的概念，我们必须要确保promise最终进入resolve or reject状态之一。也就是说Promise并不适用于 状态 可能会固定不变的处理。

<h3>then or catch?</h3>
<pre>
function throwError(value) {
    // 抛出异常
    throw new Error(value);
}
// <1> onRejected不会被调用
function badMain(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected);
}
// <2> 有异常发生时onRejected会被调用
function goodMain(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected);
}
// 运行示例
badMain(function(){
    console.log("BAD");
});
goodMain(function(){
    console.log("GOOD");
});
</pre>
> .then 方法中的onRejected参数所指定的回调函数，实际上针对的是其promise对象或者之前的promise对象，而不是针对 .then 方法里面指定的第一个参数，即onFulfilled所指向的对象，这也是 then 和 catch 表现不同的原因
>> 错误捕获请使用`catch`