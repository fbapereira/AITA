import { Component } from '@angular/core';

import { RedditApiService } from './shared/reddit-api.service';
import { Observable, throwError } from 'rxjs';
import { Article } from './article/article';
import { catchError, retry, scan, map, reduce } from 'rxjs/operators';
import { ArticleService } from './article/article.service';
import { PaginatorService } from './paginator/paginator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  articles$: Observable<Article[]> = this.articleService.articles$;

  constructor(
    private articleService: ArticleService,
  ) {
  }
}
