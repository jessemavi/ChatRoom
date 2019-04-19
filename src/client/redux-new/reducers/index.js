import { ADD_MESSAGE, ADD_USER } from '../actionTypes';

const initialState = {
  users: [],
  messages: []
};

function rootReducer(state = initialState, action) {
  console.log(action.payload);

  if(action.type === ADD_MESSAGE) {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if(action.type === ADD_USER) {
    return Object.assign({}, state, {
      users: state.users.concat(action.payload)
    });
  }

  return state;
}

export default rootReducer;
