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
import { EnrollInCoursePopup } from '../../enroll-in-course-popup/enroll-in-course-popup';
import { GridViewPopup } from '../../grid-view-popup/grid-view-popup';


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
    this.studentService.loadAllStudents();
  }


  //If the user clicks the update button that we made in all-students.html, this method gets triggered
  updateStudent(studentId:number, firstName:string, lastName:string){

    //Calling popup to ask user to confirm their option, among other things (read the notes left over there)
    const dialogRef = this.dialog.open(UpdateStudentPopup, {
      width: '600px',
      data:{
        id: studentId,
        firstName: firstName,
        lastName: lastName,
        action: "student"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.studentService.loadAllStudents();
    });
  }

  insertStudent(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.studentService.loadAllStudents();
    });
  }

  enrollInCourse(studentId:number){
    const dialogRef = this.dialog.open(EnrollInCoursePopup,{
      width: '500px',
      data:{
        studentNum:studentId,
        action: "enroll",
        title: "Select a Course to Enroll" //Since we are using the same popup, we need to tell the html which method to call betwen enroll or unenroll
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //Gonna use the same popup component as enrollInCourse, but we're gonna call the unenroll() method instead of enroll() method
  unenrollInCourse(studentId:number){
    const dialogRef = this.dialog.open(EnrollInCoursePopup,{
      width: '500px',
      data:{
        studentNum:studentId,
        action: "unenroll", //Since we are using the same popup, we need to tell the html which method to call betwen enroll or unenroll
        title: "Select a Course to Unenroll"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewAllCourses(){
    const dialogRef = this.dialog.open(GridViewPopup,{
      width: '1000px',
      data:{
        title:"View All Courses" //Only reason we are sending data through is so we can set the title since this popup is highly reusable (it's literally just a grid that displays data)
      }
    });
  }


  /*The reason this method is coded different from the other ones that also use popups is because the other
  popups need specific fields, so they have their own popup tailored to their specific needs, but since this
  one just needs a confirmation of a Yes or No, I decided to make this popup reusable, to avoid having to code
  the exact same thing over again, since I'll probably come across other methods that also only need a
  basic Yes or No. Because of this, it can't have specific code in it, it needs to stay generic. The other
  popup components can have the code in the component instead of here because they only serve one purpose,
  but since other methods might also use this popup, the code needs to be specified here instead.*/
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
          .subscribe((response) =>
            {
              console.log("Deleted: ",response);
              this.studentService.loadAllStudents();
            });
            }
      }
    );
  }
}
