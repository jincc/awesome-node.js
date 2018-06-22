var utils = require('util')

class Animal{
    constructor(type){
        this.type = type
    }
    walk(){
        console.log('walk')
    }
}

class Person extends Animal{
    constructor(name){
        super('person')
        this.name = name
    }
    sayName(){
        console.log(this.name)
    }
}

var person = new Person()
console.log(person)

// utils.inherits(Animal)

var a = function(){
    console.log(this)
}
a()

function b(){
    console.log(this)
}
b()