const path = require('path'); // Builtin
const http = require('http'); // Builtin
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const express = require('express');
var app = express();
var server = http.createServer(app); // For socket.io
var io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var users = new Users();
var PORT = process.env.PORT || 3000;

var total_users = 0;
// var room_number = 0;

app.use(express.static(publicPath));

// Server Side
// io.on registers an event listener
io.on('connection', (socket) => {
    // What to do when a user connects to it
    console.log('New user connected');
    total_users ++;

    socket.on('join', (params, callback) => {
        join(params.gender);
        callback();
    });

    function join(gender, isRoomChange=false) {

        var name;
        if (gender == 'm') {
            name = '小薯条';
        } else if (gender == 'f') {
            name = '小番茄';
        } else {
            throw 'Gender should be either m or f';
        }

        // console.log(users.getNextAvailableRoom('m'));
        var nextAvail = users.getNextAvailableRoom(gender, socket.id);
        console.log(nextAvail);
        var room_number = nextAvail[0];
        var isFound = nextAvail[1];

        socket.join(room_number);
        // users.removeUser(socket.id); // Remove from any prev room joined
        users.addUser(socket.id, name, room_number, gender, isRoomChange);

        // io.to(room_number).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage(`机器人@房间${room_number}`, isFound ? '欢迎，对方已加入，开始聊天吧~': '目前聊天室只有你一个人，请耐心等候~'));
        socket.broadcast.to(room_number).emit('newMessage', generateMessage(`机器人@房间${room_number}`, `${name}已加入，请开始聊天吧~`))
    }

    /* Receive from client */
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)

        var user = users.getUser(socket.id);
        console.log(user);
        if (user && isRealString(message.text)) {
            console.log(`msg sent to ${user.room}`);
            io.to(user.room).emit('newMessage', generateMessage(
                user.name,
                message.text
            ));
        }
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('changeRoom', (params) => {
        console.log('Room about to change');
        join(params.gender, isRoomChange=true);
        // var user = users.removeUser(socket.id, preserve=true);
        // // total_users --;
        // if (user) {
        //     // io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        //     io.to(user.room).emit('newMessage', generateMessage('机器人', `${user.name}已离开。`));
        //     socket.leave(user.room);
        // }
    });

    socket.on('leave', () => {
        console.log('User leaves');
        var user = users.removeUser(socket.id, preserve=true);
        // total_users --;
        console.log(user);
        if (user) {
            // io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.prev_room).emit('newMessage', generateMessage('机器人', `${user.name}已离开。`));
            socket.leave(user.prev_room);
        }
    });

    /* If a user disconnects */
    socket.on('disconnect', () => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        total_users --;
        if (user) {
            // io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('机器人', `${user.name}已离开。`));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
