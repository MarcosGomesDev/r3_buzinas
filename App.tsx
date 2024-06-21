import { ThemeProvider } from '@shopify/restyle';
import { theme } from '@theme';
import React from 'react';

function App(): React.JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <></>
      </ThemeProvider>
    </>
  );
}

export default App;
