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
