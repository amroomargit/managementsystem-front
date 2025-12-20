import { Component, computed, effect, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend-service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { selectOption } from '../models/select-option';


@Component({
  selector: 'app-enroll-in-course-popup',
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    NgFor,
    MatSelectModule,
    MatSnackBarModule],
  templateUrl: './enroll-in-course-popup.html',
  styleUrl: './enroll-in-course-popup.css',
})
export class EnrollInCoursePopup {
  http = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);
  dialogReference = inject(MatDialogRef);
  backendService = inject(BackendService);
  snackbar = inject(MatSnackBar);

  selectedIdFromHTML:number|null = null;

  //This lets us switch between the WritableSignals for courses, teachers, topics, etc. so that we can choose which one we want in the HTML with *ngFor
  //Read explanation in select-options.ts under models folder
  options = computed<selectOption[]>(() => {

    switch(this.data.action){
      case 'teacher topic assign':
        return this.backendService.topics().map(t => ({
          id: t.id,
          name: t.name
        }));

      case 'enroll':
      case 'unenroll':
      case 'teacher course assign':
        return this.backendService.courses().map(c => ({
          id: c.id,
          name: c.name
        }));
      default:
        console.log("The switch-case in options variable in enroll-in-course-popup.ts did not work properly.");
        return [];
    }
  });



  ngOnInit(){
    //Reset course list between each popup call (if we don't then it loads old lists for students who shouldn't have a list)
    this.backendService.resetCourseList();

    //Checks if we should loadAllCourses, loadAllTopics, etc. and which WritableSignal we wanna use in the HTML with *ngFor
    switch(this.data.action){

      case 'enroll':
      case 'teacher course assign':
        this.backendService.loadAllCourses();
        break;

      case 'unenroll':
        this.backendService.loadCoursesStudentIsEnrolledIn(this.data.studentNum);
        break;

      case 'teacher topic assign':
        this.backendService.loadAllTopics();
        break;

      default:
        console.log("The switch-case in ngOnInit() in enroll-in-course-popup.ts did not work properly.");
    }
  }


  //The .html checks this method to see which popup to call

  /*Even though confirm() and ngOnInit() would be easy to combine into one method, we can't, because ngOnInit() runs immediately once the popup is
  initialized so that we can view the list of courses, topics, etc. during the popup, but confirm() is only triggered once the button in the
  popup is clicked, which happens at the end when the user has already selected their option. Basically they're like two events that happen
  at different times, and trigger different things.*/
  confirm(){
   switch(this.data.action){
      case 'enroll':
        this.enroll();
        break;
      case 'unenroll':
        this.unenroll();
        break;
      case 'teacher topic assign':
        this.teacherTopicAssign();
        break;
      case 'teacher course assign':
        this.teacherCourseAssign();
        break;
      default:
        console.log("The switch-case in confirm() in enroll-in-course-popup.ts did not work properly.");
    }
  }

  /*Opens little notification at bottom of screen that displays the text included in msg variable defined above, and a button that says "Close"*/
  snackbarMessage(msg:string){
        this.snackbar.open(msg,"Close",{
          duration:10000,
          panelClass:['snackbar-error']
        });
  }

  enroll(){
    this.http.patch(`http://localhost:8081/students/enroll-student-in-a-course/${this.data.studentNum}/${this.selectedIdFromHTML}`,{})
    .subscribe(
      (response) => {
        console.log(`Courses that student with id ${this.data.studentNum} is currently enrolled in: ${response}`);
        this.dialogReference.close({});
    },
      (error) => {
      console.log("Error: ",error);
      this.snackbarMessage(error.error?.message);
    }
  );
  }

  unenroll(){
    this.http.patch(`http://localhost:8081/students/drop-course/${this.data.studentNum}/${this.selectedIdFromHTML}`,{})
    .subscribe(
      (response) => {
        console.log("Console log response:",response);
        this.dialogReference.close({});
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  teacherTopicAssign(){
    this.http.post(`http://localhost:8081/teachers/${this.data.teacherId}/topics/${this.selectedIdFromHTML}`,{})
    .subscribe(
      (response) => {
        console.log("Console log: ",response);
        this.dialogReference.close({});
      },
      (error) => {
        console.log("Error: ",error);
        this.snackbarMessage(error.error?.message);
      }
    );
  }

  teacherCourseAssign(){
    this.http.post<{ message: string }>(`http://localhost:8081/teachers/assign-teacher-to-a-course/${this.data.teacherId}/${this.selectedIdFromHTML}`,{})
    .subscribe(
      (response) => {
         console.log("Console log: ",response);
         this.snackbarMessage(response.message);
         this.dialogReference.close({});
      },
      (error) =>
      {
        console.log("Error: ",error);
        this.snackbarMessage(error.error?.message);
      }
    );
  }

  cancel(){
    this.dialogReference.close(null);
  }
}
