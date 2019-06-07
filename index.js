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

let usersConnected = [];
io.on('connection', (socket) => {
  socket.on('channel_connectUser', (user) => {
    const copyUser = Object.assign({}, user);
    usersConnected.push(user);
    const userFiltered = usersConnected.reduce((acc, current) => {
      const x = acc.find(item => item.user === current.user);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    if (!user.firstTime) {
      
    }
    usersConnected = userFiltered;

    // console.log('usersFitered', userFiltered)
    // io.emit('channel_connectUser', userFiltered);
  });

  socket.on('channel_disconnectUser', (user) => {
    // users.delete(user);
    // const arrayUsers = Array.from(users);
    // io.emit('channel_disconnectUser', arrayUsers, user);
  })

  socket.on('channel_messages', (messages) => {
    io.emit('channel_messages', messages);
  });
});

http.listen(3000, (req, res) => {
  console.log('listening on *:3000');
});