//https://www.jb51.net/article/88838.htm
var alert = console.log
var str = '12345678'
var re = /\D/
if (re.test(str)){
    console.log('不全是数字')
}else{
    console.log('全是数字')
}
//search会返回符合的下标
str = 'abcdefg'
re = /B/i
console.log('abcdefg contain b:' + str.search(re))

//match返回所有符合的项
//例子：找出指定格式的所有数字，如下找到 123，54，33，879
str = 'haj123sdk78dk90'
re = /\d+/g //每次匹配至少一个数字  且全局匹配  如果不是全局匹配，当找到数字123，它就会停止了。就只会弹出123.加上全局匹配，就会从开始到结束一直去搜索符合规则的。如果没有加号，匹配的结果就是1，2，3，5，4，3，3，8，7，9并不是我们想要的，有了加号，每次匹配的数字就是至少一个了。
console.log(str.match(re))

//敏感词过滤replace
str = '我爱北京天安门，天安门上太阳升'
re  = /北京|天安门/g  //|表示或或者
str = str.replace(re,str=>{
    var result = ""
    for (let i = 0; i< str.length;i++){
        result += '*'
    }
    return result
})
console.log(str)

//正则中的字符
//()：小括号，叫做分组符
var str = '2013-6-7'
var re1 = /\d-+/g //全局匹配数字，横杆至少为1
console.log(str.match(re1))
var re2 = /(\d-)+/g//全局匹配数字，(数字和横杆)至少为1
console.log(str.match(re2))
var re3 = /(\d+)-/g
console.log(str.match(re3))

//同时，正则中的每一个带小括号的项，都叫做这个正则的子项。子项在某些时候非常的有用，比如我们来看一个栗子。
//例子：让2013-6-7 变成 2013.6.7
var str = '2013-6-7'
var re = /-/g
var re2 = /(\d+)(-)/g
// str = str.replace(re,'.')
str = str.replace(re2,($0,$1,$2)=>{
    //*****分组是非常有用的，使用()分组以后，正确的匹配除了$1和$2 */
        //第一个参数：$0（匹配成功后的整体结果  2013-  6-）,
         // 第二个参数 : $1(匹配成功的第一个分组，这里指的是\d   2013, 6)
        //第三个参数 : $1(匹配成功的第二个分组，这里指的是-    - - )   
    console.log($0,$1,$2)
    return $1 + '.'
})
console.log(str)

console.log('exec方法')
var testStr = "now test001 test002";   
var re = /test(\d+)/g; //只匹配一次     
var r = "";   
var r = re.exec(testStr)
alert(r);// test001  001 返回匹配结果，以及子项
alert(r.length); //2   返回内容的长度
alert(r.input); //now test001 test002    代表每次匹配成功的字符串 
alert(r[0]);   //test001   
alert(r[1]);  //001    代表每次匹配成功字符串中的第一个子项 (\d+) 
alert(r.index );   //  4   每次匹配成功的字符串中的第一个字符的位置

//全局匹配：如果是全局匹配，可以通过while循环 找到每次匹配到的字符串，以及子项。每次匹配都接着上次的位置开始匹配
while(r = re.exec(testStr)){
alert(r);// test001  001 返回匹配结果，以及子项
alert(r.length); //2   返回内容的长度
alert(r.input); //now test001 test002    代表每次匹配成功的字符串 
alert(r[0]);   //test001   
alert(r[1]);  //001    代表每次匹配成功字符串中的第一个子项 (\d+) 
alert(r.index);   //  4   每次匹配成功的字符串中的第一个字符的位置
}

//[] ： 表示某个集合中的任意一个，比如 [abc] 整体代表一个字符 匹配 a b c 中的任意一个，也可以是范围，[0-9] 范围必须从小到大 。
//[^a] 整体代表一个字符   ：^写在[]里面的话，就代表排除的意思
var str =  "<div class =b>hahaha</div>"
var re = /<[^>]+>/g
console.log(str.match(re).join(''))

//\b表示独立的部分,\B表示非独立的部分
var str = 'onetwo'
var str2 = 'one two'
var re = /one\b/
alert(re.test(str))
alert(re.test(str2))

//\a表示重复的某个子项 ,比如：
//\1 重复的第一个子项
//\2 重复的第二个子项
var str = 'asssssssjdsskkmooobbbaa78'
str = str.split('').sort().join('')
var re = /(\w)\1+/g

console.log(str.match(re))
