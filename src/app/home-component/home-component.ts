import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { BackendService } from '../backend-service';
import { UserDTO } from '../models/user-dto';
import { Auth } from '../auth';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentPopup } from '../update-student-popup/update-student-popup';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home-component',
  imports: [ MatCardModule,
    MatButtonModule,
    NgIf],
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
  }

  updateUserProfile(id:number,firstName:string,lastName:string){
    const dialogRef = this.dialog.open(UpdateStudentPopup,{
      width:'600px',
      data:{
        id:id,
        firstName:firstName,
        lastName:lastName,
        action: 'Update User'
      }
    });

    /*Using the popup above, we made changes and saved them to the database, so that's done with. However, to reflect the changes we made
    to the homescreen, we have to update auth, which is still running on the old values, since it saves whatever we entered when we logged in
    initially, not what is in the database. So, what we will so is that we will pull the current values in the auth, then we will resave
    those values (so that we can save the old username, which never changes), but overwrite the firstName, lastName, and password so that
    they are updated to what we currently have in the database, based on what we entered into the popup*/
    dialogRef.afterClosed().subscribe(result => {
      const currentUser = this.auth.getUser(); //Old values from auth

      if (!currentUser) return; //if there is no currentUser, return

      const updatedUser: UserDTO = {
        ...currentUser, //Old values (basically we only need username from this)
        firstName: result.firstName, //But change the firstName
        lastName: result.lastName, //But change the lastName
        /*As you may have noticed, password isn't updated, but that's because password is never saved in the UserDTO that exists in the frontend,
        or the auth in the frontend either, because that would be a security violation. So you may wonder how we are updating the password in
        the popup, that is because we are sending a DTO from the frontend to the backend, which recieves the data and updates the database.
        So technically, the password exists in the frontend only in this instance based on what the person enters into the popup, also
        this is where we WOULD have saved the password, but since we don't want it to exist in the frontend, we won't save it, and the password
        will be forgotten IN THE FRONTEND (it's already been saved to the backend) after this dialog closes.*/
      };

      this.auth.saveUser(updatedUser);
      this.user.set(updatedUser);
    });
  }
}
