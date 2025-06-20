/**
 * Production environment configuration.
 */
import { withDevToolsStub } from '@angular-architects/ngrx-toolkit';

export const environment = {
  storeWithDevTools: withDevToolsStub, // Check Readme.md, NgRx/debug
};
