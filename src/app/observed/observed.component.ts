import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main/main.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-observed',
  templateUrl: './observed.component.html',
  styleUrls: ['./observed.component.css']
})
export class ObservedComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private titleService:Title
  ) { this.titleService.setTitle("Nasz Polityk - Obserwowani");}

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
