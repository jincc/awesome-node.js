<h3>语句后面加上分号，提高性能</h3>
加上这个分号可以避免 很多错误(例如不完整的输入)，开发人员也可以放心地通过删除多余的空格来压缩 ECMAScript 代码(代 码行结尾处没有分号会导致压缩错误)。另外，加上分号也会在某些情况下增进代码的性能，因为这样 解析器就不必再花时间推测应该在哪里插入分号了。
<h3>变量</h3>
用var操作符定义的变量将成为定义该变量的作用域中的局部变量.<br>
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
因为JS是松散类型的，所以引入了`typeof`,typeof的返回值有以下几种:<br>
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
alert(typeof message);// "undefined"
alert(typeof age);// "undefined"
</pre>

> 对未初始化和未申明的变量执行typeof都会返回'undefined'

> 如果定义的变量在将来会被用来保存对象，那么最好将该对象初始化为null而不是其他值.

> undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true:
<pre>
alert(null == undefined) //true
</pre>

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
js里面的有效数值在`Number.MIN_VALUE`到`Number.MAX_VALUE`之间，如果超出后，将会自动转换成特殊的 `（+-）Infinity`.要想确定一个数值是不是有穷的(换句话说，是不是位于最小和最大的数值之间)，可以使用 isFinite()函数
<h4>NaN</h4>
这个数值表示一个本来要返回数值的操作未返回数值的情况.比如说任何数除以0就会返回NaN.NaN有两个不同寻常的特点。<br>
+ 任何涉及到NaN的操作都会返回NaN
+ NaN与任何值都不相等，包括NaN本身.

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
有这三个方法:Number()、parseInt()和 parseFloat()。第一个函数， 即转型函数 Number()可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值.
<pre>
var num1 = Number("Hello world!");//NaN
var num2 = Number(""); //0
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
<h4>String()与toString()</h4>
确认对象不是undefined或者null之后，才能调用toString()方法.但是String()可以将任意类型进行转换.
> 另外,要把某个值转换为字符串，可以使用加号操作符把它与一个字符 串("")加在一起

<h3>操作符</h3>
一元加操作符以一个(+)表示，对数字不会产生任何影响.不过对非数值应用的话，会像和Number（）🏥，将对象转换为numebr类型。
<pre>
var num = 25;
num = +num; //任然是25
var s3 = '1.1'
s3 = +s3 //1.1
</pre><br>

+ 按位非(NOT) ~操作数负值-1
+ 按位与(AND) &按位与操作只在两个数值的对应位都是 1 时才返回 1，任何一位是 0，结果都是 0
+ 按位或(OR)  |和and相反
+ 按位异或(XOR) ^这个操作在两个数值对应位上只有一个 1 时才返回 1，如果对 应的两位都是 1 或都是 0，则返回 0。
+ 左移<<  左移xx位，其余补零
+ &&
+ || 

<pre>
var num1 = 25;
var num2 = ~num1;  //-26

var result = 25 & 3 ; //1
var result = 25 | 3; //27
var result = 25 ^ 3; //26

var myObject = preferredObject || backupObject;//变量 preferredObject 中包 含优先赋给变量 myObject 的值，变量 backupObject 负责在 preferredObject 中不包含有效值的情况下提供后备值

</pre>

<h4>==与===</h4>
==操作符表示相等,它会将等号两边的对象转换后(比如说toString(),valueOf())在比较.<br>
===不会经过转换，直接比较
<pre>
'55' == 55 ;//true
'55' === 55;//false,类型不一样
</pre>
<h3>函数</h3>
js不介意传递进来多少个参数，也不在乎参数的数据类型.也就是说，即便你定义的函数只接收两个参数， 在调用这个函数时也未必一定要传递两个参数。可以传递一个、三个甚至不传递参数，而解析器永远不 会有什么怨言。之所以会这样，原因是 ECMAScript 中的参数在内部是用一个数组来表示的.`arguments`
<pre>
function play(){
    console.log(`hi,${arguments[0]},your age is ${arguments[1]}`)
}
play('jincc')
</pre>
<pre>
function doAdd(num1, num2) {
    arguments[1] = 10;
    alert(arguments[0] + num2);
}
</pre>
每次执行这个 doAdd()函数都会重写第二个参数，将第二个参数的值修改为 10。因为 arguments 对象中的值会自动反映到对应的命名参数，所以修改 arguments[1]，也就修改了 num2，结果它们的 值都会变成 10。不过，这并不是说读取这两个值会访问相同的内存空间;它们的内存空间是独立的，但 它们的值会同步。另外还要记住，如果只传入了一个参数，那么为 arguments[1]设置的值不会反应到 命名参数中。这是因为 arguments 对象的长度是由传入的参数个数决定的，不是由定义函数时的命名 参数的个数决定的。<br>
> ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。

<h3>变量的类型：值类型和引用类型</h3>

+ 只有引用类型能够新增属性，方法
+ 所有函数的参数都是按值传递的.包括值类型

<h3>Array</h3>
ECMAScript 数组的每一项可以保存任何类型的数据。也 就是说，可以用数组的第一个位置来保存字符串，用第二位置来保存数值，用第三个位置来保存对象.<br>
length属性是可读写的，通过设置这个属性可以从数组的末尾移除或想数组中添加新项.<br>
<pre>
var array = []
array[0] = '1'
array[1] = 2
array[2] = {}
console.log(array)//[ '1', 2, {} ]
array.length = 1
console.log(array)//[ '1' ]
array.length = 10
console.log(array)//[ '1', <9 empty items> ]
</pre>
常用api:<br>
<pre>
//是否是数组
if (value instanceof Array){
}
//判断是否是数组
if (Array.isArray(value)){ //对数组执行某些操作
}
array.toString()//返回数组中每个字符串拼接起来的数组.
array.join(',')
//栈操作
array.push(1,2,3)
array.pop()
//队列操作
var item = array.shift()//弹出第一项，并返回
array.unshift(1,2,3)//从前面插入两项
//重排序
array.reverse()//翻转数组
array.sort(fn?)//默认安装字符串排序,fn是可选代码
array.concat(1,[1,1])//先创建当前数组的拷贝，然后拼接
array.slice(from,to)//返回一个新数组[from...to],不会影响原始数组
//在数组中部修改
/**
    * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    * @param start The zero-based location in the array from which to start removing elements.
    * @param deleteCount The number of elements to remove.
    * @param items Elements to insert into the array in place of the deleted elements.
    */
splice(start: number, deleteCount: number, ...items: T[]): T[];
//位置方法
array.indexOf(obj,fromIndex?)
array.lastIndexOf(obj,fromIndex?)
//迭代方法
 every():对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。  filter():对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
 forEach():对数组中的每一项运行给定函数。这个方法没有返回值。
 map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
 some():对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
//归并方法
reduce()
reduceRight()
</pre>

<h3>Date类型</h3>
<pre>
//获取该日期的毫秒数
Date.parse("May 25, 2004")
Date.UTC(2005, 4, 5, 17, 55, 55)//日期和时间都是基于本地失去而非GMT来创建的
var someDate = new Date(Date.parse("May 25, 2004"));
var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55)); 
//简写
var someDate = new Date("May 25, 2004");
var allFives = new Date(2005, 4, 5, 17, 55, 55);
//取得当前时间毫秒
var start = Date.now();
//日期的比较
date1 < date2
//符号化
 toDateString()——以特定于实现的格式显示星期几、月、日和年;
 toTimeString()——以特定于实现的格式显示时、分、秒和时区; 10  toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年;
 toLocaleTimeString()——以特定于实现的格式显示时、分、秒;
 toUTCString()——以特定于实现的格式完整的 UTC 日期。
</pre>

> ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。

<h3>垃圾收集</h3>
在编写 JavaScript 程序时，开发人员不用再关心内存使用问题，所需内存的分配以及无 用内存的回收完全实现了自动管理。这种垃圾收集机制的原理其实很简单:找出那些不再继续使用的变 量，然后释放其占用的内存。为此，垃圾收集器会按照固定的时间间隔(或代码执行中预定的收集时间)， 周期性地执行这一操作。

+ 标记清除（进入环境标记使用，离开环境标记未使用）,大部分浏览器都是采用这方式
+ 引用计数

> JavaScript 在进行内存管理及垃圾收集时面临的问题还是有点与众不同。其中最主要的一个问题，就是分配给 Web 浏览器的可用内存数量通常要比分配给桌面应用程序的少。这样做的目的主要是出于安全方面的考虑， 目的是防止运行 JavaScript 的网页耗尽全部系统内存而导致系统崩溃。内存限制问题不仅会影响给变量 分配内存，同时还会影响调用栈以及在一个线程中能够同时执行的语句数量


> 所以，管理全局变量最好的方式就是一旦数据不再有用，最好通过将其值设置为 null 来释放其引用


<h3>Function类型</h3>
函数实际上是对象，每个函数都是Function类的实例.而且都与其他引用类型一样具有属性和方法。<s>函数名实际上就是指向函数实例的指针，这也就很好理解为什么js里面没有函数重载了</s>
<pre>
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); //300
</pre>
这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面的函数。以上代码实际 上与下面的代码没有什么区别:
<pre>
var addSomeNumber = function (num){
    return num + 100;
};
addSomeNumber = function (num) { 
      return num + 200;
};
</pre>

> 两种写法的区别：第一种写法，会存在函数声明提升的过程，js引擎会把函数声明提升到顶部.
<h4>函数内部属性</h4>

+ arguments，类数组对象，保存传入函数的所有参数.这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。
+ this 引用的是函数据以执行的环境对象
+ caller 保存了调用当前函数的函数的引用
+ length 参数个数
+ prototype
+ apply()
+ call()
+ bind()返回一个绑定了新作用域的新函数
<pre>
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor();     //"red"
o.sayColor = sayColor;
o.sayColor();   //"blue"
sayColor.bind(o)()//'blue'
function outter(){
    inner()
}
function inner(){
    console.log(arguments.callee.caller)//[Function: outter]
}
outter()

sayColor.length()//0
//传递参数并非 apply()和 call()真正的用武之地;它们真正强大的地方是能够扩充函数 赖以运行的作用域
sayColor();
sayColor.call(this);
sayColor.call(window);
sayColor.call(o);
//red
//red
//red
//blue
</pre>

> 函数的名字仅仅是一个包含指针的变量而已。因此，即使是 在不同的环境中执行，全局的 sayColor()函数与 o.sayColor()指向的仍然是同一 个函数。

> 使用call和apply来扩充作用于的最大好处，就是对象不需要和方法有任何耦合关系。在前面的第一个列子中，我们现实将sayColor函数放在了o对象上然后调用它。而在这里重写的例子中，就不需要先前那个多余的步骤了。

<h2>面向对象的程序设计</h2>
<h3>对象属性的类型</h3>
ECMAScript 中有两种属性:数据属性和访问器属性。
<h4>数据属性</h4>
数据属性包含一个数据值的位置，在这个位置上可以读取和写入。数据属性有4个描述其行为的特性.<br>
+ configurable 表示能否通过 delete 删除属性从而重新定义属性。默认true
+ enumerable 表示能否通过 for-in 循环返回属性 .默认true
+ writable 表示能否修改属性的值 。默认true
+ value 包含这个属性的数据值.默认undefined


要想修改属性默认的特性，必须通过ES5的Object.defineProperty()方法.<br>
<pre>
var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
alert(person.name); //"Nicholas"
person.name = "Greg"; 
alert(person.name); //"Nicholas"
</pre>

> 这个属性的值是不可修改 的，如果尝试为它指定新值，则在非严格模式下，赋值操作将被忽略;在严格模式下，赋值操作将会导 致抛出错误。
<h3>访问器属性</h3>
访问器属性不包含数据值,他们包含了一对getter和setter函数.访问器有如下4个特性:
+ configurable 表示能否通过 delete 删除属性从而重新定义属性。默认true
+ enumerable 表示能否通过 for-in 循环返回属性 .默认true
+ get 
+ set 
访问器属性的常见场景是设置一个属性的值会导致其他属性值得变化.如下:<br>
<pre>
var book = {
    _year : 2004,
    edition:1
}
Object.defineProperty(book,'year',{
    get:function(){
        return this._year
    },
    set:function(newvalue){
        if(newvalue>2004){
            this._year = newvalue
            this.edition+=newvalue -2004
        }
    }
})
book.year = 2005
console.log(book)
</pre>

> 不一定同步指定set和get.set不存在时表面不可写.get不存在表示不可读.
> Object.defineProperties()和它类似.

<h4>读取属性的特性</h4>
使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述 符。
<pre>
var namep = Object.getOwnPropertyDescriptor(person,'name')
console.log(namep)
//log
{ value: 'jincc',
  writable: false,
  enumerable: false,
  configurable: false }
</pre>

<h3>关于this对象</h3>
this对象在运行时基于函数的执行环节绑定的：在全局函数中，this等于window/global,而当函数作为某个对象的方法时，this等于那个对象.不过，匿名函数的执行环节具有全局性，因此其this对象通常指向window.但有时候由于编写闭包的方式不同，这一点可能不会太明显.
<pre>
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        //A:
        //对象内的方法，this指向对象
        return function(){
            //每个函数在诶调用后都会自动生成this和arguments.搜索这两个对象时，只会搜索到其活动对象(当前作用域已不属于object)为止，因此永远不会直接访问外部函数的这两个变量(object).在this指向global
            return this.name;
        };
        //修改方法
        var that = this;//现在that指向了object
        return function(){}
            return that.name;
        };
} };
alert(object.getNameFunc()()); //"The Window"
</pre>
<h3>块级作用域</h3>
<pre>
function outputNumbers(count){
    (function () {
        for (var i=0; i < count; i++){
            alert(i);
}
})();
}
 
</pre>