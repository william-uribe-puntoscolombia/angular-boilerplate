/**
 * Global state management for the application.
 */

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export interface GlobalState {
  notifications: Notification[];
}
