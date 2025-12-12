import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

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
  http = inject(HttpClient);

  firstName:string = this.data.firstName;
  lastName:string = this.data.lastName;
  id:number = this.data.id;


  /*Assuming the user clicks the submit button after filling out the new first and last name, then upon the
  dialog closing, we will set the first and last names as what they entered*/

  submit(){ //Something about doing it all at once so it's synchronous and not racing to see who finishes first

    //JSON object with the new names recorded, which we will be sending to the backend using the code below
    const formValues = {
      firstName: this.firstName,
      lastName: this.lastName
    };

    //The reason we moved this here is to avoid racing/timing problems
    /* We send the JSON to the backend endpoint, and update the user simultaneously */
    this.http.put(`http://localhost:8081/students/update-student-info/${this.id}`,formValues)
    .subscribe(
      response =>{
        console.log("Updated!",response);
        this.newDialogReference.close({
          firstName: this.firstName,
          lastName: this.lastName
        });
      },
      error => {
        console.log(`Error: ${error}`);
      }
    );
  }


  //Assuming they click cancel, just do nothing
  cancel(){
    this.newDialogReference.close(null);
  }



}
