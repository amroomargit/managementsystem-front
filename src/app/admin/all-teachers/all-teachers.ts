import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeacherDTO } from '../../models/teacher-dto';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';
import { EnrollInCoursePopup } from '../../enroll-in-course-popup/enroll-in-course-popup';
import { GridViewPopup } from '../../grid-view-popup/grid-view-popup';
import { BackendService } from '../../backend-service';
import { SimplifiedGridViewPopup } from '../../simplified-grid-view-popup/simplified-grid-view-popup';
import { Popup } from '../../popup/popup';
import { InsertStudentPopup } from '../../insert-student-popup/insert-student-popup';

@Component({
  selector: 'app-all-teachers',
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './all-teachers.html',
  styleUrl: './all-teachers.css',
})
export class AllTeachers {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  public backendService = inject(BackendService);

  public teachers: Observable<TeacherDTO[]> | null = null;

  ngOnInit(){
    this.backendService.loadAllTeachers();
  }

  updateTeacher(teacherId:number,firstName:string,lastName:string){
    const dialogRef = this.dialog.open(UpdateStudentPopup, {
      width:'600px',
      data:{
        id:teacherId,
        firstName:firstName,
        lastName:lastName,
        action: "Update Teacher"
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.backendService.loadAllTeachers();
    });
  }

  assignTeacherToTopic(teacherId:number){
    const dialogRef = this.dialog.open(EnrollInCoursePopup,{
      width:'600px',
      data:{
        teacherId:teacherId,
        action: "teacher topic assign",
        title: "Assign a Teacher to a Topic",
        label: "Topics"
      }
    });

     dialogRef.afterClosed().subscribe();
  }

  assignTeacherToCourse(teacherId:number){
    const dialogRef = this.dialog.open(EnrollInCoursePopup,{
      width:'600px',
      data:{
        teacherId:teacherId,
        action: "teacher course assign",
        label: "Courses",
        title: "Assign a Teacher to a Course"
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  viewTeachersCourses(teacherId:number){
    const dialogRef = this.dialog.open(GridViewPopup,{
      width:'1000px',
      data:{
        id:teacherId,
        title:`Courses Taught By Teacher Number: ${teacherId}`,
        action:"View Teachers Courses"
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  viewTeachersTopics(teacherId:number){
    const dialogRef = this.dialog.open(SimplifiedGridViewPopup,{ //make new popup
      width:'1000px',
      data:{
        id:teacherId,
        title:`Topics Teacher ${teacherId} is Eligible to Teach`,
        action: "View Teachers Topics"
      }
    });
    dialogRef.afterClosed().subscribe();
  }

  deleteTeacher(teacherId:number){
    const dialogRef = this.dialog.open(Popup,{
      width: '300px',
      data:{
        popupTitle:"Please Confirm.",
        popupMessage:`Would you like to delete the teacher with ID ${teacherId}`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === "Yes"){
        this.http.delete(`http://localhost:8081/teachers/delete-teacher/${teacherId}`,{responseType:'text'})
        .subscribe((response)=>{
          console.log("Deleted: ",response);
          this.backendService.loadAllTeachers();
        })
      }
    })
  }

  insertTeacher(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      width: '500px',
      data:{
        title: 'Enter Info for the New Teacher',
        action:'Insert Teacher'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.backendService.loadAllTeachers();
    });
  }
}
