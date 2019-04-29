import store from './store';
import { addMessage } from './actions/messages';
import { addUser, removeUser, getActiveUsers } from './actions/users';

window.store = store;
window.addMessage = addMessage;
window.addUser = addUser;
window.removeUser = removeUser;
window.getActiveUsers = getActiveUsers;
