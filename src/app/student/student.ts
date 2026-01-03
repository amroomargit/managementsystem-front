import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-student',
  imports: [
    RouterOutlet,
    RouterLinkWithHref,
    MatDialogModule,
    RouterLinkWithHref,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './student.html',
  styleUrl: './student.css',
})

export class Student {
  auth = inject(Auth);
  router = inject(Router);
  dialog = inject(MatDialog);

  signOut(){
    this.auth.logout();
  }
}
