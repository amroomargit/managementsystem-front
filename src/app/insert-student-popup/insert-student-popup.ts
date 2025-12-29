import { Component } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { BackendService } from '../backend-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-student-popup',
  standalone:true,
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    NgIf,
    NgFor,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './insert-student-popup.html',
  styleUrl: './insert-student-popup.css',
})
export class InsertStudentPopup {
  data = inject(MAT_DIALOG_DATA);
  newDialogReference = inject(MatDialogRef);
  http = inject(HttpClient);
  backendService = inject(BackendService);
  snackbar = inject(MatSnackBar)

  //initialize variables so we can tie whatever the user chooses in the HTML to these variables, then we can send them as a DTO (const formValues) to the backend
  username:string|null = null;
  password:string|null = null;
  firstName:string|null = null;
  lastName:string|null = null;


  courseName:string|null = null;
  topicName: string|null = null;
  topicId: number|null = null;
  teacherId: number|null = null;
  selectedStartDate!: Date;
  selectedStartTime!: string;
  selectedEndDate!: Date;
  selectedEndTime!: string;

  get localStartDateTime(): string{
    const date = this.selectedStartDate.toISOString().split('T')[0];
    return `${date}T${this.selectedStartTime}`;
  }

  get localEndDateTime(): string{
    const date = this.selectedEndDate.toISOString().split('T')[0];
    return `${date}T${this.selectedEndTime}`;
  }

  ngOnInit(){
    if(this.data.action === "Insert Course" || this.data.action === "Update Course"){
      this.backendService.loadAllTopics();
      this.backendService.loadAllTeachers();
    }
  }

  confirm(){
    if(this.data.action === "Insert Student" || this.data.action === "Insert Teacher"){
      this.submitNewStudent();
    }
    else if(this.data.action === "Insert Course"){
      this.submitNewCourse();
    }
    else if(this.data.action === "Update Course"){
      this.submitUpdatedCourse(this.data.id);
    }
    else if(this.data.action === "Insert Topic"){
      this.submitNewTopic();
    }
  }

  snackbarMessage(msg:string){
    this.snackbar.open(msg,"Close",{
      duration:10000,
      panelClass:['snackbar-error']
    })
  }

  submitNewStudent(){

    //This is the DTO that will be sent to the backend, this is just us assigning the values from here and mapping them to the names we want so the backend can read the DTO
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
    },
    error: (error) => {
      console.log("Error:", error);
    }
  });
  }

  submitNewCourse(){

    const formValues = {
      name:this.courseName,
      teacher:{
        id:this.teacherId
      },
      topic:{
        id:this.topicId
      },
      starttime:this.localStartDateTime,
      endtime:this.localEndDateTime
    };

    this.http.post(`http://localhost:8081/courses/insert-course`,formValues).subscribe({
      next: (response) => {
        this.newDialogReference.close({});
      },
      error: (error) => {
        this.snackbarMessage(error.error?.message);
        console.log(error);
      }
    });
  }

  submitUpdatedCourse(courseId:number){

    const formValues={
      starttime:this.localStartDateTime,
      endtime:this.localEndDateTime,
      teacher:{
        id:this.teacherId
      },
      topic:{
        id:this.topicId
      }
    }

    this.http.post(`http://localhost:8081/courses/update-course-info/${courseId}`,formValues).subscribe({
      next:(response)=>{
        this.newDialogReference.close({});
      },
      error: (error)=>{
        this.snackbarMessage(error.error?.message);
        console.log(error);
       }
    });
  }

  submitNewTopic(){
    const formValues = {
      name:this.topicName
    }
    this.http.post('http://localhost:8081/topics/insert-topic',formValues).subscribe({
      next:(response)=>{
        this.newDialogReference.close({});
      },
      error: (error) => {
        this.snackbarMessage(error.error?.message);
      }
    })
  }

  cancel(){
    this.newDialogReference.close(null);
  }

}
