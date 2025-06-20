import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { App } from './app';
import { Notification } from './core/store/global.store.model';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NgxPermissionsModule.forRoot(), RouterModule.forRoot([])],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call setUserPermissions on initialization', () => {
    spyOn(app, 'setUserPermissions').and.callThrough();

    app.ngOnInit();

    expect(app.setUserPermissions).toHaveBeenCalled();
  });

  it('should load user permissions in setUserPermissions', () => {
    spyOn(app.permissions, 'loadPermissions').and.callThrough();
    spyOn(app.permissions, 'getPermissions').and.callThrough();

    app.setUserPermissions();

    expect(app.permissions.loadPermissions).toHaveBeenCalledWith([
      'user:list',
      'user:create',
      'user:update',
      'user:delete',
    ]);

    expect(app.permissions.getPermissions()).toEqual({
      'user:list': { name: 'user:list' },
      'user:create': { name: 'user:create' },
      'user:update': { name: 'user:update' },
      'user:delete': { name: 'user:delete' },
    });
  });

  /**
   * Example method to add a notification.
   * This can be called from a button click or any other event in the application.
   */
  it('should add a notification', () => {
    const notification: Notification = { id: '1', message: 'Welcome to the application!', type: 'info' };
    spyOn(app.store, 'setNotification').and.callThrough();

    app.addNotification();

    expect(app.store.setNotification).toHaveBeenCalledWith(notification);
  });
});
