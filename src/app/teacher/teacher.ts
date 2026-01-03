import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher',
  imports: [RouterOutlet,RouterLinkWithHref, RouterOutlet,
    RouterLinkWithHref,
    MatDialogModule,
    RouterLinkWithHref,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css',
})
export class Teacher {
  auth = inject(Auth);
  router = inject(Router);

  signOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
