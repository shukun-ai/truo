import { devTools } from '@ngneat/elf-devtools';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';

const start = () => {
  devTools();

  const element = document.getElementById('root');

  if (!element) {
    throw new Error('Did not find root element in html.');
  }

  const root = createRoot(element);

  root.render(<App />);
};

start();
