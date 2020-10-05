import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { Article } from './article';
import { catchError, switchMap, filter, pluck, tap, map } from 'rxjs/operators';
import { SubReddit } from '../shared/sub-reddit';
import { HttpClient } from '@angular/common/http';
import { RedditApiService } from '../shared/reddit-api.service';

import {PaginatorService} from '../paginator/paginator.service';
import { environment } from 'src/environments/environment';

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

  // reset pagination
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
        let paginationParameter = (pagination > 0 ? '&after=' : '&before=') + this.paginatorService.paginationIndex;
        paginationParameter =  this.paginatorService.paginationIndex ? paginationParameter : '';
        return this.http.get(`${ this.redditUrl }${ subRedditInfo.url }.json?limit=${ limit }${ paginationParameter }`);
      }),
      filter((data) => !!data),
      pluck('data'),
      tap((data: any) => this.paginatorService.paginationIndex = data.after),
      pluck('children'),
      map((data: any) => data.map((value) => value.data as Article)),
    );
  }
}
