import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

// class MessageList extends Component {
//   constructor() {
//     super();
//     this.state = {
      
//     };
//   }

//   render() {
//     return (
//       <div>
//         <p>MessageList Component</p>
//       </div>
//     );
//   }
// }

let MessageList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <Message 
        key={index}
        text={message.text}
        user={message.user}
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
