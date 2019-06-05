const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

let users = new Set();
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('channel_connectUser', (user) => {
    const arrayUsers = Array.from(users.add(user))
    io.emit('channel_connectUser', arrayUsers);
  })
});

http.listen(3000, (req, res) => {
  console.log('listening on *:3000');
});