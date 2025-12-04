import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-teacher',
  imports: [RouterOutlet,RouterLinkWithHref],
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
