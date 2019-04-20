import { ADD_USER, ACTIVE_USERS_LOADED } from '../actionTypes';
import { socket } from '../../App';

// action creator that returns an action
export function addUser(payload) {
  return function(dispatch) {
    socket.emit('user', payload);
    dispatch({ type: ADD_USER, payload: payload });
  }
}

export function userAdded(payload) {
  return { 
    type: ADD_USER, 
    payload 
  };
}

export function getActiveUsers() {
  return async function(dispatch) {
    // return fetch('http://localhost:8080/api/users')
    //   .then(response => response.json())
    //   .then(users => {
    //     dispatch({ type: ACTIVE_USERS_LOADED, payload: users })
    //   })
    //   .catch(err => console.error(err));
    try {
      const response = await fetch('http://localhost:8080/api/users');
      const users = await response.json();
      dispatch({ type: ACTIVE_USERS_LOADED, payload: users });
    } catch(err) {
      return console.error(err);
    }
  }
}