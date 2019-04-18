import React from 'react';

const Message = ({ text, user, time }) => {
  return (
    <p>
      <i>{user}</i> : {text} {time}
    </p>
  );
}

export default Message;
