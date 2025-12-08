import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-student-popup',
  imports: [FormsModule],
  templateUrl: './update-student-popup.html',
  styleUrl: './update-student-popup.css',
})
export class UpdateStudentPopup {

  firstName: string = '';
  lastName: string = '';

  newDialogReference = inject(MatDialogRef<UpdateStudentPopup>);

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
