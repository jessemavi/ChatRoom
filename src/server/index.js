const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const os = require('os');

const app = express();

const port = process.env.PORT || 8080;
app.set('port', port);

app.use(express.static('dist'));

app.use(bodyParser.json());

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

const users = [
  {
    username: 'bear1',
    socketId: '999999',
    status: 'inactive'
  },
  {
    username: 'lion1',
    socketId: '111111',
    status: 'active'
  }
];

const messages = [
  {
    content: 'redux tutorials?',
    user: 'bear1',
    time: Date.now()
  },
  {
    content: 'react tutorials?',
    user: 'lion1',
    time: Date.now()
  }
];

app.get('/api/users', (req, res) => {
  const activeUsers = users.filter(user => user.status === 'active');
  res.json(activeUsers);
});

app.post('/api/users', (req, res) => {
  users.push(req.body);
  res.send(req.body);
});

app.put('/api/users/:id', (req, res) => {
  users.forEach((user, index) => {
    if(user.socketId === req.params.id) {
      user.status = 'inactive';
    }
  });

  res.send(req.params.id);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  messages.push(req.body);
  res.send(req.body);
});

server.listen(port, () => console.log(`Listening on port ${port}!`));
