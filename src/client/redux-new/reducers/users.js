import { ADD_USER, REMOVE_USER, ACTIVE_USERS_LOADED, LOGOUT_USER } from '../actionTypes';

export function users(state = [], action) {
  console.log('action payload: ', action.payload);

  if(action.type === ADD_USER) {
    return state.concat(action.payload);
  }

  if(action.type === REMOVE_USER) {
    return state.filter(user => user.socketId !== action.payload.socketId);
  }

  if(action.type === LOGOUT_USER) {
    return [];
  }

  if(action.type === ACTIVE_USERS_LOADED) {
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

    return activeUsersInState;
  }

  return state;
}
