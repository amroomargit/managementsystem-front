import { Component, computed } from '@angular/core';
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
import { selectOption } from '../models/select-option';

type ActionConfig = {
    load:()=>void;
    source:()=>{id:number;name:string}[];
  };

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

  options = computed<selectOption[]>(()=>{
    return this.actionConfig[this.data.action]?.source() ?? [];
  });

  ngOnInit(){
    this.actionConfig[this.data.action]?.load();
  }

  /*Combining what we originally had for options and ngOnInit into one thing (go to enrollstudentincourse.ts to see what it looked like), and
  instead using options and ngOnInit just for initialization*/
  private readonly actionConfig: Record<string,ActionConfig>={
    'View Teachers Topics':{
      load: () =>
        this.backendService.loadAllTopicsTaughtByTeacher(this.data.id),
      source: () =>
        this.backendService.topics().map(t => ({
          id:t.id,
          name:t.name
        }))
    },
    'View Topics Students':{
      load: () =>
        this.backendService.loadAllStudentsTakingATopic(this.data.id),
      source: () =>
        this.backendService.students().map(s => ({
          id:s.id,
          name:`${s.firstName} ${s.lastName}`
        }))
    },
    'View Topics Teachers':{
      load: () =>
        this.backendService.loadAllTeachersTeachingATopic(this.data.id),
      source: () =>
        this.backendService.teachers().map(t => ({
          id:t.id,
          name:`${t.firstName} ${t.lastName}`
        }))
    }
  };

  closePopup(){
    this.dialogReference.close(null);
  }
}
