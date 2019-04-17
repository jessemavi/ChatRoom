import React from 'react';

const Message = props => {
  return (
    <p>{props.text} {props.user} {props.time}</p>
  );
}

export default Message;
