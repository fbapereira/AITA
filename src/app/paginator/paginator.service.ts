import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  public paginationIndex: string;
  public limit$ = new BehaviorSubject<number>(5);
  public pagination$ = new BehaviorSubject<number>(0);

  constructor() { }

  public resetPagination() {
    this.paginationIndex = '';
  }

  public next(): void {
    this.pagination$.next(1);
  }

  public previous(): void {
    this.pagination$.next(-1);
  }

  public changeLimits(newLimit: number) {
    this.limit$.next(newLimit);
  }
}
