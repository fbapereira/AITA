import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArticleCommentModule } from '../article-comment/article-comment.module';

import { SharedModule } from './../shared/shared.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticleCommentModule,
  ],
  exports: [
    ArticleComponent,
  ]
})
export class ArticleModule { }
