const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the chat!',
        createdTimestamp: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined the chat',
        createdTimestamp: new Date().getTime()
    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage ', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdTimestamp: new Date().getTime(),
        })
        // socket.broadcast.emit('newMessage', {
        //   from: message.from,
        //   text: message.text,
        //   createdTimestamp: new Date().getTime(),
        // })
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
