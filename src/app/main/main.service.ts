import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PoliticianModel} from "./politician.model";
import {HttpClient} from "@angular/common/http";
import {ArticleModel} from "./article.model";
import {CommentModel} from "./comment.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  politiciansApiUrl: string = environment.apiUrl + "politicians/";
  articleApiUrl: string = environment.apiUrl + "articles";
  commentsApiUrl: string = environment.apiUrl + "comments/";

  constructor(private http: HttpClient, private router: Router) {
  }

  getPoliticianData(politicianId: any): Observable<PoliticianModel> {
    return this.http.get<PoliticianModel>(this.politiciansApiUrl + politicianId)
  }

  getArticles(page: number, size: number, politicianId: number): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(this.articleApiUrl + '/page/' + politicianId + '?page=' + page + '&size=' + size);
  }

  getCommentsForArticle(articleId: number) {
    return this.http.get<CommentModel[]>(this.commentsApiUrl + articleId);
  }
  redirectToUserProfile(){
    this.router.navigate(['/user-profile']);
  }
  logoutUser() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/home']);
  }
}
