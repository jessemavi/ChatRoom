import { ADD_MESSAGE } from '../actionTypes';

// action creator that returns an action
export function addMessage(payload) {
  return { 
    type: ADD_MESSAGE, 
    payload 
  };
}