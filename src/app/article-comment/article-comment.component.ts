import { Component, OnInit, Input } from '@angular/core';

import { ArticleComment } from './article-comment';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit {
  @Input()
  comment: ArticleComment;
  hasChildren: boolean;
  subComments: ArticleComment[];

  ngOnInit(): void {
    this.hasChildren = !!this.comment.replies;
    if (this.hasChildren) {
      this.subComments = this.comment.replies.data.children.map((value) => value.data as ArticleComment);
    }
  }
}
