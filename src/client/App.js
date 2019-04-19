import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

// import { Provider } from 'react-redux';
// import { configureStore } from './redux/connect';

import socketIO from 'socket.io-client';

import Login from './components/Login';
import UserList from './components/UserList';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

const socket = socketIO('http://localhost:8080');

// const store = configureStore();

export default class App extends Component {
  state = { 
    username: null,
    loggedIn: true
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    socket.on('message', message => console.log('message: ', message));
    socket.on('disconnect', id => console.log('logged out user id: ', id));

    socket.emit('message', 'Chat message #1');
    socket.emit('message', 'Chat message #2');
  }

  loginUser = () => this.setState({ loggedIn: true });

  render() {
    return (
      <div>
        {!this.state.loggedIn 
        ?
          <Login loginUser={this.loginUser} />
        :
          <div>
            <UserList />
            <MessageList />
            <AddMessage />
          </div>
        }
      </div>
    );
  }
}
