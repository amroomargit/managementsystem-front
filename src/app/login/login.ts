import { Component } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ){}

  login(){
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8081/users/login',body)
    .subscribe({
      next: (data: any) => {
        this.auth.saveToken(data.token);
        console.log("Saved token: ", data.token);

        this.testProtectedEndpoint();
      },
      error: () => {
        console.log("Invalid username or password.");
      }
    });
  }

  testProtectedEndpoint(){
    const token = this.auth.getToken;
    const headers = {'Authorization':'Bearer ${token}'};

    this.http.get("http://localhost:8081/teachers/courses-teacher/1",{ headers }).subscribe({
      next: (data) => console.log("Protected data:", data),
      error: (err) => console.log("Unauthorized:",err)
    });
  }
}
