import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobDetailComponent } from './add-job-detail.component';

describe('AddJobDetailComponent', () => {
  let component: AddJobDetailComponent;
  let fixture: ComponentFixture<AddJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
