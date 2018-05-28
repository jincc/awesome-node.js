function asyncFuntion(){
    console.log('creat')
    return new Promise((resolve,reject)=>{
        console.log('excute')
        throw new Error('errorrrrrr')
        // setTimeout(()=>{
        //     resolve('hello')
        // },1000)
    })
}

asyncFuntion().then(v=>{
    console.log(v)
}).catch(e=>{
    console.log(e)
})

Promise.resolve(42)


var promise1 = new Promise((resolve,reject)=>{
    console.log('innner')
    resolve(20)
})

promise1.then(v=>{
    console.log(v)
})
console.log('outer')
