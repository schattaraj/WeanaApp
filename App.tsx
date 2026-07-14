import React from 'react';
import {View, Button} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {config} from './src/authConfig';

export default function App() {
  const login = async () => {
    try {
      const authState = await authorize(config);

      console.log(authState);

      console.log('Access Token');
      console.log(authState.accessToken);

      console.log('Refresh Token');
      console.log(authState.refreshToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Login with Keycloak" onPress={login} />
    </View>
  );
}