import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserProfileService} from "./user-profile.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  showChangePasswordForm: boolean = false;
  passwordText: any;
  passwordConfirmText: any;
  userEmail: string | null = ""
  userNameObject: any;
  userName: string = "";
  constructor(private titleService:Title,private http: HttpClient, private router: Router, private userProfileService: UserProfileService) {
    this.titleService.setTitle("Nasz Polityk - Twój Profil");
  }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
    this.userProfileService.getUserName(this.userEmail).subscribe(res => {
      this.userNameObject = res;
      this.userName = this.userNameObject.name;
    })

  }

  onSubmit(f: NgForm) {
    this.hideShowPasswordChangeForm();
    console.log('patch')
    console.log(f.value['password'])
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('userEmail'))
    this.userProfileService.changePassword(f.value['password']).subscribe(response=>console.log(response))
  }

  setShowChangePasswordFormOnClick() {
    this.showChangePasswordForm = true;
  }

  hideShowPasswordChangeForm() {
    this.showChangePasswordForm = false;
  }

  logoutUser() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail')
      this.router.navigate(['/home']);
    }
  }

  isLoggedOut() {
    return localStorage.getItem('token') === null;
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}

