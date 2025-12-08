import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Auth } from '../auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../popup/popup';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  auth = inject(Auth);
  router = inject(Router);
  dialog = inject(MatDialog);

  signOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  /*This is a method that opens the dialog*/
  openPopup(){
    //this.dialog.open calls Angular's Material MatDialog service creates the popup window and shows it on screen
    this.dialog.open(Popup,{
      width: '300px', //popup box size
      data: {popupTitle: "Popup Example",
        popupMessage: "Are you sure?"} //This is the data variable that is sent to popup.html's mat-dialog-content
    });
  }
}
