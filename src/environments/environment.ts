import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpzLlEPWKJJMamLcvsrCHrloahOX61-y0",
  authDomain: "authoring-project.firebaseapp.com",
  projectId: "authoring-project",
  storageBucket: "authoring-project.firebasestorage.app",
  messagingSenderId: "827234552480",
  appId: "1:827234552480:web:616fa768e4cd465f2757c5",
  measurementId: "G-EC8QX27Q03"
};

export const environment = {
  production: false,
  firebase: firebaseConfig
};