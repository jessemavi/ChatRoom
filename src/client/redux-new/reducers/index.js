import { ADD_MESSAGE } from '../actionTypes';

const initialState = {
  users: [],
  messages: []
};

function rootReducer(state = initialState, action) {
  if(action.type === ADD_MESSAGE) {
    console.log(action.payload);
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
