import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MainService} from "../main/main.service";
import {PoliticianListService} from "./politician-list.service";
import {PoliticianModel} from "../main/politician.model";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-politicians-list',
  templateUrl: './politicians-list.component.html',
  styleUrls: ['./politicians-list.component.css']
})
export class PoliticiansListComponent implements OnInit {
  politicianList: PoliticianModel[] | undefined;
  foundPoliticians: PoliticianModel[] | undefined;
  searchModel: any = {};
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  constructor(private titleService:Title,private mainService: MainService, private politicianListService: PoliticianListService, public dialog: MatDialog) {
    this.titleService.setTitle("Nasz Polityk - Lista Polityków");
  }

  ngOnInit(): void {
    this.politicianListService.getPoliticiansList().subscribe(
      res => {
        this.politicianList = res;
      }, err => {
        console.log(err, 'blad po stronie serwera')
      }
    )
  }

  logoutUser() {
    this.mainService.logoutUser();
  }

  redirectToUserProfile() {
    this.mainService.redirectToUserProfile();
  }

  redirectToPoliticianProfile(id: number){
   this.politicianListService.redirectToPoliticianProfile(id);
  }
  redirectToPoliticianProfileAndCloseDialog(id:number){
    this.politicianListService.redirectToPoliticianProfileAndCloseDialog(id);
  }


  searchPolitician() {
    this.politicianListService.searchPolitician(this.searchModel.surname).subscribe(
      res => {
        this.foundPoliticians = res;
      }, err => {
        console.log(err, 'blad po stronie serwera');
      }, () => {
        const numberOfPoliticiansFound = this.foundPoliticians?.length;
        // @ts-ignore
        if(numberOfPoliticiansFound > 1){
          this.openTempDialog(this.foundPoliticians);
          } else if (numberOfPoliticiansFound === 0) {
            window.alert("Nie znaleziono polityka o takim nazwisku")
        } else {
          // @ts-ignore
          this.politicianListService.redirectToPoliticianProfile(this.foundPoliticians[0].id);
        }
      }
    )
  }

  openTempDialog(foundPoliticians: PoliticianModel[] | undefined) {
    const myTempDialog = this.dialog.open(this.dialogRef, { data: foundPoliticians });
    myTempDialog.afterClosed().subscribe((res) => {
    });
  }

}
