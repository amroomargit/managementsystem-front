import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-student',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './student.html',
  styleUrl: './student.css',
})

export class Student {
  auth = inject(Auth);
  router = inject(Router);

  signOut(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
