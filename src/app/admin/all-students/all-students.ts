import { Component, effect, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentDTO } from '../../models/student-dto';
import { inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Observable, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from '../../popup/popup';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';
import { InsertStudentPopup } from '../../insert-student-popup/insert-student-popup';
import { StudentService } from '../../student-service';

@Component({
  selector: 'app-all-students',
  imports: [NgIf,NgFor,CommonModule],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css',
})
export class AllStudents implements OnInit{
  private http = inject(HttpClient); //we use http to connect to the backend endpoints (like with postman)
  private dialog = inject(MatDialog);
  public studentService = inject(StudentService);

  public students: Observable<StudentDTO[]> | null = null;

  ngOnInit(){
    this.loadAllStudents();
  }

  loadAllStudents(){
    this.http.get<StudentDTO[]>('http://localhost:8081/students/all').subscribe({
      next:(data) => {
        this.studentService.studentChange.set(data);
        console.log(data);
      }
    });
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

    //Calling popup to ask user to confirm their option, among other things (read the notes left over there)
    const dialogReference2 = this.dialog.open(UpdateStudentPopup, {
      width: '500px',
      data:{
        id: studentId,
        firstName: firstName,
        lastName: lastName
      }
    });

    dialogReference2.afterClosed().subscribe(result => {
  this.loadAllStudents();
});

  }

  //If result is No, we just do nothing, and the popup closes by itself


  deleteStudent(studentId: number){
    const dialogReference = this.confirmationPopup(studentId,"delete");

    dialogReference.afterClosed().subscribe(result =>{
      console.log("User selected: ",result);

      if(result === "Yes"){
        this.http.delete(`http://localhost:8081/students/delete-student/${studentId}`,
          { responseType: 'text' }) //include this to return text
          .subscribe(response =>
          console.log("Deleted: ",response));
      }
    });
  }

  insertStudent(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      width: '500px',
      data:{

      }});
      dialogRef.afterClosed().subscribe(result =>{
        this.loadAllStudents();
      });
  }
}
