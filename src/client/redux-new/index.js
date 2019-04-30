import store from './store';
import { addMessage } from './actions/messages';
import { addUser, removeUser, getActiveUsers } from './actions/users';

// adding to redux store and actions to the window to be able to test reducers in the console 
window.store = store;
window.addMessage = addMessage;
window.addUser = addUser;
window.removeUser = removeUser;
window.getActiveUsers = getActiveUsers;
