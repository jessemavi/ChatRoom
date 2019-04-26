import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../redux-new/actions/messages';
import { Comment, Header } from 'semantic-ui-react';

import Message from './Message';

class MessageList extends Component {
  constructor() {
    super();
    this.messageList = React.createRef();
  }

  async componentDidMount() {
    await this.props.getMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    // using requestAnimationFrame instead of a timeout would be better
    const newestMessage = this.props.messages[this.props.messages.length - 1];

    if(newestMessage.urlMetadata.length > 0) {
      setTimeout(() => {
        this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
      }, 150)
    } else {
      this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
    }
  }

  removeURLs(message) {
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
      <div>
        <Header as='h3'>Messages</Header>
        <div
          ref={this.messageList}
          style={{ height: '85vh', overflow: 'auto' }}
        >
          <Comment.Group>
            {this.props.messages.map((message, index) => (
              <Message 
                key={index}
                user={message.user}
                content={message.urlMetadata.length > 0 ?
                  this.removeURLs(message.content) :
                  message.content
                }
                time={message.time}
                urlMetadata={message.urlMetadata}
              />
            ))}
          </Comment.Group>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { messages: state.messages };
};

MessageList = connect(mapStateToProps, { getMessages })(MessageList);

export default MessageList;
