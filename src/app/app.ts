import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

import { GlobalStore } from './core/store/global.store';
import { Notification } from './core/store/global.store.model';

@Component({
  selector: 'pco-root',
  imports: [RouterOutlet, RouterLink],
  providers: [GlobalStore],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'boilerplate';

  readonly permissions = inject(NgxPermissionsService);

  readonly store = inject(GlobalStore);

  ngOnInit(): void {
    this.setUserPermissions();
  }

  setUserPermissions() {
    const roles = ['user:list', 'user:create', 'user:update', 'user:delete'];

    this.permissions.loadPermissions(roles);

    // console.log('Permissions:', this.permissions.getPermissions());
  }

  /**
   * Example method to add a notification.
   * This can be called from a button click or any other event in the application.
   */
  addNotification() {
    const notification: Notification = { id: '1', message: 'Welcome to the application!', type: 'info' };

    this.store.setNotification(notification);
  }
}
