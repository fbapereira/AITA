import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RedditApiService } from './reddit-api.service';
import { LoaderComponent } from './loader/loader.component';
import { WithLoadingPipe } from './with-loading.pipe';

@NgModule({
  declarations: [LoaderComponent, WithLoadingPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers:[RedditApiService],
  exports: [ LoaderComponent, WithLoadingPipe ]
})
export class SharedModule { }
