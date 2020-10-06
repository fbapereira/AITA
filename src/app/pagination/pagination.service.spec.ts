import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set paginationIndex to "" when resetPagination', () => {
    service.paginationIndex = "123";
    service.resetPagination();
    expect(service.paginationIndex).toBe('');
  });

  it('should emit pagination$ when next', () => {
    let res: any = 'GREtchen';
    service.pagination$.subscribe((value) => res = value);
    service.next();
    expect(res).toBe(1);
  });

  it('should emit pagination$ when previous', () => {
    let res: any = 'GREtchen';
    service.pagination$.subscribe((value) => res = value);
    service.previous();
    expect(res).toBe(-1);
  });

  it('should emit limit$ when changeLimits', () => {
    let res: any = 'GREtchen';
    service.limit$.subscribe((value) => res = value);
    service.changeLimits(23);
    expect(res).toBe(23);
  });
});
