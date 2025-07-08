// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// src/environments/environment.ts
export const environment = {
  production: true,
  firebase: {
    apiKey: '${FIREBASE_API_KEY}',
    authDomain: '${FIREBASE_AUTH_DOMAIN}',
    projectId: '${FIREBASE_PROJECT_ID}',
    storageBucket: '${FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${FIREBASE_APP_ID}'
  }
};
