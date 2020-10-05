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
  @Input()
  article: Article;

  comments$: Observable<ArticleComment[]>;
  commentsLoaded = false;

  constructor (
    public commentService: CommentService,
  ) { }

  loadComments() {
    this.commentsLoaded = true;
    this.comments$ = this.commentService.getComments(this.article.id);
  }
}
