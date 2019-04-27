import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Header } from 'semantic-ui-react';
import { getMessages } from '../redux-new/actions/messages';
import Message from './Message';

class MessageList extends Component {
  constructor() {
    super();
    this.messageList = React.createRef();
    this.audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
  }

  async componentDidMount() {
    await this.props.getMessages();
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.checkNewestMessageForMention();
  }

  scrollToBottom() {
    if(this.props.messages.length === 0) return;

    // using requestAnimationFrame instead of a timeout would be better
    const newestMessage = this.props.messages[this.props.messages.length - 1];

    if(newestMessage.urlMetadata.length > 0) {
      setTimeout(() => {
        this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
      }, 300)
    } else {
      this.messageList.current.scrollTop = this.messageList.current.scrollHeight;
    }
  }

  checkNewestMessageForMention() {
    if(this.props.messages.length === 0) return;

    const newestMessage = this.props.messages[this.props.messages.length - 1];
    if(newestMessage.content.includes(`@${localStorage.getItem('username')}`)) {
      this.audio.play();
    }
  }

  removeURLs(message) {
    let result = '';
    const messageArray = message.split(' ');

    messageArray.forEach(word => {
      try {
        const isURL = new URL(word);
        if(word.includes('http')) {
          result += '';
        } else {
          result += ` ${word}`;
        }
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
