import React from 'react';
import { connect } from 'react-redux';

import Message from './Message';

let MessageList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <Message 
        key={index}
        user={message.user}
        text={message.text}
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
