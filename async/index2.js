

// function doubleUp(value){
//     return value * 2
// }
// function increment(value){
//     return value + 1
// }
// function output(value){
//     console.log(value)
// }

// var promise = Promise.resolve(1)
// promise.then(increment)
// .then(doubleUp)
// .then(output)
// .catch(e=>{
//     console.error(e)
// })

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        resolve(Math.random()*100)
    });
}

var request =  {
    comment:function getComment(){
        return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse)
    },
    people:function getPeople(){
        return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse)
    }
}

function main(){
    function recordValue(results,value){
        results.push(value)
        return results
    }
    //通过使用这种偏函数（Partial Function）的方式就可以减少匿名函数的使用。（如果在函数回调风格的代码能很好的做到函数分离的话，也能减少匿名函数的数量）
    var pushValue = recordValue.bind(null,[])
    return request.comment().then(pushValue).then(request.people).then(pushValue)
}

main().then(v=>{
    console.log(v)
}).catch(e=>{
    console.log(e)
})

//all
var p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('execut 1')
        resolve(1)
    },1000)
})
var p2 = Promise.reject(new Error('cao'))
var p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('execut 2')
        resolve(2)
    },2000)
})

// Promise.all([p1,p2,p3]).then(data=>{
//     console.log(data)
// }).catch(e=>{
//     console.log(e)
// })

// Promise.race([p1,p3]).then(data=>{
//     console.log(data)
// }).catch(e=>{
//     console.log(e)
// })

p1.then(d=>{
    console.log('11111111')
})

p1.then(d=>{
    console.log('2222222222')
})