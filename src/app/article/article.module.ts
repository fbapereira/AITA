import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';

import { SharedModule } from './../shared/shared.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
  declarations: [ArticleComponent, ],
  imports: [
    CommonModule,
    SharedModule,
    CommentModule,
  ],
  exports: [
    ArticleComponent,
  ]
})
export class ArticleModule { }
