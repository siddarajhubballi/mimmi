import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  constructor(private http: HttpClient) { }

  registerUser(user1:any) {
      return this.http.post<any>(this._registerUrl, user1);
  }

  loginUser(user1:any) {
      return this.http.post<any>(this._loginUrl, user1);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }



}
