import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PoliticianModel} from "./politician.model";
import {MainService} from "./main.service";
import {CommentModel} from "./comment.model";
import {Title} from "@angular/platform-browser";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-main',
  templateUrl: './politician.component.html',
  styleUrls: ['./politician.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PoliticianComponent implements OnInit {

  politicianId = this.route.snapshot.params['politicianId'];
  politicianData: PoliticianModel | undefined;
  politicianPicture: any;
  politicianBirthDate: Date | undefined;
  politicianFirstName: string = "";
  politicianBirthPlace: string = "";
  politicianClubName: string = "";
  politicianLastName: string = "";
  politicianEducation: string = "";
  politicianExp: string = "";
  articleData: any | undefined;
  articleContent: any[] = [];
  commentData: CommentModel[] | undefined;
  commentContent: string = "";
  articleContentFlatted: any;
  commentId: number = 0;
  columnsToDisplay = ["title", "author", "createdDate"];
  expandedElement;
  totalElements = 0;
  size = 0;

  constructor(private titleService:Title,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {this.titleService.setTitle("Nasz Polityk");
  }

  ngOnInit(): void {
    //jak ktos wejdzie po prostu na glowna to niech ma domyslnie polityka o ID 1, bo taki byl zaplanowany flow aplikacji ze wchodzi na maina i tyle
    var url = this.router.url;
    if(url == "/main"){
      this.mainService.getPoliticianData(1).subscribe(
        response => {
          this.politicianData = response;
          this.mapPoliticianDataToProperties(this.politicianData);
        }, error => {
          console.log(error, 'error from server, while getting politician data')
        });
    } else {
      var parts = url.split("/");
      var politicianId = parts[parts.length - 1];
      this.mainService.getPoliticianData(politicianId).subscribe(
        response => {
          this.politicianData = response;
          this.mapPoliticianDataToProperties(this.politicianData);
        }, error => {
          console.log(error, 'error from server, while getting politician data')
        });
    }


    this.mainService.getArticles(0, 10, this.politicianId).subscribe(
      res => {
        this.articleData = res;
        this.articleContent = this.articleData.content;
        this.totalElements = this.articleData.totalElements;
        this.size = this.articleData.size;
        console.log(res);
        this.articleContentFlatted = this.articleContent;
      }, error => {
        console.log(error, "error while getting article content")
      }
    );
    this.mainService.getCommentsForArticle(2).subscribe(
      response => {
        this.commentData = response;
        this.commentContent = this.commentData[0].content;
        this.commentId = this.commentData[0].id;
      }, error => {
        console.log(error, "error while getting commments for article");
      }
    )
  }


  private mapPoliticianDataToProperties(politicianData: PoliticianModel) {
    console.log(politicianData);
    this.politicianPicture = politicianData.pictureURL;
    this.politicianBirthDate = politicianData.birthDate;
    this.politicianBirthPlace = politicianData.birthPlace;
    this.politicianClubName = politicianData.clubName;
    this.politicianExp = politicianData.experience;
    this.politicianFirstName = politicianData.firstName;
    this.politicianLastName = politicianData.lastName;
    this.politicianEducation = politicianData.education;
  }


  redirectToDiscussionByComment(articleId: number, commentId: number, content: string) {
    this.router.navigate(['/discuss', articleId, commentId]);
    localStorage.setItem('commentContent', String(content));
    localStorage.setItem('commentId', String(this.commentId));
  }

  redirectToUserProfile() {
    this.mainService.redirectToUserProfile();
  }

  logoutUser() {
    this.mainService.logoutUser();
  }

  toggle = true;
  status = 'Obserwujesz';

  followEnableDisable() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Obserwujesz' : 'Zaobserwuj';
  }

  changePage(event:PageEvent){
    this.mainService.getArticles(event.pageIndex, event.pageSize, this.politicianId).subscribe(
      res => {
        this.articleData = res;
        this.articleContent = this.articleData.content;
        this.totalElements = this.articleData.totalElements;
        this.size = this.articleData.size;
        console.log(res);
        this.articleContentFlatted = this.articleContent;
      }, error => {
        console.log(error, "error while getting article content")
      })

  }

  loadComments(id){
    this.mainService.getCommentsForArticle(id).subscribe(
      response => {
        this.commentData = response;
        this.commentContent = this.commentData[0].content;
        this.commentId = this.commentData[0].id;
      }, error => {
        console.log(error, "error while getting commments for article");
      }
    )
  }
  redirectToComment(commentId, articleId){
    console.log(commentId);
    console.log(articleId);
    this.router.navigate(['/discuss', articleId, commentId]);
  }

  getCommentColor(sentiment: number){
    if (sentiment == 0){
      return '#B31B1B';
    }
    if (sentiment == 2){
      return '#009C41';
    }
    return '#FFA800';
  }

}
