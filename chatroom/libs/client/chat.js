class Chat {
    constructor(socket){
        this.socket = socket
    }
    sendMessage(room,text){
        const message = {
            room,text
        }
        this.socket.emit('message',message)
    }
    changeRoom(room){
        this.socket.emit('join',{newRoom:room})
    }
   /**
    * comand 输入的命令
    */
    processCommand(command){
        var words = command.split(' ')
        var command = words[0].substring(1,words[0].length).toLowerCase()
        var message = false
        switch (command){
            case 'join':
            words.shift()
            var rooms = words.join(' ')
            this.changeRoom(rooms)
            break;
            case 'nick':
            words.shift()
            var name = words.join(' ')
            this.socket.emit('nameAttempt',name)
            break;
            default:
            message = 'Unrecognized command.'
            break;
        }
        return message
    }
}