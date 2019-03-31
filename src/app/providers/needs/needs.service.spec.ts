import { TestBed } from '@angular/core/testing';

import { NeedsService } from './needs.service';

describe('NeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeedsService = TestBed.get(NeedsService);
    expect(service).toBeTruthy();
  });
});
