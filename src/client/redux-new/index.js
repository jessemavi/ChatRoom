import store from './store';
import { addMessage } from './actions/messages';
import { addUser } from './actions/auth';

window.store = store;
window.addMessage = addMessage;
window.addUser = addUser;
