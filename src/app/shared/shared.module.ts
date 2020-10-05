import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedditApiService } from './reddit-api.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers:[RedditApiService],
  exports: [ LoaderComponent ]
})
export class SharedModule { }
