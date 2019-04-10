import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

import { Provider } from 'react-redux';
import { configureStore } from './redux/connect';

import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:8080');

const store = configureStore();

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    socket.on('message', message => console.log('message: ', message));
    socket.on('disconnect', id => console.log('logged out user id: ', id));

    socket.emit('message', 'Chat message #1');
    socket.emit('message', 'Chat message #2');
    socket.emit('message', 'Chat message #3');
  }

  render() {
    const { username } = this.state;
    return (
      <Provider store={store}>
        <div>
          {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        </div>
      </Provider>
    );
  }
}
