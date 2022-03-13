import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  model: any = {};
  tokenObject: any;
  token: any;
  apiUrl: string = environment.apiUrl + "login"

  constructor(private titleService:Title,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    this.titleService.setTitle("Nasz Polityk - Logowanie i Rejestracja");
  }

  ngOnInit() {}

  login() {
    if (!this.model.email || !this.model.password) {
      window.alert('Uzupełnij wszystkie pola!');
      return
    }
    let headers: HttpHeaders = new HttpHeaders().append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method");
    let options = {headers: headers}
    this.http.post<Observable<Object>>(this.apiUrl, {
      email: this.model.email,
      password: this.model.password
    }, options).subscribe(res => {
      this.tokenObject = res;
      localStorage.setItem('userEmail', this.model.email);
      this.token = this.tokenObject['token'];
      localStorage.setItem('token', this.token);
      this.router.navigate(['/main']);
    }, error => {
      window.alert('Błędne logowanie!');
      this.handleError(error);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
