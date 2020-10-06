import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArticleCommentComponent } from './article-comment.component';

@NgModule({
  declarations: [
    ArticleCommentComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArticleCommentComponent,
  ]
})
export class ArticleCommentModule { }
