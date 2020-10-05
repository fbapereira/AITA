import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, switchMap, filter, pluck, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PaginatorService } from '../paginator/paginator.service';
import { RedditApiService } from '../shared/reddit-api.service';
import { SubReddit } from '../shared/sub-reddit';

import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly redditUrl = environment.redditUrl;

  constructor (
    private http: HttpClient,
    private redditApiService: RedditApiService,
    private paginatorService: PaginatorService,
  ) { }

  public articles$: Observable<Article[]> = this.redditApiService.subRedditInfo$.pipe(
    tap(() => this.paginatorService.resetPagination()),
    catchError(() => of(null)),
    switchMap((subRedditInfo: SubReddit) => !subRedditInfo ?
        of([]) :
        this.getArticles(subRedditInfo),
  ));

  private getArticles(subRedditInfo: SubReddit): Observable<Article[]> {
    return combineLatest([
      this.paginatorService.limit$,
      this.paginatorService.pagination$,
    ]).pipe(
      switchMap(([limit, pagination ]) => {
        return this.http.get(`${ this.redditUrl }${ subRedditInfo.url }.json?limit=${ limit }${ this.getPaginationParameter(pagination) }`);
      }),
      filter((data) => !!data),
      pluck('data'),
      tap((data: any) => this.paginatorService.paginationIndex = data.after),
      pluck('children'),
      map((data: any) => data.map((value) => value.data as Article)),
    );
  }

  private getPaginationParameter(paginationDirection: number) {
    if (!this.paginatorService.paginationIndex) {
      return '';
    }
    return (paginationDirection > 0 ? '&after=' : '&before=') + this.paginatorService.paginationIndex;
  }
}
