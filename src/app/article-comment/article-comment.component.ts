import { Component, OnInit, Input } from '@angular/core';

import { ArticleComment } from './article-comment';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit {
  /**
   * comment to be shown
   */
  @Input()
  public comment: ArticleComment;

  /**
   * true if there are replies to the comment
   */
  public hasChildren: boolean;

  /**
   * sub comments / replies to the target comment
   */
  public subComments: ArticleComment[];

  ngOnInit(): void {
    this.hasChildren = !!this.comment && !!this.comment.replies;
    if (this.hasChildren) {
      this.subComments = this.comment.replies.data.children.map((value) => value.data as ArticleComment);
    }
  }
}
