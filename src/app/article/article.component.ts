import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticleComment } from '../comment/article-comment';
import { CommentService } from '../comment/comment.service';

import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  /**
   * article to be shown
   */
  @Input()
  public article: Article;

  /**
   * comments' observable
   */
  public comments$: Observable<ArticleComment[]>;

  /**
   * true when there are comments to shown
   */
  public commentsLoaded = false;

  constructor (
    public commentService: CommentService,
  ) { }

  /**
   * load comment of the current article
   */
  loadComments() {
    this.commentsLoaded = true;
    this.comments$ = this.commentService.getComments(this.article.id);
  }
}
