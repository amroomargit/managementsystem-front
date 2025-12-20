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
  selector: 'app-simplified-grid-view-popup',
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
  templateUrl: './simplified-grid-view-popup.html',
  styleUrl: './simplified-grid-view-popup.css',
})
export class SimplifiedGridViewPopup {
  http = inject(HttpClient);
  data = inject(MAT_DIALOG_DATA);
  dialogReference = inject(DialogRef);
  backendService = inject(BackendService);
  snackbar = inject(MatSnackBar);

  ngOnInit(){
    this.backendService.resetTopicList();

    switch(this.data.action){
      case 'View Teachers Topics':
        this.backendService.loadAllTopicsTaughtByTeacher(this.data.id);
        break;
      default:
        console.log("The switch-case in ngOnInit() in simplified-grid-view-popup.ts did not work properly.");
    }
  }

  closePopup(){
    this.dialogReference.close(null);
  }
}
