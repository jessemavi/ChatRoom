import { ADD_MESSAGE, MESSAGES_LOADED } from '../actionTypes';

export function messages(state = [], action) {
  console.log('action payload: ', action.payload);

  if(action.type === ADD_MESSAGE) {
    return state.concat(action.payload)
  }

  if(action.type === MESSAGES_LOADED) {
    return state.concat(action.payload)
  }

  return state;
}
