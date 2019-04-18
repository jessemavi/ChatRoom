import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux-new/actions/messages';

class ConnectedAddMessage extends Component {
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
    this.props.addMessage({
      content: this.state.formValue,
      user: 'test@gmail.com',
      time: Date.now()
    });
    this.setState({ formValue: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input 
          type='text'
          placeholder='Enter a message'
          value={this.state.formValue} 
          onChange={this.onFormChange}
        />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: message => dispatch(addMessage(message))
  }
}

const AddMessage = connect(null, mapDispatchToProps)(ConnectedAddMessage);

export default AddMessage;
