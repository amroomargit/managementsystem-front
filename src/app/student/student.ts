import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student',
  imports: [RouterOutlet, RouterLinkWithHref],
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
