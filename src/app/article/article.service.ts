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
  /**
   * reddit base url
   */
  private readonly redditUrl = environment.redditUrl;

  /**
   * article of the current subReddit loaded
   */
  public articles$: Observable<Article[]> = this.redditApiService.subRedditInfo$.pipe(
    tap(() => this.paginationService.resetPagination()),
    catchError(() => of(null)),
    switchMap((subRedditInfo: SubReddit) => !subRedditInfo ? //if no valid subReddit return []
        of([]) :
        this.getArticles(subRedditInfo),
  ));

  constructor (
    private http: HttpClient,
    private redditApiService: RedditApiService,
    private paginationService: PaginationService,
  ) { }

  /**
   * get articles from the current subReddit
   * @param subRedditInfo current subReddit
   */
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
      map((data: any) => data.map((value) => {
        return {
          ...value.data,
          imageUrl: value.data.url,
          created: new Date(value.data.created * 1000),
          permalink:  environment.redditUrl + value.data.permalink,
        } as Article;
      })),
    );
  }

  /**
   * transform pagination direction into parameter
   * when:
   *  1 - after
   *  0 - before
   * @param paginationDirection pagination's direction
   */
  private getPaginationParameter(paginationDirection: number) {
    if (!this.paginationService.paginationIndex) {
      return '';
    }
    return (paginationDirection > 0 ? '&after=' : '&before=') + this.paginationService.paginationIndex;
  }
}
