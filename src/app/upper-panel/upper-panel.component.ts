import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main/main.service";

@Component({
  selector: 'app-upper-panel',
  templateUrl: './upper-panel.component.html',
  styleUrls: ['./upper-panel.component.css']
})
export class UpperPanelComponent implements OnInit {

  constructor(    private http: HttpClient,
                  private router: Router,
                  private route: ActivatedRoute,
                  private mainService: MainService) { }

  ngOnInit(): void {
  }

  redirectToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  logoutUser() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

}
