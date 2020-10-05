import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentModule } from '../comment/comment.module';

import { SharedModule } from './../shared/shared.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [
    ArticleComponent
  ],
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
