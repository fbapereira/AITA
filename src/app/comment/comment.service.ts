import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleComment } from './article-comment';
import { switchMap, map, pluck } from 'rxjs/operators';
import { RedditApiService } from '../shared/reddit-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly redditUrl = environment.redditUrl;

  constructor (
    private http: HttpClient,
    private redditApiService: RedditApiService
  ) { }

  public getComments(articleId: string): Observable<ArticleComment[]> {
    return this.redditApiService.subRedditInfo$.pipe(
      switchMap((subRedditInfo) => this.http.get(`${ this.redditUrl }${ subRedditInfo.url }/comments/${ articleId }.json`)),
      map((data: any[]) => data && data.length > 1 ? data[1] : data),
      pluck('data', 'children'),
      map((data: any[]) => data.map((value) => value.data as ArticleComment)),
    );
  }
}
