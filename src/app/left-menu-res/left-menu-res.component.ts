import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PoliticianModel} from "../main/politician.model";
import {MainService} from "../main/main.service";
import {MatDialog} from "@angular/material/dialog";
import {PoliticianListService} from "../politicians-list/politician-list.service";

@Component({
  selector: 'app-left-menu-res',
  templateUrl: './left-menu-res.component.html',
  styleUrls: ['./left-menu-res.component.css']
})
export class LeftMenuResComponent implements OnInit {
  foundPoliticians: PoliticianModel[] | undefined;
  searchModel: any = {};
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;
  constructor(private mainService: MainService, private politicianListService: PoliticianListService, public dialog: MatDialog) { }

  ngOnInit(): void {}

  redirectToUserProfile() {
    this.mainService.redirectToUserProfile();
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
