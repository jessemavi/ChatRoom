import { ADD_MESSAGE, ADD_USER, REMOVE_USER, ACTIVE_USERS_LOADED, MESSAGES_LOADED, LOGOUT_USER } from '../actionTypes';

const initialState = {
  users: [],
  messages: []
};

function rootReducer(state = initialState, action) {
  console.log('action payload: ', action.payload);

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

  if(action.type === REMOVE_USER) {
    console.log(state.users, action.payload);
    return Object.assign({}, state, {
      users: state.users.filter(user => user.socketId !== action.payload.socketId)
    });
  }

  if(action.type === LOGOUT_USER) {
    return Object.assign({}, {
      users: [],
      messages: []
    });
  }

  if(action.type === ACTIVE_USERS_LOADED) {
    console.log(state);
    console.log(action.payload);

    let activeUsersInState = state.users.slice();
    
    action.payload.forEach(user => {
      let hasUser = false;
      activeUsersInState.forEach(activeUser => {
        if(activeUser.username === user.username) {
          hasUser = true;
        }
      });

      if(!hasUser) {
        activeUsersInState.push(user);
      }
    });

    return Object.assign({}, state, {
      users: activeUsersInState
    });
  }

  if(action.type === MESSAGES_LOADED) {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload)
    })
  }

  return state;
}

export default rootReducer;
