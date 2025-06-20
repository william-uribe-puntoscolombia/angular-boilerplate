import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NgxPermissionsModule } from 'ngx-permissions';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), // Ngrx Store DevTools configuration
  ],
};
