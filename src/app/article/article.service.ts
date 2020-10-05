import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, switchMap, filter, pluck, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PaginationService } from '../pagination/pagination.service';
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
    private paginationService: PaginationService,
  ) { }

  public articles$: Observable<Article[]> = this.redditApiService.subRedditInfo$.pipe(
    tap(() => this.paginationService.resetPagination()),
    catchError(() => of(null)),
    switchMap((subRedditInfo: SubReddit) => !subRedditInfo ?
        of([]) :
        this.getArticles(subRedditInfo),
  ));

  private getArticles(subRedditInfo: SubReddit): Observable<Article[]> {
    return combineLatest([
      this.paginationService.limit$,
      this.paginationService.pagination$,
    ]).pipe(
      switchMap(([limit, pagination ]) => {
        return this.http.get(`${ this.redditUrl }${ subRedditInfo.url }.json?limit=${ limit }${ this.getPaginationParameter(pagination) }`);
      }),
      filter((data) => !!data),
      pluck('data'),
      tap((data: any) => this.paginationService.paginationIndex = data.after),
      pluck('children'),
      map((data: any) => data.map((value) => value.data as Article)),
    );
  }

  private getPaginationParameter(paginationDirection: number) {
    if (!this.paginationService.paginationIndex) {
      return '';
    }
    return (paginationDirection > 0 ? '&after=' : '&before=') + this.paginationService.paginationIndex;
  }
}
