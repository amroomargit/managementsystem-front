import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private token: string | null = null; //When we get tokens put them here
  private authenticatedUser: boolean = false; //Is user authenticated? (in case of a page reload where everything is lost to avoid logging in again)
  private firstName: string | null = null;
  private lastName: string | null = null;
  private role: string | null = null;


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

  setFirstName(firstName:string){
    this.firstName = firstName;
  }

  getFirstName(): string | null{
    return this.firstName;
  }

  setLastName(lastName:string){
    this.lastName = lastName;
  }

  getLastName(): string | null{
    return this.lastName;
  }

  setRole(role:string){
    this.role = role;
  }

  getRole(): string | null{
    return this.role;
  }

}
