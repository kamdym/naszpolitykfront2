import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getUserName(userName: any) {
    return this.http.get<Object>(this.apiUrl + 'registration/userName' + '?email=' + userName)
  }
  changePassword(password:string):Observable<Object>{
    window.alert('Twoje hasło zostało zmienione.')
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("userEmail")
    return this.http.patch<Object>(this.apiUrl + 'registration/change-password', {
      password: password,
      token: token,
      email: email
    },{headers:new HttpHeaders({"Authorization":`Bearer ${token}`})})
  }
}
