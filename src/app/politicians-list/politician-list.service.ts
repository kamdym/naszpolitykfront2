import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PoliticianModel} from "../main/politician.model";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class PoliticianListService {
  politiciansApiUrl: string = environment.apiUrl + "politicians/";
  constructor(private http: HttpClient, private router: Router,public dialog: MatDialog) { }

  getPoliticiansList(): Observable<PoliticianModel[]> {
    return this.http.get<PoliticianModel[]>(this.politiciansApiUrl + "fetchAll")
  }

  redirectToPoliticianProfile(id: number) {
    this.router.navigate(['/politician/' + id]);
  }
  redirectToPoliticianProfileAndCloseDialog(id:number){
    this.dialog.closeAll();
    this.router.navigate(['/politician/' + id]);
  }

  searchPolitician(surname: string) {
    return this.http.get<PoliticianModel[]>(this.politiciansApiUrl + "search/" + surname);
  }
}
