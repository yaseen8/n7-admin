import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceHistoryComponent } from './attendence-history.component';

describe('AttendenceHistoryComponent', () => {
  let component: AttendenceHistoryComponent;
  let fixture: ComponentFixture<AttendenceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
