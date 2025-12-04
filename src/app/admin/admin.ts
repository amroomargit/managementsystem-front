import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Auth } from '../auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  auth = inject(Auth);
  router = inject(Router);
  
  signOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
