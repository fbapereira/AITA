import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, map, pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { RedditApiService } from '../shared/reddit-api.service';

import { ArticleComment } from './article-comment';

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
