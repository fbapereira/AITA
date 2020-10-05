import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, EMPTY, iif, of, empty } from 'rxjs';
import { pluck, map, tap, switchMap, filter, catchError, mergeMap, shareReplay, first } from 'rxjs/operators';

import { Article } from '../article/article';
import { ArticleComment } from '../comment/article-comment';
import { SubReddit } from './sub-reddit';

import { ArticleService } from '../article/article.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  public subRedditName$ = new BehaviorSubject<string>('AmITheAsshole');
  private readonly redditUrl = environment.redditUrl;

  public subRedditInfo$: Observable<SubReddit> = this.subRedditName$.pipe(
    switchMap((subRedditName) => this.http.get(`${ this.redditUrl }/r/${ subRedditName }/about.json`).pipe(
      map((value: any) => value.data as SubReddit),
      catchError(() => of(null)),
    )),
  );

  constructor(
    private http: HttpClient,
  ) { }

  public changeSubReddit(subReddit: string) {
    this.subRedditName$.next(subReddit);
  }
}
