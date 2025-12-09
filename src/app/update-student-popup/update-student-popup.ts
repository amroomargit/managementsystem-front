import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-update-student-popup',
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatDialogTitle],
  templateUrl: './update-student-popup.html',
  styleUrl: './update-student-popup.css',
})
export class UpdateStudentPopup {
  data = inject(MAT_DIALOG_DATA); //Make sure you always inject these two for any popup
  newDialogReference = inject(MatDialogRef<UpdateStudentPopup>); //Make sure you always inject these two for any popup
  firstName = this.data.firstName;
  lastName = this.data.lastName;

  /*Assuming the user clicks the submit button after filling out the new first and last name, then upon the
  dialog closing, we will set the first and last names as what they entered*/
  submit(){
    this.newDialogReference.close({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  //Assuming they click cancel, just do nothing
  cancel(){
    this.newDialogReference.close(null);
  }

}
