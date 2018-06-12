'use strict';
var message = '2'
if(message){
    console.log(message)
}else{
    console.log('bu')
}
// console.log(07+0xA)
var floatnum = 1.0
var floatnum2 = 1.1
console.log(floatnum,floatnum2)

if (0.1 + 0.2 == 0.3){
    console.log('0.1+0.2=0.3')
}else{
    console.log(0.1+0.2)//0.30000000000000004
}

console.log(isFinite(Number.MAX_VALUE+Number.MAX_VALUE))
console.log(Number.MAX_VALUE)
var num = 10
num.toString(2)

var value4 = 'x'
console.log(String(value4))
console.log(value4.toString())
console.log(typeof (null + ''))

var obj1 = new Object()
obj1.name = 'jincc'
var obj2 = new Object
console.log(obj1.hasOwnProperty('name'))

var bm = '123'
bm++
console.log(bm)
var kom = false
kom = -kom
console.log(kom)


{
    var num1 = 25
    var num2 = ~num1 //-26
    console.log(num2)
}

var object = {}
object.name = 'kimc'
for (const key in object) {
    if (object.hasOwnProperty(key)) {
        const element = object[key];
        console.log(element)
    }
}

function play(){
    console.log(`hi,${arguments[0]},your age is ${arguments[1]}`)
}
play('jincc')
function exchange(a){
    arguments[0] = 80
    console.log(a)
    a = 50
}

var a = 90
exchange()
console.log(a)

var a = {}
a.name = 'c'
var b = a 
a.name = 'd'
console.log(b)

function setName(obj) {
     obj.name = "Nicholas"; 
     obj = new Object();
    obj.name = "Greg";
}

var obj3 = new Object
setName(obj3)
console.log(obj3)