import { Component } from '@angular/core';

import { RedditApiService } from './shared/reddit-api.service';
import { Observable, throwError } from 'rxjs';
import { Article } from './shared/article';
import { catchError, retry, scan, map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  articles$: Observable<Article[]> = this.redditApiService.articles$;

  constructor(
    public redditApiService: RedditApiService,
  ) {
  }
}
