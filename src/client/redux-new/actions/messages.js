import { ADD_MESSAGE, MESSAGES_LOADED } from '../actionTypes';
import { socket } from '../../App';

async function checkMessageForURL(payload) {
  const messageArray = payload.content.split(' ');
  const urls = [];

  messageArray.forEach(word => {
    try {
      const isURL = new URL(word);
      urls.push(word);
    } catch(err) {
      // ignore word in message that is not a url and continue to next word
    }
  });

  if(urls.length === 0) return;

  const requests = urls.map(url => fetch('http://localhost:8080/api/metadata', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: url})
  }));

  await Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json()))
    .then(metadataResults => {
      console.log(metadataResults);
      const lastUrlMetadata = metadataResults[metadataResults.length - 1];
      payload.title = lastUrlMetadata.title;
      payload.description = lastUrlMetadata.description;
      payload.image = lastUrlMetadata.image;
    })
    .catch(err => console.error(err)));
}

export function addMessage(payload) {
  return async function(dispatch) {
    try {
      await checkMessageForURL(payload);
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