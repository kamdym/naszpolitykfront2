import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main/main.service";
import {DiscussService} from "./discuss.service";
import {CommentModel} from "../main/comment.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit {
  articleId = this.route.snapshot.params['id'];
  commentId = this.route.snapshot.params['id2'];
  article: any[] = [];
  public commentData: CommentModel[] | undefined;
  public commentContent
  public commentSentiment
  public commentsCount: number = 0;
  rootComment: any = {};
  commentsApiUrl: string = environment.apiUrl + "comments/";
  panelOpenState: boolean = false;
  public nestedComments: any[] = [];
  newCommentContent: string = "";
  headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));


  constructor(private titleService:Title,private router: Router, private route: ActivatedRoute, private discussService: DiscussService, private mainService: MainService, private http: HttpClient) {
    this.titleService.setTitle("Nasz Polityk - Strefa Dyskusji");
    // router.navigate(['discuss/' + route.snapshot.params['id']])
  }

  ngOnInit(): void {
    console.log(this.articleId);
    this.discussService.getArticleById(this.articleId).subscribe(res => {
      this.article.push(res);
    })
    this.loadComments()

  }
  loadComments() {
    console.log(this.commentId);
    console.log(localStorage.getItem('commentId'));
    this.discussService.getCommentsHierarchy(this.commentId)
      .subscribe(res => {
        const comments = res.filter(comment=>comment.parentId==Number(this.commentId))
        this.commentContent = res.find(comment=>comment.id==this.commentId)
        this.commentData = comments;
        this.commentsCount = comments.length;
      });
  }
  saveRootComment() {
    this.http.post<Observable<Object>>(this.commentsApiUrl, {
      content: this.rootComment.content,
      articleId: this.articleId,
      parentId: this.commentId,
    }, {
      headers: this.headers_object
    }).subscribe(res => {
      this.loadComments()
    }, err => {
      window.alert("Blad po stronie serwera - kod = " + err.status);
    })
  }


  getCommentsForCommentById(parentId: any) {
    if (this.panelOpenState) {
      this.discussService.getCommentsHierarchy(parentId)
        .subscribe(res => {
          this.nestedComments.push(res);
        });
    }
  }

  getNestedCommentsFromComponentVariable(comId: any) {
    let withDuplicates = this.nestedComments.flat().filter(el => el.parentId === comId);
    const uniqueValues = Array.from(new Set(withDuplicates.map(a => a.id)))
      .map(id => {
        return withDuplicates.find(a => a.id === id);
      })
    // console.log(uniqueValues);
    return uniqueValues;
  }

  sendReplayToNestedComment(parentId: number) {
    this.http.post<Observable<Object>>(this.commentsApiUrl, {
      content: this.newCommentContent,
      articleId: this.articleId,
      parentId: parentId
    }, {
      headers: this.headers_object
    }).subscribe()
    this.newCommentContent = "";
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
