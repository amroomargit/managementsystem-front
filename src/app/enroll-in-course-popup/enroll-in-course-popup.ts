import { Component, computed, effect, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student-service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../teacher-service';
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
  studentService = inject(StudentService);
  teacherService = inject(TeacherService);
  snackbar = inject(MatSnackBar);

  selectedIdFromHTML:number|null = null;

  //This lets us switch between the WritableSignals for courses, teachers, topics, etc. so that we can choose which one we want in the HTML with *ngFor
  //Read explanation in select-options.ts under models folder
  options = computed<selectOption[]>(() => {
  if (this.data.action === 'topic assign') {
    return this.teacherService.topics().map(t => ({
      id: t.id,
      name: t.name
    }));
  }

  return this.studentService.courses().map(c => ({
    id: c.id,
    name: c.name
  }));
});



  ngOnInit(){
    //Reset course list between each popup call (if we don't then it loads old lists for students who shouldn't have a list)
    this.studentService.resetCourseList();

    //Checks if we should loadAllCourses, loadAllTopics, etc. and which WritableSignal we wanna use in the HTML with *ngFor
    switch(this.data.action){

      case 'enroll':
        this.studentService.loadAllCourses();
        break;

        case 'unenroll':
        this.studentService.loadCoursesStudentIsEnrolledIn(this.data.studentNum);
        break;

        case 'topic assign':
        this.teacherService.loadAllTopics();
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
      case 'topic assign':
        this.teacherTopicAssign();
        break;
      default:
        console.log("The switch-case in confirm() in enroll-in-course-popup.ts did not work properly.");
    }
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

      const msg = error.error?.message || "An error occured"; //This is the message that will be displayed in snackbar

      /*Opens little notification at bottom of screen that displays the text included in msg variable defined above, and a button that
      says "Close"*/
      this.snackbar.open(msg, "Close", {
        duration:4000,
        panelClass:['snackbar-error']
      });
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
      }
    );
  }

  cancel(){
    this.dialogReference.close(null);
  }
}
