import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  onFormChange = event => this.setState({ email: event.target.value });

  onFormSubmit = event => {
    event.preventDefault();
    // invoke authLogin action creator

    this.props.loginUser();
  }

  render() {
    return (
      <div>
        <p>Login Component</p>
        <form>
          <label>Email:
            <input 
              type='text'
              value={this.state.email}
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

export default Login;
