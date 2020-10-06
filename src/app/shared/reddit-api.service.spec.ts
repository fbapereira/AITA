import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { RedditApiService } from './reddit-api.service';
import { SubReddit } from './sub-reddit';

describe('RedditApiService', () => {
  let service: RedditApiService;
  let httpTestingController: HttpTestingController;
  const subReddit = {
    title: 'Im a title',
    url: 'Im a url',
    description: 'Im a description',
  } as  SubReddit

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    service = TestBed.inject(RedditApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('subRedditName$', () => {
    it('should return the default sub reddit', () => {
      let res: any = "you have no power here";
      service.subRedditName$.subscribe((value) => res = value);
      expect(res).toBe(environment.defaultSubReddit);
    });

    it('should change the sub reddit', () => {
      let res: any = "you have no power here";
      service.subRedditName$.subscribe((value) => res = value);
      service.changeSubReddit('OPS')
      expect(res).toBe('OPS');
    });
  });

  describe('subRedditInfo$', () => {
    it('should return the default sub reddit info', () => {
      let res: any = "you have no power here";
      service.subRedditInfo$.subscribe((value) => res = value);

      httpTestingController
        .expectOne(`${ environment.redditUrl }/r/${ environment.defaultSubReddit }/about.json`)
        .flush({ data: subReddit });

      expect(res).toBe(subReddit);
    });
  });
});
