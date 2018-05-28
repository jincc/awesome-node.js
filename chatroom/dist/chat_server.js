'use strict';

/*
 分配昵称;
 房间更换请求;
 昵称更换请求;
 发送聊天消息;
 房间创建;
 用户断开连接。
*/

var socketio = require('socket.io');
//socketid实例
var io;

var guestNumber = 1;
var nickNames = {};
var nameUsed = [];
var currentRoom = {};

function listen(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        console.log('connection');
        //生成nickname
        guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed);
        //进入lobby聊天室
        joinRoom(socket, 'Lobby');
        //处理修改昵称
        handleNameChangeAttempts(socket, nickNames, nameUsed);
        //处理加入房间
        handleRoomJoining(socket);

        //处理收到消息
        handleMessageBroadcasting(socket);
        socket.emit('rooms', io.sockets.manager.rooms);
        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });
        //处理退出房间
        handleClientDisconnection(socket);
    });
}

exports.listen = listen;

//为每个进入房间的用户设置名字
function assignGuestName(socket, guestNumber, nickNames, nameUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    nameUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    //ENTER
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', { room: room });
    //通知其他人
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + 'has joined' + room + '.'
    });
    var usersInRoom = io.sockets.clients(room);
    var userInRoomSummart = 'Current in room has:';
    if (usersInRoom.length > 1) {
        usersInRoom.forEach(function (element) {
            if (element.id != socket.id) {
                userInRoomSummart += nickNames[socket.id];
                userInRoomSummart += ',';
            }
        });
    } else {
        userInRoomSummart += 'only u';
    }
    socket.emit('message', { text: userInRoomSummart });
}

function handleNameChangeAttempts(socket, nickNames, nameUsed) {
    //修改昵称
    socket.on('nameAttempt', function (name) {
        //收到命令
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: '名称不能以Guest开头'
            });
        } else {
            if (nameUsed.indexOf(name) == -1) {
                //删除之前的名字
                var preName = nickNames[socket.id];
                var preIndex = nameUsed.index(preName);
                //同步nickname
                nickNames[socket.id] = name;
                delete nameUsed[preIndex];
                nameUsed.push(name);
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: preName + ' \u5DF2\u7ECF\u66F4\u540D\u4E86\uFF0C\u73B0\u5728\u53EB\u505A' + name
                });
            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: '名称已经存在了'
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function () {
        var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
        delete nameUsed[nameIndex];
        delete nickNames[socket.id];
    });
}
//# sourceMappingURL=chat_server.js.map