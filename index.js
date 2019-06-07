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
    usersConnected.push(user);
    let userFiltered = usersConnected.reduce((acc, current) => {
      const x = acc.find(item => item.user === current.user);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    if (!user.firstTime) {
      userFiltered = userFiltered.map((user) => {
        return {
          ...user,
          firstTime: false
        }
      })
    }
    usersConnected = userFiltered;
    io.emit('channel_connectUser', usersConnected);
  });

  socket.on('channel_disconnectUser', (user) => {
    var removeIndex = usersConnected
      .map(item => item.user).indexOf(user);
    usersConnected.splice(removeIndex, 1);
    io.emit('channel_disconnectUser', usersConnected, user);
  })

  socket.on('channel_messages', (messages) => {
    io.emit('channel_messages', messages);
  });
});

const port = process.env.PORT || 3000;


http.listen(port, (req, res) => {
  console.log('listening on *:3000');
});