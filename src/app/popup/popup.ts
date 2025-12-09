import { Component } from '@angular/core';
import { MatDialogClose, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef,MatDialogTitle } from "@angular/material/dialog";
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-popup',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogClose],
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

  //MAKE SURE YOU INJECT THESE TWO FOR EVERY POPUP
}
