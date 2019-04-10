import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  render() {
    return (
      <div>
        <p>Login Component</p>
        <form>
          <label>
            Email:
            <input type='text' />
          </label>
          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
}

export default Login;
