import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux-new/actions/auth';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example. You can do same with CSS, the main idea is that all the elements up to the `Grid` below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input 
                  fluid 
                  icon='user' 
                  iconPosition='left' 
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.onFormChange} 
                />
                <Button color='blue' fluid size='large' onClick={this.onFormSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
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
