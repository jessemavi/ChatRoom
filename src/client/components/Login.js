import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux-new/actions/users';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
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
          Taken straight from this example: https://react.semantic-ui.com/layouts/login
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

export default connect(null, mapDispatchToProps)(Login);
