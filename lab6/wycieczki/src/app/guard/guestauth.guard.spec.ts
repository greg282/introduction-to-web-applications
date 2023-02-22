import { TestBed } from '@angular/core/testing';

import { GuestauthGuard } from './guestauth.guard';

describe('GuestauthGuard', () => {
  let guard: GuestauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
