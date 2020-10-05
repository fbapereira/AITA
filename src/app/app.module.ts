import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { HeaderModule } from './header/header.module';
import { SharedModule } from './shared/shared.module';

import { CommentModule } from './comment/comment.module';
import { PaginatorModule } from './paginator/paginator.module';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    ArticleModule,
    CommentModule,
    SharedModule,
    PaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
