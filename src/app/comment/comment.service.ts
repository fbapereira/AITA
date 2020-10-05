import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleComment } from './article-comment';
import { switchMap, map, pluck } from 'rxjs/operators';
import { RedditApiService } from '../shared/reddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor (
    private http: HttpClient,
    private redditApiService: RedditApiService
  ) { }

  public getComments(articleId: string): Observable<ArticleComment[]> {
    return this.redditApiService.subRedditName$.pipe(
      switchMap((subRedditName) => this.http.get(`https://www.reddit.com/r/${ subRedditName }/comments/${ articleId }.json`)),
      map((data: any[]) => data && data.length > 1 ? data[1] : data),
      pluck('data', 'children'),
      map((data: any[]) => data.map((value) => value.data as ArticleComment)),
    );
  }
}
