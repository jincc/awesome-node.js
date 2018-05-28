

/*
学习使用测试框架 mocha : http://mochajs.org/
学习使用断言库 should : https://github.com/tj/should.js
学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886
*/
function fabonacci(n){
    if (typeof n !== 'number'){
        throw new Error('n should be a number')
    }
    if (n < 0) {
        throw new Error('n should >= 0');
    }
    if (n > 10) {
        throw new Error('n should <= 10');
    }
    if (n === 0) 
    return 0
    if (n === 1)
    return 1
    return fabonacci(n - 1) + fabonacci(n - 2)
}

if (require.main === module){
    var n = Number(process.argv[2])
    console.log(`n is ${n},argv:${process.argv}`)
    console.log(fabonacci(n))
}

exports.fabonacci = fabonacci