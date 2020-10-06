import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';
import { Article } from './article/article';
import { ArticleService } from './article/article.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        {
          provide: ArticleService,
          userValue: {
            articles$: new Subject<Article[]>(),
          }
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
