import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  public paginationIndex: string;
  public limit$ = new BehaviorSubject<number>(environment.paginatorLimitDefault);
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
