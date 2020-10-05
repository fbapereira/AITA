import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoaderComponent } from './loader/loader.component';
import { RedditApiService } from './reddit-api.service';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    RedditApiService,
  ],
  exports: [
    LoaderComponent,
  ]
})
export class SharedModule { }
