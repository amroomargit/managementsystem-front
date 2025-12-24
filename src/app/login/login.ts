import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private http = inject(HttpClient);
  public auth = inject(Auth);
  private router = inject(Router);


  login(){
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8081/users/login',body)
    .subscribe({
      next: (data: any) => {
        this.auth.saveToken(data.token);
        this.auth.setAuthenticatedUser(true);
        this.auth.setRole(data.role);
        this.auth.saveUser({
          id:data.id,
          username:data.username,
          firstName:data.firstName,
          lastName:data.lastName,
          role:data.role
        });

        console.log("login.ts Saved token: ", data.token);
        console.log("login.ts ID: ", data.id);

        console.log("login.ts User: ",this.auth.getAuthenticatedUser(), this.auth.getUser());

        //Navigate after clicking login button
        if(data.role === 'ROLE_ADMIN'){
          this.router.navigate(['/admin']);
        }
        else if (data.role === 'ROLE_TEACHER'){
          this.router.navigate(['/teacher']);
        }
        else if (data.role === 'ROLE_STUDENT'){
          this.router.navigate(['/student'])
        }

      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
