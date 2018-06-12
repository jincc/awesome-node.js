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

<h3>条件语句流程控制</h3>
任意对象调用Boolean()函数，都会返回一个Boolean值。这些转换规则对理解流控制语句(如if语句)自动执行相应的Boolean转换非常重要，请看下面 的代码:
<pre>
var message = "Hello world!";
if (message){
    alert("Value is true");
}
</pre>

> 这里会自动执行Boolean转换

<h3>Number类型</h3>
浮点数：由于保存浮点数值需要的内存空间是保存整数的两倍，因此js会不失时机的将浮点数转换为整数.如下：
<pre>
var floatNum1 = 1.; // 小数点后面没有数字——解析为 1
var floatNum2 = 10.0; // 整数——解析为 10
</pre>
<h3>浮点数计算的精度问题</h3>
这是使用基于 IEEE754 数值的浮点计算的通病,因此不要测试某个特定的浮点数值
<pre>
if (0.1 + 0.2 == 0.3){
    console.log('0.1+0.2=0.3')
}else{
    console.log(0.1+0.2)//0.30000000000000004
}
</pre>
js里面的有效数值在`Number.MIN_VALUE`到`Number.MAX_VALUE`直接，如果超出后，将会自动转换成特殊的 `（+-）Infinity`.要想确定一个数值是不是有穷的(换句话说，是不是位于最小和最大的数值之间)，可以使用 isFinite()函数
<h4>NaN</h4>
这个数值表示一个本来要返回数值的操作未返回数值的情况.比如说任何数除以0就会返回NaN.NaN有两个不同寻常的特点。
+ 任何涉及到NAN的操作都会返回NaN
+ NaN与任何值都不相对，包括NaN本身.

用`isNaA()`函数可以判断这个参数是不是数值.
<pre>
    alert(isNaN(NaN)); //t
    alert(isNaN(10)); //f
    alert(isNaN("10")); //f
    alert(isNaN("blue")); //t
    alert(isNaN(true)); //f
</pre>

> 尽管有点儿不可思议，但 isNaN()确实也适用于对象。在基于对象调用 isNaN() 函数时，会首先调用对象的 valueOf()方法，然后确定该方法返回的值是否可以转 换为数值。如果不能，则基于这个返回值再调用 toString()方法，再测试返回值。

<h4>数值的转换</h4>
Number()、parseInt()和 parseFloat()。第一个函数， 即转型函数 Number()可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值.
<pre>
var num1 = Number("Hello world!");//NaN
var num2  = Number(""); //0
var num3 = Number("000011"); //11
var num4 = Number(true); //1

//更常用的parseInt（）
var num1 = parseInt("1234blue");//1234
var num2 = parseInt("");//NaN
var num3 = parseInt("0xA");//10
var num4 = parseInt(22.5);//22
var num5 = parseInt("070");//56
var num6 = parseInt("70");//70
var num7 = parseInt("0xf");//15
//后面可以指定解析类型.
var num1 = parseInt("AF", 16); //175
</pre>

<h3>字符串</h3>
ECMAScript 中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变 某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量， 例如:
<pre>
    var lang = "Java";
    lang = lang + "Script";
</pre>