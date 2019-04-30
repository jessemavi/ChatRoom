import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addMessage } from '../redux-new/actions/messages';

class AddMessage extends Component {
  constructor() {
    super();
    this.state = {
      formValue: ''
    };
  }

  onFormChange = (event) => {
    this.setState({ formValue: event.target.value });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.formValue === '') return;
    this.props.addMessage({
      content: this.state.formValue,
      user: localStorage.getItem('username'),
      time: new Date().toString()
    });
    this.setState({ formValue: '' });
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <input 
          type='text'
          placeholder='Enter a message'
          value={this.state.formValue} 
          onChange={this.onFormChange}
        />
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: message => dispatch(addMessage(message))
  }
}

export default connect(null, mapDispatchToProps)(AddMessage);
