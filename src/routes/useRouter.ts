import { useEffect } from 'react';

import { settingsService, useAuthCredentials } from '@services';

export type Stacks = 'Loading' | 'Auth' | 'App';

export function useRouter(): Stacks {
  // const showOnboarding = useShowOnboarding();
  const { authCredentials, isLoading } = useAuthCredentials();

  useEffect(() => {
    if (!isLoading) {
      settingsService.hideSplashScreen();
    }
  }, [isLoading]);

  if (isLoading) {
    return 'Loading';
  }

  if (authCredentials) {
    return 'App';
  }

  return 'Auth';
}
