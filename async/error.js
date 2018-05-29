
class TimeoutError extends Error {

}

function delay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(ms)
        },ms)
    })
}

function timeout(promise,ms){
    const timeout = delay(ms).then((()=>{
        throw new TimeoutError('Operation timed out after' + ms + 'ms')
    }))
    return Promise.race([promise,timeout])
}

function doTask(){
    const delay = Math.random()*2000
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },delay)
    })
}

timeout(doTask(),1000).then(v=>{
    console.log('finished')
}).catch(e=>{
    if (typeof e === 'TimeoutError'){
        console.log('is TimeoutError')
    }
    console.log(e instanceof TimeoutError)
})

