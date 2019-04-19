import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../redux-new/actions/messages';

import Message from './Message';

class MessageList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    return (
      <div>
        <h3>MessageList Component</h3>
        {this.props.messages.map((message, index) => (
          <Message 
            key={index}
            user={message.user}
            content={message.content}
            time={message.time}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { messages: state.messages };
};

MessageList = connect(mapStateToProps, { getMessages })(MessageList);

export default MessageList;
