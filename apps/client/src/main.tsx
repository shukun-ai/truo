import React from 'react';
import ReactDOM from 'react-dom';
// Must put these two provider files before App.
import './utils/locale-provider';
import './utils/store-provider';

import { App } from './App';
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
