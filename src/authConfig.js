// src/authConfig.js

export const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000'   // Android emulator → host machine; change to localhost:5000 for iOS simulator
  : 'https://weanaapp.confitechone.com';

export const config = {
  issuer: 'https://identity.confitechone.com/realms/weana',

  clientId: 'flutter-app',

  redirectUrl: 'com.example.weanaapp://oauth2redirect',

  scopes: ['openid', 'profile', 'email'],

  serviceConfiguration: {
    authorizationEndpoint:
      'https://identity.confitechone.com/realms/weana/protocol/openid-connect/auth',

    tokenEndpoint:
      'https://identity.confitechone.com/realms/weana/protocol/openid-connect/token',

    revocationEndpoint:
      'https://identity.confitechone.com/realms/weana/protocol/openid-connect/logout',
  },
};