import { TestBed } from '@angular/core/testing';

import { Authguard1Guard } from './authguard1.guard';

describe('Authguard1Guard', () => {
  let guard: Authguard1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Authguard1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
