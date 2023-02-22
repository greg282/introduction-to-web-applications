import { TestBed } from '@angular/core/testing';

import { ShareTourDataService } from './share-tour-data.service';

describe('ShareTourDataService', () => {
  let service: ShareTourDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareTourDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
