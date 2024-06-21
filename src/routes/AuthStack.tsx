import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthorizationScreen } from '@screens';

export type AuthStackParamList = {
  AuthorizationScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
      initialRouteName="AuthorizationScreen">
      <Stack.Screen
        name="AuthorizationScreen"
        component={AuthorizationScreen}
      />
    </Stack.Navigator>
  );
}
