function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(()=>{
          resolve(ms)
      }, ms);
    });
}
  
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value)
}
  
asyncPrint('hello world', 50);
console.log('start')

  async function doMoreAsync(){
    var times = [1000,2000,3000]
    times = times.map(timeout)
    let results = await Promise.all(times)
    console.log(results)
  }
  doMoreAsync()