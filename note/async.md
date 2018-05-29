https://www.cnblogs.com/kazetotori/p/6043983.html
http://www.ruanyifeng.com/blog/2015/05/async.html

promise:
Node.js最新技术栈之Promise篇 https://cnodejs.org/topic/560dbc826a1ed28204a1e7de
理解 Promise 的工作原理 https://cnodejs.org/topic/569c8226adf526da2aeb23fd
Promise 迷你书 http://liubin.github.io/promises-book/

promise的实现
https://www.cnblogs.com/dojo-lzz/p/4340897.html
https://www.jianshu.com/p/473cd754311f

<h3>异步三部曲</h3>
 
![异步三部曲](https://github.com/i5ting/How-to-learn-node-correctly/raw/master/media/14913280187332/Screen%20Shot%202017-04-05%20at%2008.43.08.png)

+ Error-first Callback
+ promise
+ async

<h3>概念</h3>
Promise是把异步处理对象和处理规则进行规范化，并按照采用统一的接口来编写，而采取规定方法之外的写法都会出错。Promise是抽象异步处理对象以及对其进行各种操作的组件。

<pre>
 + new
 + then
 + catch
 + resolve
 + reject
 + all
 + race
</pre>
<pre>
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
promise.then(onFulfilled, onRejected)
</pre>
<h3>promise states</h3>

![promise states](http://liubin.org/promises-book/Ch1_WhatsPromises/img/promise-states.png)<br>

> **promise对象的状态，从Pending转换为Fulfilled或Rejected之后， 这个promise对象的状态就不会再发生任何变化。也就是说，Promise与Event等不同，在.then 后执行的函数可以肯定地说只会被调用一次**。

> **同时不管你使用then监听了多少次promise，promise初始化的代码块只会被执行一次。当状态从pending->fulfilled的时候，通知所有then方法回调。这和rx的概念还是不一样的**。

<!--<h3>then</h3>

![状态流向1](http://liubin.org/promises-book/Ch2_HowToWrite/img/promise-then-catch-flow.png)-->

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
> 不要对异步回调函数进行同步调用 

<h3>promise错误的捕获</h3>
promise内部如果抛出了错误，外层必须要捕获。下面举一个例子来描述这件事情：
<pre>
function doubleUp(value){
    return value * 2
}
function increment(value){
    // return value + 1
    throw new Error('not support')   //1.
    // return Promise.reject(new Error('not support'))//2.
}
var promise = Promise.resolve(1)
promise
.then(increment)
.then(doubleUp)
.catch(e=>{
    console.error(e)
}).then(v=>{
    console.log(v)
})
</pre>
promise的链式写法，每一次调用方法都会生成一个新的promise，我们上面最后监听的promise实际上是catch error以后的promise。这个promise隐式的返回了undefined。所以上面代码会打印'undefined'.所以当我们在catch error的时候应该返回我们预期的值.这一点很重要.

另外让我们来修改下increment函数，模拟下下载某一个数据接口，返回把下载的数据解析为json.代码如下：
<pre>
function increment(value){
    //async work
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            //api net 
           JSON.parse('NOT JSON')
        },100)
    })
}
</pre>
使用的方法同上面一样，执行以后你会发现我们这里的catch是捕获不到这个`SyntaxError: Unexpected token N in JSON at position 0`错误的。Node.js里面是无法捕获异步异常的。你试想一下：
<pre>
try {
    //async work
    setTimeout(()=>{
       JSON.parse('NOT JSON')
    },100)
} catch (error) {
    
}
</pre>
安装node单线程的执行逻辑，当我们try catch的时候，实际上这时候错误还没发生，而真正发生是在100ms以后，这就能解释为什么上面的catch为什么不能捕获这个异常了.正确的写法应该如下：
<pre>
function increment(value){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            try {
                JSON.parse('NOT JSON')
            } catch (error) {
                resolve(20)
            }
        },100)
    })
}
</pre>

<h3>几种场景</h3>
+ 串行任务,task1.then(task2).then(task3)
+ 并行任务,完成以后回调,使用Promise.all([task1,task2,task3])
+ 为任务设置timeout,Promise.race([task1,timeoutpromise])

> Promise.all 所有的task是同时开始，异步执行的。当所有请求promise状态完成以后，进入到then回调，values的顺序与入参顺序一样。当有一个发生错误的时候，进入catch代码块，不会进入values

> 在 ES6 Promises 规范中，没有取消（中断）promise对象执行的概念，我们必须要确保promise最终进入resolve or reject状态之一。也就是说Promise并不适用于 状态 可能会变的处理

> `Promise.race` 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。


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

<h4>done</h4>
如果编码时忘记了处理该异常，一旦出现异常，那么查找异常发生的源头将会变得非常棘手，这就是使用promise需要注意的一面。虽然抛出了异常，但是没有对该异常进行处理.所以在有可能产生异常的promise后面加上catch吧.或者泳道我们的done.
<pre>
if (typeof Promise.prototype.done === 'undefined'){
    Promise.prototype.done = function(onFulfilled,onRejected){
        this.then(onFulfilled,onRejected).catch(function (err){
            setTimeout(function(){
                throw err
            },0)
        })
    }
}

var promise = Promise.resolve()
promise.done(()=>{
    JSON.parse('xxxx')
})
</pre>
> 这里我们用了catch方法来捕获之前的错误，然后通过异步把这个错误抛到外层去。因为node里面异步是不能捕获这个错误的.




<h3>thenable</h3>
 Thenable风格表现为位于回调和Promise风格中间的一种状态，作为类库的公开API有点不太成熟，所以并不常见。
恐怕最可能被使用的是在 Promise类库 之间进行相互转换了。

<h3>Deferred</h3>
简单来说，Deferred和Promise具有如下的关系。
+ Deferred 拥有 Promise
+ Deferred 具备对 Promise的状态进行操作的特权方法

![Deferred](http://liubin.org/promises-book/Ch4_AdvancedPromises/img/deferred-and-promise.png)

如果说Promise是用来对值进行抽象的话，Deferred则是对处理还没有结束的状态或操作进行抽象化的对象，我们也可以从这一层的区别来理解一下这两者之间的差异。换句话说，Promise代表了一个对象，这个对象的状态现在还不确定，但是未来一个时间点它的状态要么变为正常值（FulFilled），要么变为异常值（Rejected）；而Deferred对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候，可以通过Promise来取得处理结果。



