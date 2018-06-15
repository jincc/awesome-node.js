

var uri = "http://www.wrox.com/illegal value.htm#start";
console.log(encodeURI(uri))//不会对本身属于URI的特殊字符进行编码
console.log(encodeURIComponent(uri))//会使用对应的编码替换所有非字母数字字符