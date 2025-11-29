import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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

  constructor(private http: HttpClient, private router: Router){}

  login(){
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8081/users/login',body)
    .subscribe({
      next: (response: any) => {
        console.log("Success");
        alert("Success")
        localStorage.setItem('token',response.token); //Store token
        /*this.router.navigate(['/dashboard']);*/
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
