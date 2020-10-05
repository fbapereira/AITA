import { Component } from '@angular/core';
import { RedditApiService } from '../shared/reddit-api.service';
import { ArticleService } from '../article/article.service';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  constructor(public paginatorService: PaginatorService) { }
}
