var async = require('async')


var concurrencyCount = 0
function fetchUrl(url,callBack){
    let delay = parseInt((Math.random() * 10000000) % 2000, 10)
    // var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    console.log(`现在的并发数${concurrencyCount},抓取的url:${url},延时:${delay}`)
    concurrencyCount++
    setTimeout(()=>{
        concurrencyCount--
        callBack(null,url)
    },delay)
}
var urls = []
for (let i =0;i < 30;i++){
    urls.push('http://datasource_' + i)
}

// urls.forEach(url=>{
//     fetchUrl(url,(err,content)=>{
//         console.log(`${url} finished`)
//     })
// })

//利用mapLimit来控制并发数
async.mapLimit(urls,5,(url,callBack)=>{
    fetchUrl(url,callBack)
},(err,result)=>{
    console.log('final:')
    console.log(result)
})