import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { App } from './app';

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
});
