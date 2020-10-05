import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SubReddit } from './sub-reddit';

@Injectable({
  providedIn: 'root'
})
export class RedditApiService {
  /**
   * reddit base url
   */
  private readonly redditUrl = environment.redditUrl;

  /**
   * returns current sub reddit name
   */
  public subRedditName$ = new BehaviorSubject<string>(environment.defaultSubReddit);

  /**
   * return current sub reddit info
   */
  public subRedditInfo$: Observable<SubReddit> = this.subRedditName$.pipe(
    switchMap((subRedditName) => this.http.get(`${ this.redditUrl }/r/${ subRedditName }/about.json`).pipe(
      map((value: any) => value.data as SubReddit),
      catchError(() => of(null)),
    )),
  );

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * change to another sub reddit
   * @param subReddit sub redit name
   */
  public changeSubReddit(subReddit: string) {
    this.subRedditName$.next(subReddit);
  }
}
