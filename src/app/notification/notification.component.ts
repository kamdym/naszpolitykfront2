import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main/main.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private titleService:Title
  ) { this.titleService.setTitle("Nasz Polityk - Powiadomienia");}

  ngOnInit(): void {
  }

  redirectToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  logoutUser() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/home']);
  }

}
