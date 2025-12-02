import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private token: string | null = null; //When we get tokens put them here
  private authenticatedUser: boolean = false; //Variable holding whether user was authenticated or not (in case of a page reload where everything is lost to avoid logging in again)


  saveToken(token: string){
    localStorage.setItem('jwt',token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  clearToken(): void {
    localStorage.removeItem('jwt');
  }

  setAuthenticatedUser(authenticatedUser : boolean){
    this.authenticatedUser = authenticatedUser;
  }

  getAuthenticatedUser(): boolean{
    return this.authenticatedUser;
  }

  setFirstname(){
  }

}
