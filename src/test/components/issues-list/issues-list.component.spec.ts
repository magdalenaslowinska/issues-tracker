import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesListComponent } from '../../../app/components/issues-list/issues-list.component';
import { IssuesService } from '../../../app/services/issues-service';
import { mock, instance, reset, when } from 'ts-mockito/lib/ts-mockito';

describe('IssuesListComponent', () => {
  let component: IssuesListComponent;
  let fixture: ComponentFixture<IssuesListComponent>;

  const issuesServiceMock = mock(IssuesService);
  const issuesService = instance(issuesServiceMock);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesListComponent ],
      providers: [
        { provide: IssuesService, useValue: issuesService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    when(issuesServiceMock.getAvailableIssues()).thenResolve([]);

    fixture = TestBed.createComponent(IssuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    reset(issuesServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
