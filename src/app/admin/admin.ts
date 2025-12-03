import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
