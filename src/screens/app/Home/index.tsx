import { Box, Screen, Text } from '@components';
import { useAuthCredentials } from '@services';
import { Image } from 'react-native';

function Header() {
  return (
    <Box
      height={70}
      width={'100%'}
      justifyContent="center"
      backgroundColor="primary"
      alignContent="center"
      alignItems="center">
      <Image
        source={require('@assets/images/logo.png')}
        style={{
          width: 100,
          height: 90,
          alignSelf: 'center',
          marginTop: 10,
          transform: [
            {
              scale: 0.8,
            },
          ],
        }}
        resizeMode="contain"
      />
    </Box>
  );
}

export function HomeScreen() {
  const { authCredentials } = useAuthCredentials();

  console.log('authCredentials', authCredentials);

  return (
    <Screen hasHeader HeaderComponent={<Header />} style={{ paddingTop: 0 }}>
      <Box>
        <Text>Home</Text>
      </Box>
    </Screen>
  );
}
