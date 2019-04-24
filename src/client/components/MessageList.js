import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../redux-new/actions/messages';
import { Comment, Header } from 'semantic-ui-react';

import Message from './Message';

class MessageList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getMessages();
  }

  removeURLs = (message) => {
    let result = '';
    const messageArray = message.split(' ');

    messageArray.forEach(word => {
      try {
        const isURL = new URL(word);
        result += '';
      } catch(err) {
        result += ` ${word}`;
      }
    });

    return result;
  }

  render() {
    return (
      <Comment.Group>
        <Header as='h3'>Messages</Header>
        {this.props.messages.map((message, index) => {
          return (
            <Message 
              key={index}
              user={message.user}
              content={
                message.urlMetadata.length > 0 ?
                  this.removeURLs(message.content) :
                  message.content
              }
              time={message.time}
              urlMetadata={message.urlMetadata}
            />
          );
        })}
      </Comment.Group>
    );
  }
}

const mapStateToProps = state => {
  return { messages: state.messages };
};

MessageList = connect(mapStateToProps, { getMessages })(MessageList);

export default MessageList;
