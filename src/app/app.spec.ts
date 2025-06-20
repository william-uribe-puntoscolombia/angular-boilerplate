import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { App } from './app';
import { Notification } from './core/store/global.store.model';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NgxPermissionsModule.forRoot(), RouterModule.forRoot([])],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load permissions on initialization', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    spyOn(app.permissions, 'loadPermissions').and.callThrough();
    spyOn(app.permissions, 'getPermissions').and.callThrough();

    app.ngOnInit();

    expect(app.permissions.loadPermissions).toHaveBeenCalledWith([
      'user:list',
      'user:create',
      'user:update',
      'user:delete',
    ]);
    expect(app.permissions.getPermissions).toHaveBeenCalled();
    console.log('Permissions loaded and retrieved successfully');
  });

  /**
   * Example method to add a notification.
   * This can be called from a button click or any other event in the application.
   */
  it('should add a notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const notification: Notification = { id: '1', message: 'Welcome to the application!', type: 'info' };
    spyOn(app.store, 'setNotification').and.callThrough();

    app.addNotification();

    expect(app.store.setNotification).toHaveBeenCalledWith(notification);
    console.log('Notification added:', notification);
  });
});
