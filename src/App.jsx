import React from 'react';
import ThemeProvider from './theme/ThemeProvider';
import { ProgressProvider } from './contexts/ProgressContext';
import Router from './router';

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router />
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;