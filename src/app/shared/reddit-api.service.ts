import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { pluck, map, tap, switchMap, shareReplay} from 'rxjs/operators';

import { Article } from './article';
import { ArticleComment } from './article-comment';

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  public subRedditName$ = new BehaviorSubject<string>('AmITheAsshole');
  public limit$ = new BehaviorSubject<number>(5);
  private after$ = new BehaviorSubject<string>('');
  private after: string;

  public articles$: Observable<Article[]> = combineLatest([
    this.subRedditName$,
    this.limit$,
    this.after$,
  ]).pipe(
    tap(() => this.spinner.show()),
    switchMap(([ subRedditName, limit, after ]) => this.http.get(`https://www.reddit.com/r/${ subRedditName }.json?limit=${ limit - 1 }${ after ? '&after=' + after : ''}`)),
    pluck('data'),
    tap((data: any) => this.after = data.after),
    pluck('children'),
    map((data: any) => data.map((value) => value.data as Article)),
    tap(() => this.spinner.hide()),
  );

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) { }

  public changeLimits(newLimit: number) {
    this.limit$.next(newLimit);
    this.after$.next(this.after);
  }

  public changeSubReddit(subReddit: string) {
   this.after = '';
   this.subRedditName$.next(subReddit);
  }

  public next(): void {
    this.after$.next(this.after);
  }

  public getComments(articleId: string): Observable<ArticleComment[]> {
    alert('called');
    return this.subRedditName$.pipe(
      switchMap((subRedditName) => this.http.get(`https://www.reddit.com/r/${ subRedditName }/comments/${ articleId }.json`)),
      map((data: any[]) => data && data.length > 1 ? data[1] : data),
      pluck('data', 'children'),
      map((data: any[]) => data.map((value) => value.data as ArticleComment)),
    );
  }
}
