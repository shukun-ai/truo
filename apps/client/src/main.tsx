// Must put polyfills first.
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
// Must put these two provider files before App.
import './utils/locale-provider';
import './utils/store-provider';

import { App } from './App';
import { registerExceptionListeners } from './utils/exceptions/registerExceptionListeners';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Catch all exception globally
registerExceptionListeners();
