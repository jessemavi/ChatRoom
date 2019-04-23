import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux-new/store';
import 'semantic-ui-css/semantic.min.css'

// import redux index.js page for ability to test reducers
import index from './redux-new/index';

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById('root')
);
