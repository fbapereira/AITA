import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Article } from './article/article';
import { ArticleService } from './article/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  articles$: Observable<Article[]> = this.articleService.articles$;

  constructor(
    private articleService: ArticleService,
  ) { }
}
