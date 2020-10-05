import { Component } from '@angular/core';

import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  constructor(
    public paginatorService: PaginatorService
  ) { }
}
