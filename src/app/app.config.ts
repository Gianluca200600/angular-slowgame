import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "solos-3992b", appId: "1:1046795089589:web:987683d5924952258ef0fc", storageBucket: "solos-3992b.firebasestorage.app", apiKey: "AIzaSyDUJfOnmfCgu8rt2WYC68qCoRHOP4yk51k", authDomain: "solos-3992b.firebaseapp.com", messagingSenderId: "1046795089589", measurementId: "G-ZEXEMD6QJ4" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
