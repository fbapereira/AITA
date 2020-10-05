import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  /**
   * pagination index key
   */
  private _paginationIndex: string;

  /**
   * Pagination index key
   */
  get paginationIndex(): string {
    return this._paginationIndex;
  }

  /**
   * Pagination index key
   */
  set paginationIndex(value: string) {
    this._paginationIndex = value;
  }

  /**
   * number of post per pagination request
   */
  public limit$ = new BehaviorSubject<number>(environment.paginationLimitDefault);

  /**
   * observable that emits when pagination is required
   *  1 - to next page
   * -1 - to previous page
   */
  public pagination$ = new BehaviorSubject<number>(0);

  /**
   * clean pagination index
   */
  public resetPagination() {
    this._paginationIndex = '';
  }

  /**
   * go to the next page
   */
  public next(): void {
    this.pagination$.next(1);
  }

  /**
   * go to the previous page
   */
  public previous(): void {
    this.pagination$.next(-1);
  }

  /**
   * change the amount of post per page
   * @param newLimit new number of post per page
   */
  public changeLimits(newLimit: number) {
    this.limit$.next(newLimit);
  }
}
