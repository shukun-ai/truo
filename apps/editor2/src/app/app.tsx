import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '../contexts/theme-provider';

import { router } from './router';

export type AppProps = {
  //
};

export const App = ({}: AppProps) => {
  return (
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
};
