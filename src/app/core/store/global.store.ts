/**
 * Global state management using NgRx Signals.
 *
 * This store manages the global state of the application, such as menu visibility and notifications.
 * It uses NgRx Signals for reactive state management and includes computed properties and methods to update the state.
 *
 * Example usage in a component:
 *
 * ```html
 * <p>{{ store.notificationCount() }}</p>
 * ```
 *
 * ```typescript
 * readonly store = inject(GlobalStore);
 * constructor() {
 *   this.store.setNotification({ message: 'New notification', type: 'info' });
 * }
 * ```
 */

import { computed } from '@angular/core';
import { updateState, withStorageSync } from '@angular-architects/ngrx-toolkit';
import { environment } from '@env';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { GlobalState, Notification } from './global.store.model';

// Initial state of the global store
const initialState: GlobalState = {
  notifications: [],
};

/**
 * Signal store to manage the global state of the application.
 */
export const GlobalStore = signalStore(
  { providedIn: 'root' }, // Makes the store globally available in the application

  /**
   * Enables state persistence using localStorage.
   * More info: https://ngrx-toolkit.angulararchitects.io/docs/with-storage-sync
   */
  withStorageSync({
    key: 'pco-shell-globalState', // Key for localStorage
    storage: () => localStorage, // Uses localStorage for synchronization
  }),

  // Enables NgRx DevTools for debugging state changes
  environment.storeWithDevTools('global'),

  // Defines the initial state
  withState(initialState),

  /**
   * Defines computed properties based on the state.
   */
  withComputed((store) => ({
    notificationCount: computed(() => store.notifications().length), // Number of notifications
    // ... Additional computed properties can be added as needed
  })),

  /**
   * Methods to update the state.
   */
  withMethods((store) => ({
    /**
     * Adds a new notification to the state.
     * @param notification Notification to add
     */
    setNotification(notification: Notification): void {
      updateState(store, '[global] setNotification - add notification1', (state) => ({
        notifications: [...state.notifications, notification],
      }));
    },
    // ... Additional methods can be added as needed
  }))
);
