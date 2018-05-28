function A(){
    console.log('A')
}
function B(){
    console.log('B')
}
exports.A = A;
exports.B = B;
const obj = {'jicnc':'kocc'}

// module.exports = obj
module.exports.A = A
module.exports.B = B



