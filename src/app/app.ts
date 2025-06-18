import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'pco-boilerplate';

  permissions = inject(NgxPermissionsService);

  ngOnInit(): void {
    const roles = ['user:list', 'user:create', 'user:update', 'user:delete'];

    this.permissions.loadPermissions(roles);

    console.log('Permissions:', this.permissions.getPermissions());
  }
}
