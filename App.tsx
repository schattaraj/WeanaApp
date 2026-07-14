import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from './src/authConfig';
import HomeScreen from './src/screens/HomeScreen';

const STORAGE_KEY_ACCESS  = '@weana/access_token';
const STORAGE_KEY_REFRESH = '@weana/refresh_token';

const {width} = Dimensions.get('window');

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // Restore session on cold start
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_ACCESS)
      .then(stored => { if (stored) setAccessToken(stored); })
      .catch(() => {})
      .finally(() => setBootstrapping(false));
  }, []);

  const login = async () => {
    try {
      const authState = await authorize(config);
      await AsyncStorage.setItem(STORAGE_KEY_ACCESS,  authState.accessToken);
      await AsyncStorage.setItem(STORAGE_KEY_REFRESH, authState.refreshToken);
      setAccessToken(authState.accessToken);
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  if (bootstrapping) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (accessToken) {
    return <HomeScreen accessToken={accessToken} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Image
        source={require('./assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/weana-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.title}>Welcome to Weana</Text>
        <Text style={styles.subtitle}>Connecting you with your future customer</Text>

        <TouchableOpacity style={styles.createButton} activeOpacity={0.85}>
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={login} activeOpacity={0.7}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    width: width * 0.45,
    height: 60,
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 32,
  },
  createButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
