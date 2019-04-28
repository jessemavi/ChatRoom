import { ADD_USER, REMOVE_USER, ACTIVE_USERS_LOADED, LOGOUT_USER } from '../actionTypes';

export function users(state = [], action) {
  console.log('action payload: ', action.payload);

  if(action.type === ADD_USER) {
    return state.concat(action.payload)
  }

  if(action.type === REMOVE_USER) {
    console.log('REMOVE_USER action', state, action.payload);
    return state.filter(user => user.socketId !== action.payload.socketId)
  }

  if(action.type === LOGOUT_USER) {
    return [];
  }

  if(action.type === ACTIVE_USERS_LOADED) {
    console.log(state);
    console.log(action.payload);

    let activeUsersInState = state.slice();
    
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

    return activeUsersInState
  }

  return state;
}
