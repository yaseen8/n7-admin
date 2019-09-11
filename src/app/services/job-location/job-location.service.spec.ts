import { TestBed } from '@angular/core/testing';

import { JobLocationService } from './job-location.service';

describe('JobLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobLocationService = TestBed.get(JobLocationService);
    expect(service).toBeTruthy();
  });
});
