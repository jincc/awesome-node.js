var http = require('http')
var fs = require('fs')

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'image/png'})
    //设置一个读取流到写入流的管道
    fs.createReadStream('./image.png').pipe(res)
}).listen(3000)





var parent = ()=>{
    var name = "jincc"
    var age = 13

    var child = ()=>{
        var name = 'jun'
        var childAge = 19
        console.log(name,age,childAge)
    }
    child()
    console.log(name,age)
}

parent()


function foo(){
    value = 'hello'

    for (var i = 0; i < 10;i++){
        var inner = 'hello world'
    }
    console.log(i)
    console.log(inner)
}

foo()
console.log(value)
console.log(global.value)


for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 5);
}

var myObject = {value: 100};
myObject.getValue = function () {
  var foo = function () {
    console.log(this.value) // => undefined
    console.log(this == global);// 输出全局对象 global
  };

  foo();

  return this.value;
};

// console.log(myObject.getValue()); // => 100



class Foo {
    play(){
        console.log(this)
        function x(){
            //undefine
            console.log(this)
        }
        x()
    }
}

new Foo().play()


