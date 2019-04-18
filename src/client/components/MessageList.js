import React from 'react';
import { connect } from 'react-redux';

import Message from './Message';

let MessageList = ({ messages }) => (
  <div>
    <h3>MessageList Component</h3>
    {messages.map((message, index) => (
      <Message 
        key={index}
        user={message.user}
        content={message.content}
        time={message.time}
      />
    ))}
  </div>
);

const mapStateToProps = state => {
  return { messages: state.messages };
};

MessageList = connect(mapStateToProps)(MessageList);

export default MessageList;
