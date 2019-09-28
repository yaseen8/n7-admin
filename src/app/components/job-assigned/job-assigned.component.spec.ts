import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAssignedComponent } from './job-assigned.component';

describe('JobAssignedComponent', () => {
  let component: JobAssignedComponent;
  let fixture: ComponentFixture<JobAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
