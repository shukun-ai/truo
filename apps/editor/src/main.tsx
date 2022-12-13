// Must put polyfills first.
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
// Must put these two provider files before App.
import './utils/locale-provider';
import './utils/store-provider';

import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
