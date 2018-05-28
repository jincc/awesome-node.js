'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
    function Chat(socket) {
        _classCallCheck(this, Chat);

        this.socket = socket;
    }

    _createClass(Chat, [{
        key: 'sendMessage',
        value: function sendMessage(room, text) {
            var message = {
                room: room, text: text
            };
            this.socket.emit('message', message);
        }
    }, {
        key: 'changeRoom',
        value: function changeRoom(room) {
            this.socket.emit('join', { newRoom: room });
        }
        /**
         * comand 输入的命令
         */

    }, {
        key: 'processCommand',
        value: function processCommand(command) {
            var words = command.split(' ');
            var command = words[0].substring(1, words[0].length).toLowerCase();
            var message = false;
            switch (command) {
                case 'join':
                    words.shift();
                    var rooms = words.join(' ');
                    this.changeRoom(rooms);
                    break;
                case 'nick':
                    words.shift();
                    var name = words.join(' ');
                    this.socket.emit('nameAttempt', name);
                    break;
                default:
                    message = 'Unrecognized command.';
                    break;
            }
            return message;
        }
    }]);

    return Chat;
}();
//# sourceMappingURL=chat.js.map