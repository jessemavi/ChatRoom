import { ADD_USER } from '../actionTypes';

// action creator that returns an action
export function addUser(payload) {
  return { 
    type: ADD_USER, 
    payload 
  };
}

export function getUsers() {
  
}