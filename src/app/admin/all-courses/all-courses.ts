import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { BackendService } from '../../backend-service';
import { Observable } from 'rxjs';
import { CourseDTO } from '../../models/course-dto';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { GridViewPopup } from '../../grid-view-popup/grid-view-popup';
import { Popup } from '../../popup/popup';
import { InsertStudentPopup } from '../../insert-student-popup/insert-student-popup';

@Component({
  selector: 'app-all-courses',
  imports: [NgFor, NgIf, CommonModule, MatDialogTitle],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.css',
})
export class AllCourses {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog)
  public backendService = inject(BackendService);

  public courses: Observable<CourseDTO[]> | null = null;

  ngOnInit(){
    this.backendService.loadAllCourses();
  }

  updateCourse(courseId:number){

  }

  deleteCourse(courseId:number){
    const dialogRef = this.dialog.open(Popup,{
      width: '500px',
      data:{
        id:courseId,
        popupTitle:"Please Confirm",
        popupMessage:`Would you like to delete course with ID ${courseId}?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "Yes"){
        this.http.delete(`http://localhost:8081/courses/delete-course/${courseId}`)
        .subscribe((response)=>{
          this.backendService.loadAllCourses();
        });
      }
    })
  }

  insertCourse(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      width:'1000px',
      data:{
        action:'Insert Course',
        title:'Enter Info for the New Course'
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.backendService.loadAllCourses();
    });
  }

  viewAllCourses(){
    const dialogRef = this.dialog.open(GridViewPopup,{
      width: '1000px',
      data:{
        action: "All Courses in Database",
        title:"View All Courses" //Only reason we are sending data through is so we can set the title since this popup is highly reusable (it's literally just a grid that displays data)
      }
    });
  }


}
