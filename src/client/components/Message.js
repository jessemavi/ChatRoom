import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';

const Message = ({ content, user, time }) => {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author>{user}</Comment.Author>
        <Comment.Metadata>{time}</Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}

export default Message;
