import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_COMMENT_TEST_DATA } from 'src/testing/api-comment-test-data';

import { RedditApiService } from '../shared/reddit-api.service';
import { SubReddit } from '../shared/sub-reddit';

import { ArticleComment } from './article-comment';
import { ArticleCommentService } from './article-comment.service';

describe('ArticleCommentService', () => {
  let service: ArticleCommentService;
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
      ],
    });

    service = TestBed.inject(ArticleCommentService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComments', () => {
    it('should call http get',
      inject([RedditApiService], (redditApiService: RedditApiService) => {
        let res: any = 'OMG! This is not right';
        let articleId: any = 'Who cares';
        service.getComments(articleId).subscribe((articleComment: ArticleComment[]) => res = articleComment);

        (redditApiService.subRedditInfo$ as Subject<SubReddit>).next(testingSubReddit);

        httpTestingController
          .expectOne(`${ environment.redditUrl }${ testingSubReddit.url }comments/${ articleId }.json`)
          .flush(API_COMMENT_TEST_DATA);

        expect(res.length).toBe(API_COMMENT_TEST_DATA[1].data.children.length);
    }));
  });
});
