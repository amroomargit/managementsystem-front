import { Component } from '@angular/core';
import { MatDialogClose, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { inject } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [MatDialogClose, MatDialogContent, MatDialogActions],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  /*Retrieves data that we passed into the dialog when opening it, so the message passed to this.dialog.open in admin.ts
  will appear in the popup when we open it*/
  data = inject(MAT_DIALOG_DATA);

  /*Retrieves a reference to the dialog that is currently open, and controls the popup (think remote control), and with
  this, we can close the popup, or return values back to whoever opened it*/
  dialogRef = inject(MatDialogRef<Popup>);

}
