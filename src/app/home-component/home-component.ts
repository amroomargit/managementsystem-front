import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { BackendService } from '../backend-service';
import { UserDTO } from '../models/user-dto';
import { Auth } from '../auth';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentPopup } from '../update-student-popup/update-student-popup';

@Component({
  selector: 'app-home-component',
  imports: [NgIf],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  public backendService = inject(BackendService);

  private auth = inject(Auth);
  user = signal<UserDTO | null>(null);


  ngOnInit(){
    this.user.set(this.auth.getUser()); //auth saved the user's info when we logged in (see auth.ts and login.ts), so we set the user signal here to that DTO
    const authUser = this.auth.getUser();
console.log('AUTH USER:', authUser);
this.user.set(authUser);

  }

  updateUserProfile(id:number,firstName:string,lastName:string,username:string){
    console.log('USER DTO:', username);
    const dialogRef = this.dialog.open(UpdateStudentPopup,{
      width:'600px',
      data:{
        id:id,
        firstName:firstName,
        lastName:lastName,
        username:username,
        action: 'Update User'
      }
    });
  }
}
