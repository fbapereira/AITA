import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedditApiService } from './reddit-api.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers:[RedditApiService],
  exports: [SafeHtmlPipe]
})
export class SharedModule { }
