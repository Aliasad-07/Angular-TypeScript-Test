import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Application-wide configuration.
 * Registers routing, Firebase initialization, and Firestore.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Initialize Firebase with the project config from environment
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Provide Firestore instance for dependency injection
    provideFirestore(() => getFirestore())
  ]
};
