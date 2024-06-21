const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('user joined', username); // Broadcast the username to all connected clients
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', { username: socket.username, message }); // Broadcast the message and username
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if (socket.username) {
      io.emit('user exited', socket.username); // Broadcast the username of the disconnected user
    }
  });
});

const server = http.listen(3020, () => {
  console.log('Server listening on port 3000');
});
