import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ArticleCommentService } from '../article-comment/article-comment.service';

import { Article } from './article';
import { ArticleComponent } from './article.component';
import { ArticleService } from './article.service';

describe('ArticleComponent', () => {
  const article = {
    upvote_ratio: .55,
    author: 'Tom riddle',
    created: new Date(),
    title: 'The one that shall not be named',
    num_comments: 767,
  } as Article;

  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ ArticleComponent ],
      providers: [
        {
          provide: ArticleService,
          userValue: {
            getComments: () => {},
          }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.article = article;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should comments not be Loaded', () => {
    expect(component.commentsLoaded).toBe(false);
  });

  describe('loadComments', () => {
    it('should set commentsLoaded as false', () => {
      component.loadComments();
      expect(component.commentsLoaded).toBe(true);
    });

    it('should call getComments', inject([ArticleCommentService], (articleCommentService: ArticleCommentService) => {
      spyOn(articleCommentService, 'getComments');
      component.loadComments();
      expect(articleCommentService.getComments).toHaveBeenCalled();
    }));
  });
});
