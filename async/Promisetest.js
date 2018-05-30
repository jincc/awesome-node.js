
var Promise = require('./Promise')
var Taxi = require('./taxi')
var p = new Promise(function(resolve,reject){
    console.log('start')
    setTimeout(()=>{
        resolve(20)
        // reject(new Error('222'))
    },1000)
})
// p.then(function(v){
//     console.log(v)
// })
// p.then(function(v){
//     console.log(v)
// })

// setTimeout(()=>{
//     p.then(function(v){
//         console.log(v)
//     })
// },2000)


p.then(v=>{
    // console.log(v)
    return v+2
}).then(v=>{
    console.log(v)
})




var t = new Taxi()
console.log(t)
t.then((v)=>{
    return v * v
}).then(v=>{
    console.log(v)
})

t.fulfill(2)