import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaConfigComponent } from './idea-config.component';

describe('IdeaConfigComponent', () => {
  let component: IdeaConfigComponent;
  let fixture: ComponentFixture<IdeaConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
