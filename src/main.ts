import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Hard-coded Firebase config
const firebaseConfig = environment.firebase;

const firebaseApp = initializeApp(firebaseConfig);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6LcWD4crAAAAAKLTwvEKfcCJoLaUh3QIMNzBogQv'),
  isTokenAutoRefreshEnabled: true
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error('Error bootstrapping application', err));
