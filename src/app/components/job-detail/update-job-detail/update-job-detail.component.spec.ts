import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobDetailComponent } from './update-job-detail.component';

describe('UpdateJobDetailComponent', () => {
  let component: UpdateJobDetailComponent;
  let fixture: ComponentFixture<UpdateJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
