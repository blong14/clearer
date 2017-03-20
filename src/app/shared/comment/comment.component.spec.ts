import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Idea } from '../../models/idea.interface';
import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.idea = {
      text: 'This is a Mock Idea',
      owner: {
        email: 'joe@testing.com',
        name: 'Joe Tester',
        uid: '1001'
      },
      state: 1,
      timestamp: 1001,
    };
    component.project = {
      id: '1001',
      name: 'Test Project',
      description: 'This is a testing project.',
      goals: {},
      team: '1',
      state: 1,
      owner: {
        email: 'josh@tester.com',
        uid: '1001'
      },
    }
    const fakeCurrentUser = {
      auth: {
        uid: '1001',
        email: 'josh@tester.com'
      }
    }
    spyOn(localStorage, 'currentUser').and.returnValue( fakeCurrentUser );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
