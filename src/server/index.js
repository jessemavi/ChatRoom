const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlMetadata = require('url-metadata')

const os = require('os');

const app = express();

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(cors());

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

const server = http.createServer(app);

const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log(`id on connection: ${socket.id}`);
  io.emit('connect', socket.id);

  socket.on('broadcast', data => {
    console.log(`broadcast data: ${data}`);
    socket.broadcast.emit('broadcast', data);
  });

  socket.on('message', message => {
    console.log(`socket.io message: ${message}`);
    // io.emit('message', message);
    socket.broadcast.emit('broadcast', message);
  });

  socket.on('user', user => {
    console.log(`socket.io user: ${user}`);
    // io.emit('user', user);
    socket.broadcast.emit('broadcast', user);
  });
  
  socket.on('disconnect', () => {
    console.log(`id on disconnect: ${socket.id}`);
    io.emit('disconnect', socket.id);
  });
});

const users = [];
const messages = [];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  users.push(req.body);
  res.send(req.body);
});

app.delete('/api/users/:id', (req, res) => {
  users.forEach((user, index) => {
    if(user.socketId === req.params.id) {
      users.splice(index, 1);
      console.log(users);
    }
  });

  res.send(req.params.id);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  res.send(req.body);
});

app.post('/api/metadata', async (req, res) => {
  try {
    const metadata = await urlMetadata(req.body.url);
    res.json(metadata);
  } catch(err) {
    console.error(err);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
