import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { COMMENT_DATA_TEST } from 'src/testing/comment-test-data';

import { ArticleCommentComponent } from './article-comment.component';

describe('ArticleCommentComponent', () => {
  let component: ArticleCommentComponent;
  let fixture: ComponentFixture<ArticleCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sub comments', () => {
    component.comment = COMMENT_DATA_TEST;
    component.ngOnInit();
    expect(component.hasChildren).toBe(true);
    expect(component.subComments.length).toBe(COMMENT_DATA_TEST.replies.data.children.length);
  });

  it('should not have sub comments', () => {
    let comment = COMMENT_DATA_TEST
    comment.replies = undefined
    component.comment = comment;
    component.ngOnInit();
    expect(component.hasChildren).toBe(false);
    expect(component.subComments).toEqual(undefined);
  });
});
