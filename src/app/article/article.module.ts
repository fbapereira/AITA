import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [ArticleComponent, ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ArticleComponent,
  ]
})
export class ArticleModule { }
