import { ADD_MESSAGE, MESSAGES_LOADED } from '../actionTypes';
import { socket } from '../../App';

export function addMessage(payload) {
  return async function(dispatch) {
    try {
      socket.emit('message', payload);
      dispatch({ type: ADD_MESSAGE, payload: payload });
      
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch(err) {
      return console.error(err);
    }
  }
}

export function messageAdded(payload) {
  return { 
    type: ADD_MESSAGE, 
    payload 
  };
}

export function getMessages() {
  return async function(dispatch) {
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      const messages = await response.json();
      dispatch({ type: MESSAGES_LOADED, payload: messages });
    } catch(err) {
      return console.error(err);
    }
  }
}