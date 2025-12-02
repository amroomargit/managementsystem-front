import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private token: string | null = null; //When we get tokens put them here

  saveToken(token: string){
    localStorage.setItem('jwt',token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  clearToken(): void {
    localStorage.removeItem('jwt');
  }
}
