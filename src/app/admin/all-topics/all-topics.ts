import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { BackendService } from '../../backend-service';
import { Observable } from 'rxjs';
import { TopicDTO } from '../../models/topic-dto';
import { UpdateStudentPopup } from '../../update-student-popup/update-student-popup';
import { Popup } from '../../popup/popup';
import { SimplifiedGridViewPopup } from '../../simplified-grid-view-popup/simplified-grid-view-popup';
import { InsertStudentPopup } from '../../insert-student-popup/insert-student-popup';

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
        this.http.delete(`http://localhost:8081/teachers/delete-teacher/${topicId}`,{responseType:'text'})
        .subscribe((response) =>
          {
            this.backendService.loadAllTopics();
          });
        }
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
  }


}
