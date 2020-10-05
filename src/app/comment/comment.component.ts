import { Component, OnInit, Input } from '@angular/core';
import { ArticleComment } from './article-comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
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
