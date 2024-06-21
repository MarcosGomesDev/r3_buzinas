import { Box, Button, Screen, Text, TextInput } from '@components';
import { authorization, useAuthCredentials } from '@services';
import { useState } from 'react';
import { Image } from 'react-native';

function Header() {
  return (
    <Box
      height={50}
      width={'100%'}
      justifyContent="center"
      backgroundColor="background"
      alignContent="center"
      alignItems="center">
      <Image
        source={require('@assets/images/logo.png')}
        style={{
          width: 100,
          height: 90,
          alignSelf: 'center',
          transform: [
            {
              scale: 0.7,
            },
          ],
        }}
        resizeMode="contain"
      />
    </Box>
  );
}

export function AuthorizationScreen() {
  const [code, setCode] = useState<string>('');
  const { saveCredentials } = useAuthCredentials();

  async function handleAuthorizationPress() {
    if (!code) {
      return;
    }

    const authorized = await authorization(code);

    if (authorized) {
      saveCredentials(authorized);
    }
  }

  return (
    <Screen hasHeader HeaderComponent={<Header />} flex={1}>
      <Box mt="s48" pt="s48">
        <Text textAlign="center" preset="headingMedium" mb="s38">
          Autorização
        </Text>
        <TextInput
          placeholder="Digite a senha de acesso"
          value={code}
          onChangeText={e => setCode(e)}
        />

        <Button title="Liberar" mt="s36" onPress={handleAuthorizationPress} />
      </Box>
    </Screen>
  );
}
