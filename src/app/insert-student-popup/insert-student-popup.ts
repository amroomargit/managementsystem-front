import { Component } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insert-student-popup',
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatDialogTitle],
  templateUrl: './insert-student-popup.html',
  styleUrl: './insert-student-popup.css',
})
export class InsertStudentPopup {
  data = inject(MAT_DIALOG_DATA);
  newDialogReference = inject(MatDialogRef);
  http = inject(HttpClient);

  username:string|null = null;
  password:string|null = null;
  firstName:string|null = null;
  lastName:string|null = null;

  submit(){

    //Set the first and last names to be whatever the user entered into the form in the popup
    const formValues = {
      username:this.username,
      password:this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }

    const baseURL = 'http://localhost:8081';

    const endpoint = this.data.action === 'Insert Student' ? '/students/insert-student' : '/teachers/insert-teacher';

    this.http.post(`${baseURL}${endpoint}`,formValues).subscribe({
    next: (response) => {
      console.log("Entity Added.", response);

      this.newDialogReference.close({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
    },
    error: (error) => {
      console.log("Error:", error);
    }
  });
  }

  cancel(){
    this.newDialogReference.close(null);
  }

}
