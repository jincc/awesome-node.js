var util = require('util')
const EventEmitter = require('events')
async function fn() {
    // return 'hello world' /
    // return Promise.reject(null)
}
const callBackFuntion = util.callbackify(fn)
callBackFuntion((err,ret)=>{
    // console.log(err.reason)
    if (err) throw err;
    console.log(ret)
})

function MySteam(){
    EventEmitter.call(this)
}
util.inherits(MySteam,EventEmitter)
MySteam.prototype.write = function(data){
    this.emit('data',data)
}

const stream = new MySteam()
console.log(stream instanceof EventEmitter)
console.log(MySteam.super_ === EventEmitter)


var inspect = util.inspect(util,{showHidden:true,depth:null})
console.log(inspect)
