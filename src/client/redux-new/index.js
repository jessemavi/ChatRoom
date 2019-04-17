import store from './store';
import { addMessage } from './actions/messages';

window.store = store;
window.addMessage = addMessage;
