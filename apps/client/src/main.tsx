// Must put polyfills first.
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
// Must put these two provider files before App.
import './utils/locale-provider';
import './utils/store-provider';

import { App } from './App';
import { registerExceptionListeners } from './utils/exceptions/registerExceptionListeners';
import './normalize.css';
import './styles.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);

// Catch all exception globally
registerExceptionListeners();
