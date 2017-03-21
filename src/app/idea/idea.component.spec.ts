import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../shared/shared.module';

import { IdeaComponent } from './idea.component';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;

  const FakeAngularFire = {}
  const FakeHttp = {};
  const paramsObj = {
    id: '1001',
    index: '1'
  }
  const MockActivatedRoute = {
    snapshot: {
        params: Observable.of({
          index: '1001',
          id: '1'
        })
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaComponent ],
      imports: [
        CommonModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFire, useValue: FakeAngularFire },
        { provide: Http, useValue: FakeHttp },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
