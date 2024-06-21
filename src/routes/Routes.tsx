import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { useAuthCredentials } from '@services';

import { ActivityIndicator, Box, Screen } from '@components';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { Stacks, useRouter } from './useRouter';

function LoadingScreen() {
  return (
    <Screen>
      <Box
        flex={1}
        backgroundColor="background"
        justifyContent="center"
        alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    </Screen>
  );
}

const stacks: Record<Stacks, React.ReactElement> = {
  Loading: <LoadingScreen />,
  Auth: <AuthStack />,
  App: <AppStack />,
};

export function Router() {
  const stack = useRouter();

  const Stack = stacks[stack];

  return <NavigationContainer>{Stack}</NavigationContainer>;
}
