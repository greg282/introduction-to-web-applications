import { TestBed } from '@angular/core/testing';

import { TourCounterService } from './tour-counter.service';

describe('TourCounterService', () => {
  let service: TourCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
