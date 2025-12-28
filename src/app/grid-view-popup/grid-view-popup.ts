import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { BackendService} from '../backend-service';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-grid-view-popup',
  imports: [FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    NgFor,
    NgIf,
    MatSelectModule,
    MatSnackBarModule],
  templateUrl: './grid-view-popup.html',
  styleUrl: './grid-view-popup.css',
})
export class GridViewPopup {
  http = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);
  dialogReference = inject(DialogRef);
  backendService = inject(BackendService);
  snackbar = inject(MatSnackBar);

  ngOnInit(){
    if(this.data.action === 'All Courses in Database' ||
      this.data.action === 'View Teachers Courses'){
      this.backendService.resetCourseList();
    }
    else if(this.data.action === 'All Students in Course'){
      this.backendService.resetStudentList();
    }


    switch(this.data.action){
      case 'All Courses in Database':
        this.backendService.loadAllCourses();
        break;
      case 'View Teachers Courses':
        this.backendService.loadAllCoursesTaughtByTeacher(this.data.id);
        break;
      case 'All Students in Course':
        this.backendService.loadAllStudentsInACourse(this.data.id);
        break;
      default:
        console.log("The switch-case in ngOnInit() in grid-view-popup.ts did not work properly.");
    }
  }

  closePopup(){
    this.dialogReference.close(null);
  }
}
