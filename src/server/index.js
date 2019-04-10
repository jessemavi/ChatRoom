const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const os = require('os');

const app = express();

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

const server = http.createServer(app);

const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  console.log('id on connection: ', socket.id);

  socket.on('message', (message) => {
    console.log('socket.io message:', message);
    io.emit('message', message);
  })
  
  socket.on('disconnect', () => {
    console.log('id on disconnect: ', socket.id);
    io.emit('disconnect', socket.id);
    console.log('user disconnected')
  })
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
