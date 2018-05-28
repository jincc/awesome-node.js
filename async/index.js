function asyncFuntion(){
    console.log('creat')
    return new Promise((resolve,reject)=>{
        console.log('excute')
        setTimeout(()=>{
            resolve('hello')
        },1000)
    })
}

asyncFuntion().then()