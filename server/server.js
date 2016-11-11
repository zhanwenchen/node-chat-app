const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Load utils
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            // return terminates execution on error
            return callback('Name and Room Name are required');
        }

        socket.join(params.room);
        // Pull user from other rooms
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // Tell server to update user list for this room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        // console.log('createMessage ', message);
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
          io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        // Acknowledgements
        callback('');
    });

    socket.on('createLocationMessage', (coords) => {
      var user = users.getUser(socket.id);
      if (user) {
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      }
    })

    socket.on('disconnect', () => {
        var removedUser = users.removeUser(socket.id);
        if (removedUser) {
          // Update list
          io.to(removedUser.room).emit('updateUserList', users.getUserList(removedUser.room));
          // Print leave message
          io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} left the room`));
        }
    })
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
