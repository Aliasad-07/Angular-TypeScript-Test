import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Application-wide configuration.
 * Registers routing, Firebase initialization, and Realtime Database.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Initialize Firebase with the project config from environment
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Provide Realtime Database instance for dependency injection
    provideDatabase(() => getDatabase())
  ]
};
