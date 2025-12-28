import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-student-popup',
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    NgIf
  ],
  templateUrl: './update-student-popup.html',
  styleUrl: './update-student-popup.css',
})
export class UpdateStudentPopup {
  data = inject(MAT_DIALOG_DATA); //Make sure you always inject these two for any popup
  newDialogReference = inject(MatDialogRef<UpdateStudentPopup>); //Make sure you always inject these two for any popup
  http = inject(HttpClient);

  password = '';
  firstName = '';
  lastName = '';
  id!: number;

  ngOnInit() {
  this.id = this.data.id;
  this.firstName = this.data?.firstName ?? '';
  this.lastName = this.data?.lastName ?? '';
  }


  confirm(){
    if(this.data.action === "Update Student"){
      this.submitStudent();
    }
    else if(this. data.action === "Update Teacher"){
      this.submitTeacher();
    }
    else if(this.data.action === "Update User"){
      this.submitUser();
    }
    else if(this.data.action === "Update Topic"){
      this.submitTopic();
    }
  }

  /*Assuming the user clicks the submit button after filling out the new first and last name, then upon the
  dialog closing, we will set the first and last names as what they entered*/

  submitStudent(){ //Something about doing it all at once so it's synchronous and not racing to see who finishes first

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

  submitTeacher(){

    const formValues = {
    firstName: this.firstName,
    lastName: this.lastName
  };

     this.http.put(`http://localhost:8081/teachers/update-teacher-info/${this.id}`,formValues)
     .subscribe(
      response => {
        console.log("Updated!",response);
        this.newDialogReference.close({
          firstName: this.firstName,
          lastName: this.lastName
        });
      },
      error => {
        console.log(`Error: ${error}`);
      }
     )
  }

  submitUser(){
    const formValues = {
      firstName:this.firstName,
      lastName:this.lastName,
      password:this.password
    }
    this.http.put(`http://localhost:8081/users/update-profile/${this.id}`,formValues)
    .subscribe(
      (response)=>{
        console.log("update-student-popup.ts, firstname and lastname entered into popup: ",this.firstName,this.lastName);
        this.newDialogReference.close({
          firstName:this.firstName,
          lastName:this.lastName,
          password:this.password
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  submitTopic(){
    const formValues = {
      name:this.firstName
    }
    this.http.put(`http://localhost:8081/topics/update-topic-info/${this.id}`,formValues)
    .subscribe(
      (response)=>{
        this.newDialogReference.close({
          name:this.firstName
        });
      },
      error =>{
        console.log(error);
      }
    )
  }


  //Assuming they click cancel, just do nothing
  cancel(){
    this.newDialogReference.close(null);
  }
}
