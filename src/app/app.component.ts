import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Article } from './article/article';
import { ArticleService } from './article/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public articles$: Observable<Article[]> = this.articleService.articles$.pipe(tap(() =>  window.scroll(0, 0)));

  constructor(
    private articleService: ArticleService,
  ) { }
}
