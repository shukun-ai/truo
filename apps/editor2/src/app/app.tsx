import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './contexts/app-context';
import { ThemeProvider } from './contexts/theme-provider';

import { router } from './router';

export const App = () => {
  return (
    <StrictMode>
      <AppProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AppProvider>
    </StrictMode>
  );
};
