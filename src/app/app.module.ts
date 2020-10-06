import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { ArticleCommentModule } from './article-comment/article-comment.module';
import { HeaderModule } from './header/header.module';
import { PaginationModule } from './pagination/pagination.module';
import { SharedModule } from './shared/shared.module';
 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    ArticleModule,
    ArticleCommentModule,
    SharedModule,
    PaginationModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
