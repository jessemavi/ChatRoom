import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

import { connect } from 'react-redux';

// import { Provider } from 'react-redux';
// import { configureStore } from './redux/connect';

import socketIO from 'socket.io-client';

import Login from './components/Login';
import UserList from './components/UserList';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

import { messageAdded } from './redux-new/actions/messages';
import { userAdded, userRemoved } from './redux-new/actions/auth';

export const socket = socketIO('http://localhost:8080');

// const store = configureStore();

class ConnectedApp extends Component {
  state = { 
    username: null,
    loggedIn: localStorage.hasOwnProperty('username') ? true : false
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    socket.on('connect', () => {
      console.log('current logged in user socket id: ', socket.id);
      localStorage.setItem('socketId', socket.id);
    });

    socket.on('disconnect', id => {
      console.log('logged out user socket id: ', id);
      this.props.userRemoved({ socketId: id });
    });

    socket.on('message', message => {
      console.log('message: ', message);
    });

    socket.on('user', user => {
      console.log('user: ', user);
    });

    socket.on('broadcast', data => {
      console.log(data);
      if(data.content) {
        this.props.messageAdded(data);
      } else if(data.socketId) {
        this.props.userAdded(data);
      }
    });
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

function mapDispatchToProps(dispatch) {
  return {
    messageAdded: message => dispatch(messageAdded(message)),
    userAdded: user => dispatch(userAdded(user)),
    userRemoved: user => dispatch(userRemoved(user))
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
