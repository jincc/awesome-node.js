var main = require('../main')
var should = require('should')

describe('test/main.test.js',function(){
    console.log()
    it('should equal 0 when n === 0',function(){
        main.fabonacci(0).should.equal(0)
    })
    it('should equal 1 when n === 1',function(){
        main.fabonacci(1).should.equal(1)
    })
    it('should equal 55 when n === 10',function(){
        main.fabonacci(10).should.equal(55)
    })
    it('should throw when n > 10',function(){
        function exap(){
            main.fabonacci(11)
        }
        exap.should.throw('n should <= 10')
    })
    it('should throw when n < 0',function(){
        function exap(){
            main.fabonacci(-1)
        }
        exap.should.throw('n should >= 0')
    })

    it('should throw when n isnt number',function(){
        function exap(){
            main.fabonacci("xxx")
        }
        exap.should.throw('n should be a number')
    })
})