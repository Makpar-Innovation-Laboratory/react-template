import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { mockActivatedRoute, mockNews} from 'src/environments/mock';
import { NewsService } from '../../../services/news.service';

import { By } from '@angular/platform-browser';

import { StoryComponent } from './story.component';
import { DebugElement } from '@angular/core';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      declarations: [ StoryComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([{path: 'news/:id', component: StoryComponent} ]),
        HttpClientTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers:[
        NewsService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents()
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify();
  });
  
  it('should be constructed with parameters from activated route', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${mockActivatedRoute.snapshot.params.id}`);
    expect(component.newsId).toEqual(mockActivatedRoute.snapshot.params.id);
  });

  it('should be created and initialize with data from backend API', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${mockActivatedRoute.snapshot.params.id}`);
    expect(req.request.method).toEqual('GET')
    req.flush(mockNews.news_response)
  });

  it('should not display reply widget unless user clicks comment button', ()=>{
    const req = httpTestingController.expectOne(`/api/news/post/${mockActivatedRoute.snapshot.params.id}`);
    const replyElement: DebugElement = fixture.debugElement.query(By.css('#root-reply'));
    expect(replyElement).toBeNull();
    component.toggleComment();
    fixture.detectChanges();
    expect(replyElement).toBeDefined();
  })
});
