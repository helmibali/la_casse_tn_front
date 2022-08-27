import { TestBed } from '@angular/core/testing';

import { DiscussionGuard } from './discussion.guard';

describe('DiscussionGuard', () => {
  let guard: DiscussionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DiscussionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
