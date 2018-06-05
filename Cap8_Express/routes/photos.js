var __photos = []
__photos.push({
    name:"Node.js Logo",
    path:"http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg"
})
__photos.push({
    name:"Ryan Speaking",
    path:"http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg"
})

module.exports = function (req,res){
    res.render('photos',{
        title:'Photos',
        photos:__photos
    })
}