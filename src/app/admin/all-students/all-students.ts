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
    this.http.get<StudentDTO[]>('http://localhost:8081/students/all') //Sends HTTP get request to backend, expects a list of StudentDTOs to be returned (in .ts there is no List<>, we use array [])
    .subscribe({ //When backend responds, run the function below
      next:(data) => { //data is the array of students we recieved from the backend
        this.studentService.studentChange.set(data); //We are calling .set() on a WritableSignal (named studentChange, imported from student-service.ts), and passing through our data (the array of students), which updates its value
        console.log(data); //This is just returning the array to the console so we can check that it actually did pass through
      }
      /*Doing it this way solved the ExpressionChangedAfterItHasBeenCheckedError because before we were using
      Observable + async pipe + late update inside lifecycle, but now we are using Signals + .set() from HTTP response*/
    });
  }

  //If the user clicks the update button that we made in all-students.html, this method gets triggered
  updateStudent(studentId:number, firstName:string, lastName:string){

    //Calling popup to ask user to confirm their option, among other things (read the notes left over there)
    const dialogRef = this.dialog.open(UpdateStudentPopup, {
      width: '500px',
      data:{
        id: studentId,
        firstName: firstName,
        lastName: lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllStudents();
    });
  }


  /*The logic for this method and it's popup are just coded a different way but are the same idea (except)
  for the fact that it's just a simple yes or no instead of a popup that takes fields*/
  deleteStudent(studentId: number){
    const dialogRef = this.dialog.open(Popup,{
      width: '300px',
      data: {
        popupTitle: "Please Confirm",
        popupMessage: `Would you like to delete the student with ID ${studentId}?`
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log("User selected: ",result);

      if(result === "Yes"){
        this.http.delete(`http://localhost:8081/students/delete-student/${studentId}`,{responseType: 'text'}) //include this to return text
          .subscribe(response =>
            console.log("Deleted: ",response));
      }
      this.loadAllStudents();
    });
  }

  insertStudent(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.loadAllStudents();
    });
  }
}
