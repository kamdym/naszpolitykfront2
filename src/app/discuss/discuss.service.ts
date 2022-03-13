import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ArticleModel} from "../main/article.model";
import {CommentModel} from "../main/comment.model";

@Injectable({
  providedIn: 'root'
})
export class DiscussService {
  articleApiUrl: string = environment.apiUrl + "articles/";
  commentsApiUrl: string = environment.apiUrl + "comments";

  constructor(private http: HttpClient) {
  }

  getArticleById(articleId: number): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(this.articleApiUrl + articleId);
  }

  getCommentsHierarchy(commentId: any | null): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(this.commentsApiUrl + '?parentId=' + commentId);
  }
}
