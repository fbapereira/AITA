import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_DATA_TEST } from 'src/testing/api-test-data';

import { PaginationService } from '../pagination/pagination.service';
import { RedditApiService } from '../shared/reddit-api.service';
import { SubReddit } from '../shared/sub-reddit';

import { Article } from './article';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpTestingController: HttpTestingController;

  const testingSubReddit = {
    url: 'niceGuys',
    title: 'nice guys',
  } as SubReddit

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: RedditApiService,
          useValue: {
            subRedditInfo$: new Subject<SubReddit>(),
          }
        },
        {
          provide: PaginationService,
          useValue: {
            limit$: new BehaviorSubject<number>(environment.paginationLimitDefault),
            pagination$: new BehaviorSubject<number>(0),
            resetPagination: () => {},
            paginationIndex: '',
          }
        }
      ]
    });
    service = TestBed.inject(ArticleService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('articles$', () => {
    it('should return empty array when no sub reddit',
      inject([RedditApiService], (redditApiService: RedditApiService) => {
        let res: any = 'OMG! This is not right';
        service.articles$.subscribe((article: Article[]) => res = article);
        (redditApiService.subRedditInfo$ as Subject<SubReddit>).next(undefined);
        expect(res).toEqual([]);
    }));

    it('should return empty array when no sub reddit',
      inject([RedditApiService], (redditApiService: RedditApiService) => {
        let res: any = 'OMG! This is not right';
        service.articles$.subscribe((article: Article[]) => res = article);
        (redditApiService.subRedditInfo$ as Subject<SubReddit>).next(undefined);
        expect(res).toEqual([]);
    }));

    it('should call http get',
      inject([RedditApiService, PaginationService], (redditApiService: RedditApiService, paginationService: PaginationService) => {
        let res: any = 'OMG! This is not right';
        service.articles$.subscribe((article: Article[]) => res = article);

        (redditApiService.subRedditInfo$ as Subject<SubReddit>).next(testingSubReddit);

        httpTestingController
          .expectOne(`${ environment.redditUrl }${ testingSubReddit.url }.json?limit=${ environment.paginationLimitDefault }`)
          .flush(API_DATA_TEST);

        expect(res.length).toEqual(2);
    }));

    it('should have new pagination index',
      inject([RedditApiService, PaginationService], (redditApiService: RedditApiService, paginationService: PaginationService) => {
        let res: any = 'OMG! This is not right';
        service.articles$.subscribe((article: Article[]) => res = article);

        (redditApiService.subRedditInfo$ as Subject<SubReddit>).next(testingSubReddit);

        httpTestingController
          .expectOne(`${ environment.redditUrl }${ testingSubReddit.url }.json?limit=${ environment.paginationLimitDefault }`)
          .flush(API_DATA_TEST);

        expect(paginationService.paginationIndex).toEqual(API_DATA_TEST.data.after);
    }));
  });
});
