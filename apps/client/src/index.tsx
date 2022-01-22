import React from 'react';
import ReactDOM from 'react-dom';
// Must put these two provider files before App.
import './utils/locale-provider';
import './utils/store-provider';

import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { registerExceptionListeners } from './utils/exceptions/registerExceptionListeners';

import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Catch all exception globally
registerExceptionListeners();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
