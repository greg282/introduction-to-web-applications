import { TestBed } from '@angular/core/testing';

import { StateServicerService } from './state-servicer.service';

describe('StateServicerService', () => {
  let service: StateServicerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateServicerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
