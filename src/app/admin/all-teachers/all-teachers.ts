import { Component, inject } from '@angular/core';
import { TeacherService } from '../../teacher-service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeacherDTO } from '../../models/teacher-dto';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';

@Component({
  selector: 'app-all-teachers',
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './all-teachers.html',
  styleUrl: './all-teachers.css',
})
export class AllTeachers {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  public teacherService = inject(TeacherService);

  public teachers: Observable<TeacherDTO[]> | null = null;

  ngOnInit(){
    this.teacherService.loadAllTeachers();
  }

  updateTeacher(teacherId:number,firstName:string,lastName:string){
    const dialogRef = this.dialog.open(UpdateStudentPopup, {
      width:'600px',
      data:{
        id:teacherId,
        firstName:firstName,
        lastName:lastName,
        action: "teacher"
      }
    });

    dialogRef.afterClosed().subscribe(result=>{});
  }
}
