import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, EMPTY, iif, of, empty } from 'rxjs';
import { pluck, map, tap, switchMap, filter, catchError, mergeMap, shareReplay, first } from 'rxjs/operators';

import { Article } from './article';
import { ArticleComment } from './article-comment';
import { SubReddit } from './sub-reddit';

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  public subRedditName$ = new BehaviorSubject<string>('AmITheAsshole');
  public limit$ = new BehaviorSubject<number>(5);
  private pagination$ = new BehaviorSubject<number>(0);
  private paginationIndex: string;


  public subRedditInfo$: Observable<SubReddit> = this.subRedditName$.pipe(
    switchMap((subRedditName) => this.http.get(`https://www.reddit.com/r/${ subRedditName }/about.json`).pipe(
      map((value: any) => value.data as SubReddit),
      catchError(() => of(null)),
    )),
  );

  public articles$: Observable<Article[]> = this.subRedditInfo$.pipe(
    catchError(() => of(null)),
    switchMap((subRedditInfo: SubReddit) => !subRedditInfo ?
        of([]) :
        this.getArticles(subRedditInfo),
  ));

  constructor(
    private http: HttpClient,
  ) { }

  public changeLimits(newLimit: number) {
    this.limit$.next(newLimit);
  }

  public changeSubReddit(subReddit: string) {
    this.paginationIndex = '';
    this.subRedditName$.next(subReddit);
  }

  public next(): void {
    this.pagination$.next(1);
  }

  public previous(): void {
    this.pagination$.next(-1);
  }

  public getComments(articleId: string): Observable<ArticleComment[]> {
    return this.subRedditName$.pipe(
      switchMap((subRedditName) => this.http.get(`https://www.reddit.com/r/${ subRedditName }/comments/${ articleId }.json`)),
      map((data: any[]) => data && data.length > 1 ? data[1] : data),
      pluck('data', 'children'),
      map((data: any[]) => data.map((value) => value.data as ArticleComment)),
    );
  }

  private getArticles(subRedditInfo: SubReddit): Observable<Article[]> {
    return combineLatest([
      this.limit$,
      this.pagination$,
    ]).pipe(
      switchMap(([limit, pagination ]) => {
        let paginationParameter = (pagination > 0 ? '&after=' : '&before=') + this.paginationIndex;
        paginationParameter =  this.paginationIndex ? paginationParameter : '';
        return this.http.get(`https://www.reddit.com${ subRedditInfo.url }.json?limit=${ limit }${ paginationParameter }`);
      }),
      filter((data) => !!data),
      pluck('data'),
      tap((data: any) => this.paginationIndex = data.after),
      pluck('children'),
      map((data: any) => data.map((value) => value.data as Article)),
    );
  }
}
