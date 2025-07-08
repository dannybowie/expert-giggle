// Production environment configuration
// These values will be replaced during the build process via GitHub Actions
export const environment = {
  production: true,
  firebase: {
    apiKey: 'FIREBASE_API_KEY_PLACEHOLDER',
    authDomain: 'FIREBASE_AUTH_DOMAIN_PLACEHOLDER',
    projectId: 'FIREBASE_PROJECT_ID_PLACEHOLDER', 
    storageBucket: 'FIREBASE_STORAGE_BUCKET_PLACEHOLDER',
    messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER',
    appId: 'FIREBASE_APP_ID_PLACEHOLDER'
  }
};
