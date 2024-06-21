import { Router } from '@routes';
import {
  AuthCredentialsProvider,
  initializeStorage,
  MMKVStorage,
} from '@services';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from '@theme';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

initializeStorage(MMKVStorage);

function App(): React.JSX.Element {
  return (
    <>
      <AuthCredentialsProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </SafeAreaProvider>
      </AuthCredentialsProvider>
    </>
  );
}

export default App;
