import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux-new/actions/auth';

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  onFormChange = event => this.setState({ username: event.target.value });

  onFormSubmit = event => {
    event.preventDefault();

    localStorage.setItem('username', this.state.username);

    this.props.addUser({ 
      username: this.state.username, 
      socketId: localStorage.getItem('socketId'), 
      status: 'active' 
    });

    this.props.loginUser();
  }

  render() {
    return (
      <div>
        <p>Login Component</p>
        <form>
          <label>Username:
            <input 
              type='text'
              value={this.state.username}
              onChange={this.onFormChange} 
            />
          </label>
          <input 
            type='submit' 
            value='Login'
            onClick={this.onFormSubmit}
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => dispatch(addUser(user))
  }
}

const Login = connect(null, mapDispatchToProps)(ConnectedLogin);

export default Login;
