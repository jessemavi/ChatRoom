import React from 'react';

const Message = ({ content, user, time }) => {
  return (
    <p>
      <i>{user}</i> : {content} {time}
    </p>
  );
}

export default Message;
