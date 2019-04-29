import React, { Component } from 'react';
import './app.css';
// import ReactImage from './react.png';

import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';

// import { Provider } from 'react-redux';
// import { configureStore } from './redux/connect';

import socketIO from 'socket.io-client';

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

import { messageAdded } from './redux-new/actions/messages';
import { userAdded, removeUser, logoutUser } from './redux-new/actions/users';

export const socket = socketIO('http://localhost:8080');

// const store = configureStore();

class ConnectedApp extends Component {
  constructor() {
    super();
    this.state = { 
      loggedIn: false
    };
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('current session socket id: ', socket.id);
      localStorage.setItem('socketId', socket.id);
    });

    socket.on('disconnect', id => {
      console.log(id, localStorage.getItem('socketId'));
      console.log('logged out user socket id: ', id);
      // if(id === 'forced close' || 'io client disconnect') {
      //   id = localStorage.getItem('socketId');
      // }

      this.props.removeUser({ 
        socketId: id
      });
    });

    socket.on('message', message => {
      this.props.messageAdded(message);
    });

    socket.on('user', user => {
      this.props.userAdded(user);
    });

    window.addEventListener('beforeunload', () => {
      socket.disconnect(socket.id);
    });
  }

  loginUser = (username) => {
    this.setState({ 
      loggedIn: true
    });
  }

  logoutUser = () => {
    socket.disconnect();
    this.setState({ loggedIn: false });
    socket.connect();
  }

  render() {
    return (
        !this.state.loggedIn 
        ?
          <Login loginUser={this.loginUser} />
        :
        <ChatRoom logoutUser={this.logoutUser} />  
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    messageAdded: message => dispatch(messageAdded(message)),
    userAdded: user => dispatch(userAdded(user)),
    removeUser: user => dispatch(removeUser(user)),
    logoutUser: () => dispatch(logoutUser())
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
