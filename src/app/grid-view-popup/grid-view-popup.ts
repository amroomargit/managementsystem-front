import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../student-service';
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
  studentService = inject(StudentService);

  //For now, since this is all we are using this popup for, we don't need anything else
  ngOnInit(){
    this.studentService.loadAllCourses();
  }

  closePopup(){
    this.dialogReference.close(null);
  }
}
