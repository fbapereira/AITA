import { Component } from '@angular/core';

import { RedditApiService } from './shared/reddit-api.service';
import { Observable } from 'rxjs';
import { Article } from './shared/article';
import { ArticleComment } from './shared/article-comment';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  articles$: Observable<Article[]> = this.redditApiService.articles$;
  comments$: Observable<ArticleComment[]>;

  constructor(public redditApiService: RedditApiService) {
  }

  comm() {
    this.comments$ = this.redditApiService.getComments('j4kr3j');
    this.comments$.subscribe((a) => console.log(a));
  }
}
