// src/authConfig.js

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