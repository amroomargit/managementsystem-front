import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Auth } from '../auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../popup/popup';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,
    RouterLinkWithHref,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  auth = inject(Auth);
  router = inject(Router);
  dialog = inject(MatDialog);

  signOut(){
    this.auth.logout();
  }
}
