import { Component } from '@angular/core';
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
  snackbar = inject(MatSnackBar);

  selectedCourseId:number|null = null;

  ngOnInit(){
    this.studentService.loadAllCourses();
  }

  enroll(){
    this.http.patch(`http://localhost:8081/students/enroll-student-in-a-course/${this.data.studentNum}/${this.selectedCourseId}`,{})
    .subscribe(
      (response) => {
        console.log(`Courses that student with id ${this.data.studentNum} is currently enrolled in: ${response}`)
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
      })
    }
  );
  }

  cancel(){
    this.dialogReference.close(null);
  }
}
