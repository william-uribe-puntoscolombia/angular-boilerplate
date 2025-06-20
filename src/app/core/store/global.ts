/**
 * Global state management using NgRx Signals.
 *
 * This store manages the global state of the application, such as menu visibility and loading status.
 * It uses NgRx Signals for reactive state management and includes computed properties and methods for state updates.
 *
 * Example usage in a component:
 *
 * ```html
 * <p>{{ store.isMenuVisible() }}</p>
 * ```
 *
 * ```typescript
 * readonly store = inject(GlobalStore);
 * constructor() {
 *   this.store.toggleMenu('Sample query');
 * }
 * ```
 */

import { computed } from '@angular/core';
import { updateState, withGlitchTracking } from '@angular-architects/ngrx-toolkit';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { environment } from '@env';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

// Define the shape of the global state
export interface GlobalState {
  notifications: Notification[];
}

// Define the initial state of the global store
const initialState: GlobalState = {
  notifications: [],
};

/**
 * Signal store for managing global application state.
 */
export const GlobalStore = signalStore(
  { providedIn: 'root' }, // Makes the store available globally in the application

  // Enable NgRx DevTools for debugging state changes
  environment.storeWithDevTools('global', withGlitchTracking()),

  // Define the initial state
  withState(initialState),

  /**
   * Define computed properties based on the state
   */
  withComputed((store) => ({
    notificationCount: computed(() => store.notifications().length),
    // ... More computed properties can be added here as needed
  })),

  /**
   * Methods for updating the state.
   */
  withMethods((store) => ({
    setNotification(notification: Notification): void {
      // update the state
      updateState(store, '[global] setNotification - add a notification', (state) => ({
        notifications: [...state.notifications, notification],
      }));
    },
    // ... More methods can be added here as needed
  }))
);
