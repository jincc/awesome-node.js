<h3>语句后面加上分号，提高性能</h3>
加上这个分号可以避免 很多错误(例如不完整的输入)，开发人员也可以放心地通过删除多余的空格来压缩 ECMAScript 代码(代 码行结尾处没有分号会导致压缩错误)。另外，加上分号也会在某些情况下增进代码的性能，因为这样 解析器就不必再花时间推测应该在哪里插入分号了。
<h3>变量</h3>
用var操作符定义的变量将成为定义该变量的作用域中的局部变量.
+ 在函数中定义的变量，除了函数作用于就会销毁
+ 在全局中定义的变量，作用域为全局
+ 省略 var 操作符，会一个全局变量
<pre>
function test(){
    message = 'hi'
}
//执行test()之后，message就会被定义了.
test()
console.log(message)
</pre>

> 'use strict'严格模式下，未经声明的变量赋值会导致抛出 ReferenceError 错误。

<h3>数据类型</h3>
undefined ,null,Boolean,Number,String,Object<br>
因为JS是松散类型的，所以引入了`typeof`,typeof的返回值有以下几种:
+ 'undefined'
+ 'boolean'
+ 'string'
+ 'number'
+ 'object'
+ 'function'

> `typeof null`会返回'object', 被认为是一个空的对象引用

<pre>
var message; // 这个变量声明之后默认取得了 undefined 值 // 下面这个变量并没有声明
 // var age
alert(typeof message);
alert(typeof age);
// "undefined"
// "undefined"
</pre>

> 对未初始化和未申明的变量执行typeof都会返回'undefined'
> 如果定义的变量在将来会被用来保存对象，那么最好将该对象初始化为null而不是其他值.
> undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true:
<pre>
alert(null == undefined) //true
</pre>