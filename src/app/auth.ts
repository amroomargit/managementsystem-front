import { Injectable } from '@angular/core';
import { UserDTO } from './models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private token: string | null = null; //When we get tokens put them here
  private authenticatedUser: boolean = false; //Is user authenticated? (in case of a page reload where everything is lost to avoid logging in again)
  private role: string | null = null;
  private user: UserDTO | null = null;

  saveToken(token: string){
    sessionStorage.setItem('jwt',token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  clearToken(): void {
    sessionStorage.removeItem('jwt');
  }

  setAuthenticatedUser(authenticatedUser : boolean){
    this.authenticatedUser = authenticatedUser;
  }

  getAuthenticatedUser(): boolean{
    return this.authenticatedUser;
  }

  getRole(): string | null{
    return this.role;
  }

  setRole(role : string){
    this.role = role;
  }

  logout(){
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('user');
    this.setAuthenticatedUser(false);
  }

  saveUser(user:UserDTO){
    this.user = user;
    sessionStorage.setItem('user',JSON.stringify(user));
  }

  getUser(): UserDTO | null{
    if (this.user) return this.user;

    const stored = sessionStorage.getItem('user');
    return stored ? JSON.parse(stored):null;
  }

  clearUser(){
    this.user = null;
    sessionStorage.removeItem('user');
  }

}
