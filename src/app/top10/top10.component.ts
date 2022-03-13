import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Top10Model} from "./top10.model";
import {Observable} from "rxjs";
import {PoliticianListService} from "../politicians-list/politician-list.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {
  url: string = environment.apiUrl + "articles/politician/top10";
  top10: Top10Model[] | undefined;
  constructor(private titleService:Title,
    private http: HttpClient,
    private router: Router,
    private politicianListService: PoliticianListService
  ) { this.titleService.setTitle("Nasz Polityk - Top 10 Miesiąca");}

  ngOnInit(): void {
    this.getTop10().subscribe(
      res =>{
      this.top10 = res;
    }, err => {
        console.log("Blad po stronie serwera",err);
      })
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

  getTop10(): Observable<Top10Model[]> {
    return this.http.get<Top10Model[]>(this.url);
}

  redirectToPoliticianProfile(politicianId: number) {
    this.politicianListService.redirectToPoliticianProfile(politicianId);
  }
}
