// Must put polyfills first.
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { configureLocals } from './locales';
import { configureStore } from './services/store';

import 'reactflow/dist/style.css';

configureLocals();
configureStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
