import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentDTO } from '../../models/student-dto';
import { inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../popup/popup';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';

@Component({
  selector: 'app-all-students',
  imports: [NgIf,NgFor,CommonModule],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css',
})
export class AllStudents implements OnInit{
  private http = inject(HttpClient); //we use http to connect to the backend endpoints (like with postman)
  private dialog = inject(MatDialog);

  public students: Observable<StudentDTO[]> | null = null;

  ngOnInit(){
    this.loadAllStudents();
  }

  loadAllStudents(){
    this.students = this.http.get<StudentDTO[]>('http://localhost:8081/students/all');
  }

  //Method that triggers the popup (depends on popup.html and popup.ts that we created before)
  confirmationPopup(studentId:number, option:string){
      return this.dialog.open(Popup,{
        width: '300px',
        data: {popupTitle: "Please Confirm",
          popupMessage: `Would you like to ${option} the student with ID ${studentId}?`}
      });
    }

  //If the user clicks the update button that we made in all-students.html, this method gets triggered
  updateStudent(studentId:number, firstName:string, lastName:string){

    //Calling popup to ask user to confirm their option
    const dialogReference2 = this.dialog.open(UpdateStudentPopup, {
      width: '500px',
      data:{
        firstName: firstName,
        lastName: lastName
      }
    });

    /*After the popup is closed (which happens when one of the two options "Yes" or "No" is selected), then
    we record the result (which is returned to us by <button mat-button mat-dialog-close=" "></button> in
    popup.html*/
    dialogReference2.afterClosed().subscribe(formValues =>{
      //If the form has been filled with values
      if(formValues){
        console.log("Updating student with: ",formValues); //Just printing to the console which option the user chose

        //We send it to the backend endpoint as a JSON, and update the user
        this.http.put(`http://localhost:8081/students/update-student-info/${studentId}`,formValues)
        .subscribe(
          response => console.log("Updated!",response),
          error => console.log(`Error: ${error}`)
        )
      }
    });
  }
  //If result is No, we just do nothing, and the popup closes by itself


  deleteStudent(studentId: number){
    const dialogReference = this.confirmationPopup(studentId,"delete");

    dialogReference.afterClosed().subscribe(result =>{
      console.log("User selected: ",result);

      if(result === "Yes"){
        this.http.delete(`http://localhost:8081/students/delete-student/${studentId}`).subscribe(response =>
          console.log("Deleted: ",response));
      }
    });
  }
}
