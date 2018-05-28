const http = require('http')
const net = require('net')
const EventEmitter =require('events').EventEmitter;
const socketEmitter = new EventEmitter()
socketEmitter.clients = {} //所有的客户端 
socketEmitter.subscriptions = {} //所有的订阅者

//聊天室的功能
//1.connection的时候创建一个监听器，监听整个房间的消息
//2.关闭connection的时候，移出监听
//3.shutdown

socketEmitter.on('join',(id,socket)=>{
    this.clients[id] = socket
    this.subscriptions[id] = (sendId,message)=>{
        //收到数据，立刻钻回回去
        if (id != sendId){
            this.clients[id].write(message)
        }
    }
    this.on('broadcast',this.subscriptions[id])
})

var server = net.createServer(socket=>{
    // console.log(socket)
    var id = socket.remoteAddress + ':' + socket.remotePort
    socket.on('connect',()=>{
        console.log('connect')
        socketEmitter.emit('join',id,socket)
    })
    socket.on('data',data=>{
        socketEmitter.emit('broadcast',id,data)
    })
})
server.listen(3001)

// socketEmitter.on('error',(err)=>{
//     console.error(err)
// })
// socketEmitter.emit('error',new Error('funck'))