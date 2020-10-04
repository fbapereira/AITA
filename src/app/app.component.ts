import { Component } from '@angular/core';

import { RedditApiService } from './shared/reddit-api.service';
import { Observable } from 'rxjs';
import { Article } from './shared/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  articles$: Observable<Article[]> = this.redditApiService.articles$;

  constructor(public redditApiService: RedditApiService) {}
}
