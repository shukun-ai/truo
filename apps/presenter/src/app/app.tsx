import { StrictMode } from 'react';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <StrictMode>
      <NxWelcome title="presenter" />
      <div />
    </StrictMode>
  );
}

export default App;
