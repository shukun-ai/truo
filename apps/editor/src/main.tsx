// Must put polyfills first.
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { configureLocals } from './locales';
import { configureStore } from './services/store';

import 'reactflow/dist/style.css';

configureLocals();
configureStore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
