import { ADD_MESSAGE, ADD_USER } from '../actionTypes';

const initialState = {
  users: [
    {
      email: 'test@gmail.com',
      id: '9999999999999'
    }
  ],
  messages: [
    {
      content: 'redux tutorials?',
      user: 'test@gmail.com',
      time: Date.now()
    },
    {
      content: 'react tutorials?',
      user: 'test2@gmail.com',
      time: Date.now()
    }
  ]
};

function rootReducer(state = initialState, action) {
  if(action.type === ADD_MESSAGE) {
    console.log(action.payload);
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    });
  }

  if(action.type === ADD_USER) {
    console.log(action.payload);
    return Object.assign({}, state, {
      users: state.users.concat(action.payload)
    });
  }

  return state;
}

export default rootReducer;
