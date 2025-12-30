import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { BackendService } from '../../backend-service';
import { forkJoin, Observable } from 'rxjs';
import { TopicDTO } from '../../models/topic-dto';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';
import { Popup } from '../../popup/popup';
import { SimplifiedGridViewPopup } from '../../simplified-grid-view-popup/simplified-grid-view-popup';
import { InsertStudentPopup } from '../../insert-student-popup/insert-student-popup';
import { CourseDTO } from '../../models/course-dto';

@Component({
  selector: 'app-all-topics',
  imports: [NgFor, NgIf, CommonModule, MatDialogTitle],
  templateUrl: './all-topics.html',
  styleUrl: './all-topics.css',
})
export class AllTopics {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog)
  public backendService = inject(BackendService);

  public topics: Observable<TopicDTO[]> | null = null;

  ngOnInit(){
    this.backendService.loadAllTopics();
  }

  updateTopic(topicId:number, topicName:string){
    const dialogRef = this.dialog.open(UpdateStudentPopup,{
      data:{
        width:'500px',
        id:topicId,
        name:topicName,
        action: 'Update Topic'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.backendService.loadAllTopics();
    });
  }

  deleteTopic(topicId:number){
    const dialogRef = this.dialog.open(Popup,{
      width:'500px',
      data:{
        popupTitle:"Please Confirm",
        popupMessage: `Would you like to delete the student with ID ${topicId}?`
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result === "Yes"){
        this.http.delete<CourseDTO[]>(`http://localhost:8081/topics/delete-topic/${topicId}`)
        .subscribe((courses) =>
          {

            /*For every course that lost it's topic (which we know from the list of CourseDTOs that was returned from the backend after doing the topic delete)
            we need to update those courses, since in the real world, it would be impossible to teach a course that has no topic (though our code actually does
            allow this, it's for practicality reasons (we need to imagine how confused a user would be if they could see courses with no topic)*/
            const updateRequests = courses.map(course => this.http.put(`http://localhost:8081/courses/update-course/${course.id}`,course));

            //forkJoin helps us avoid racing by making it so that the courses and topics only reload after we finish with the updates
            forkJoin(updateRequests).subscribe(()=>{
              this.backendService.loadAllCourses();
              this.backendService.loadAllTopics();
            });
          });
        };
    });
  }

  getStudentsInTopic(topicId:number){
    const dialogRef = this.dialog.open(SimplifiedGridViewPopup,{
      data:{
        action:"View Topics Students",
        title:`Students Taking Topic ${topicId}`,
        id:topicId
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.backendService.loadAllTopics();
    });
  }

  getTeachersInTopic(topicId:number){
    const dialogRef = this.dialog.open(SimplifiedGridViewPopup,{
      data:{
        action:"View Topics Teachers",
        title:`Teachers Teaching Topic ${topicId}`,
        id:topicId
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.backendService.loadAllTopics();
    });
  }

  insertTopic(){
    const dialogRef = this.dialog.open(InsertStudentPopup,{
      data:{
        action:"Insert Topic",
        title:"Enter Info for the New Topic"
      }
    });

     dialogRef.afterClosed().subscribe(result=>{
      this.backendService.loadAllTopics();
    });
  }


}
