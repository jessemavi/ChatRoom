import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';

// import { Provider } from 'react-redux';
// import { configureStore } from './redux/connect';

import socketIO from 'socket.io-client';

import Login from './components/Login';
import UserList from './components/UserList';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

import { messageAdded } from './redux-new/actions/messages';
import { userAdded, removeUser, logoutUser } from './redux-new/actions/auth';

export const socket = socketIO('http://localhost:8080');

// const store = configureStore();

class ConnectedApp extends Component {
  state = { 
    loggedIn: false
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('current session socket id: ', socket.id);
      localStorage.setItem('socketId', socket.id);
      this.setState({ socketId: socket.id });
    });

    socket.on('disconnect', id => {
      console.log(id, localStorage.getItem('socketId'));
      console.log('logged out user socket id: ', id);
      this.props.removeUser({ 
        socketId: id,
        username: localStorage.getItem('username')
      });
    });

    socket.on('broadcast', data => {
      console.log('broadcast data: ', data);
      if(data.content) {
        this.props.messageAdded(data);
      } else if(data.socketId) {
        this.props.userAdded(data);
      }
    });
  }

  loginUser = (username) => {
    this.setState({ 
      loggedIn: true,
      username: username 
    });
  }

  logoutUser = () => {
    socket.disconnect();
    this.props.logoutUser();
    this.setState({ loggedIn: false });
    socket.connect();
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn 
        ?
          <Login loginUser={this.loginUser} />
        :
          <div>
            {
            /*<Button onClick={this.logoutUser}>Logout</Button>*/
            }
            <Grid>
              <Grid.Column width={3}>
                <UserList />
              </Grid.Column>
              <Grid.Column width={10}>
                <MessageList />
                <AddMessage />
              </Grid.Column>
            </Grid>
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
    removeUser: user => dispatch(removeUser(user)),
    logoutUser: () => dispatch(logoutUser())
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
