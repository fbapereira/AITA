import { Component, Input } from '@angular/core';

import { Article } from '../shared/article';
import { Observable } from 'rxjs';
import { ArticleComment } from '../shared/article-comment';
import { RedditApiService } from '../shared/reddit-api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input()
  article: Article;

  comments$: Observable<ArticleComment[]>;
  commentsLoaded = false;

  constructor(public redditApiService: RedditApiService) { }

  loadComments() {
    this.commentsLoaded = true;
    this.comments$ = this.redditApiService.getComments(this.article.id);
  }
}
