import { ADD_USER, REMOVE_USER, ACTIVE_USERS_LOADED, LOGOUT_USER } from '../actionTypes';
import { socket } from '../../App';

// action creator that returns an action
export function addUser(payload) {
  return async function(dispatch) {
    try {
      socket.emit('user', payload);
      dispatch({ type: ADD_USER, payload: payload });
      
      const response = await fetch('http://localhost:8080/api/users', {
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

export function userAdded(payload) {
  return { 
    type: ADD_USER, 
    payload 
  };
}

export function removeUser(payload) {
  return async function(dispatch) {
    try {
      console.log('removeUser payload', payload);
      dispatch({ type: REMOVE_USER, payload: payload });
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'put',
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

export function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

export function userRemoved(payload) {
  return {
    type: REMOVE_USER, 
    payload 
  };
}

export function getActiveUsers() {
  return async function(dispatch) {
    try {
      const response = await fetch('http://localhost:8080/api/activeUsers');
      const users = await response.json();
      dispatch({ type: ACTIVE_USERS_LOADED, payload: users });
    } catch(err) {
      return console.error(err);
    }
  }
}